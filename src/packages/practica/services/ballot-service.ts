import { stringify } from "qs"
import { BallotType, Selection } from "../../../ballot-validator/types"
import { VotesCoordinates } from "../../generate-ballot/types/ballot-machine"
import {
  BallotConfigs,
  LegislativeBallotConfig,
  MunicipalBallotConfig,
  StateBallotConfig,
} from "./ballot-configs"
import { ElectiveField, Candidate } from "./ballot-configs/base"
import { API_URL, PUBLIC_S3_BUCKET } from "./constants"
import { OcrResult, PracticeContext } from "./types"
import { getExplicitlySelectedVotes, Vote } from "./vote-service"
import BallotFinder, { FindByType } from "./ballot-finder-service"
import { BallotPositions, ValidMarkLimits } from "./ballot-configs/constants"
import { ElectivePosition } from "./ballot-configs/types"
import {
  CandidateVoteStrategy,
  MixedVoteStrategy,
  PartyVoteStrategy,
  VoteUpdateManager,
} from "../strategies"

type FindByEventParams = {
  userInput: string
  findBy: FindByType
}

type VoteEvent = {
  candidate: ElectiveField
  position: VotesCoordinates
  ballotType: BallotType
}

type ExportPdfEvent = {
  ballotType: string
  ballotPath: string
}

const PARTY_ROW = 0

function findPartyVotes(votes: Vote[]) {
  return votes.filter(vote => vote.position.row === PARTY_ROW)
}

function getBallot(ballots, ballotType: BallotType): BallotConfigs {
  if (ballotType === BallotType.state) {
    return ballots.estatal
  } else if (ballotType === BallotType.municipality) {
    return ballots.municipal
  }

  return ballots.legislativa
}

export function getElectivePositionForVote(
  position: VotesCoordinates,
  ballotType: BallotType
): ElectivePosition {
  if (ballotType === BallotType.state) {
    if (position.row === BallotPositions.state.governor.start) {
      return ElectivePosition.governor
    }

    return ElectivePosition.commissionerResident
  }

  if (ballotType === BallotType.municipality) {
    if (position.row === BallotPositions.municipality.mayor.start) {
      return ElectivePosition.mayor
    }

    return ElectivePosition.municipalLegislators
  }

  if (
    position.row === BallotPositions.legislative.districtRepresentative.start
  ) {
    return ElectivePosition.districtRepresentative
  } else if (
    position.row >= BallotPositions.legislative.districtSenators.start &&
    position.row <= BallotPositions.legislative.districtSenators.end
  ) {
    return ElectivePosition.districtSenators
  } else if (
    position.row >= BallotPositions.legislative.atLargeRepresentative.start &&
    position.row <= BallotPositions.legislative.atLargeRepresentative.end
  ) {
    return ElectivePosition.atLargeRepresentative
  }

  return ElectivePosition.atLargeSenator
}

export function getStartAndEndPositionsForBallot(
  ballot: BallotConfigs,
  ballotType: BallotType,
  electivePosition: ElectivePosition
) {
  if (ballotType === BallotType.state) {
    return BallotPositions.state[electivePosition]
  } else if (ballotType === BallotType.legislative) {
    return BallotPositions.legislative[electivePosition]
  }

  if (electivePosition === ElectivePosition.mayor) {
    return BallotPositions.municipality.mayor
  }

  return {
    ...BallotPositions.municipality.municipalLegislators,
    end: (ballot as MunicipalBallotConfig).amountOfMunicipalLegislators + 3,
  }
}

export function getColumnForParty(
  ballot: BallotConfigs,
  intendedVote: VoteEvent
) {
  const columnForParty = ballot.structure.reduce((accum, currentRow) => {
    const colForParty = currentRow.filter((column, columnIndex) => {
      if (columnIndex === intendedVote.position.column) {
        return column
      }

      return false
    })

    return [...accum, ...colForParty]
  }, [])

  return columnForParty
}

const BallotService = {
  async fetchBallots(
    _: PracticeContext,
    { userInput, findBy }: FindByEventParams
  ) {
    const ballotPaths = await BallotFinder(userInput, findBy)

    // Prefetch ballot data
    const ballotRequests: Promise<{
      estatal: StateBallotConfig
      municipal: MunicipalBallotConfig
      legislativa: LegislativeBallotConfig
    }> = Object.entries(ballotPaths).map(async ([key, value]) => {
      try {
        const ballotRes = await fetch(`${PUBLIC_S3_BUCKET}/${value}data.json`)
        const ballotJson: OcrResult[][] = await ballotRes.json()

        if (key === "estatal") {
          return {
            [key]: new StateBallotConfig(ballotJson, ballotPaths.estatal),
          }
        } else if (key === "municipal") {
          return {
            [key]: new MunicipalBallotConfig(ballotJson, ballotPaths.municipal),
          }
        }

        return {
          [key]: new LegislativeBallotConfig(
            ballotJson,
            ballotPaths.legislativa
          ),
        }
      } catch (err) {
        console.log(err)
      }
    })

    const allBallotsJson = await Promise.all(ballotRequests)
    const initialValue: {
      estatal?: StateBallotConfig
      municipal?: MunicipalBallotConfig
      legislativa?: LegislativeBallotConfig
    } = {
      estatal: undefined,
      municipal: undefined,
      legislativa: undefined,
    }

    const ballots = allBallotsJson.reduce((prev, curr) => {
      return {
        ...prev,
        ...curr,
      }
    }, initialValue)

    return {
      ballots,
      ballotPaths,
    }
  },

  updateVotes(
    context: PracticeContext,
    { candidate, position, ballotType }: VoteEvent
  ) {
    const ballots = context.ballots
    const prevVotes = context.votes
    const existingVoteAtPosition = prevVotes.find(
      vote =>
        vote.position.row === position.row &&
        vote.position.column === position.column
    )

    // Remove vote or turn an implicit vote to an explicit vote.
    if (existingVoteAtPosition) {
      // Change the vote from an implicity vote to an explict one.
      if (existingVoteAtPosition.selection === Selection.selectedImplicitly) {
        return prevVotes.map(vote => {
          if (
            vote.position.row === position.row &&
            vote.position.column === position.column
          ) {
            return new Vote(vote.position, Selection.selected, vote.candidate)
          }

          return vote
        })
      }
    }

    const isPartyVote = position.row === PARTY_ROW
    const ballot = getBallot(ballots, ballotType)
    const intendedVote = {
      candidate,
      position,
      ballotType,
      ballot,
    }

    if (isPartyVote) {
      const strategy = new PartyVoteStrategy()
      const partyVoteUpdateManager = new VoteUpdateManager(strategy)

      if (existingVoteAtPosition) {
        return partyVoteUpdateManager.remove(intendedVote, prevVotes)
      }

      return partyVoteUpdateManager.add(intendedVote, prevVotes)
    }

    const partyVotes = findPartyVotes(prevVotes)
    const hasVotesForParty = partyVotes.length >= 1

    if (hasVotesForParty) {
      const strategy = new MixedVoteStrategy()
      const mixedVoteStrategyUpdateManager = new VoteUpdateManager(strategy)

      if (existingVoteAtPosition) {
        return mixedVoteStrategyUpdateManager.remove(intendedVote, prevVotes)
      }

      return mixedVoteStrategyUpdateManager.add(intendedVote, prevVotes)
    }

    const strategy = new CandidateVoteStrategy()
    const candidateVoteStrategyManager = new VoteUpdateManager(strategy)

    if (existingVoteAtPosition) {
      return candidateVoteStrategyManager.remove(intendedVote, prevVotes)
    }

    return candidateVoteStrategyManager.add(intendedVote, prevVotes)
  },

  async generatePdf(context: PracticeContext, event: ExportPdfEvent) {
    const voteCoordinates = getExplicitlySelectedVotes(context.votes).map(
      vote => {
        return {
          position: vote.position,
          candidate: vote.candidate,
        }
      }
    )
    const votes = JSON.stringify(voteCoordinates)

    const res = await fetch(`${API_URL}/createBallotTask`, {
      method: "POST",
      body: JSON.stringify({
        ballotType: event.ballotType,
        ballotPath: `/${event.ballotPath.substr(
          0,
          event.ballotPath.length - 1
        )}`,
        votes: votes,
      }),
    })
    const result = await res.json()

    const params = new URLSearchParams({
      ballotType: event.ballotType,
      ballotPath: `/${event.ballotPath.substr(0, event.ballotPath.length - 1)}`,
    })

    params.append("votes", votes)
    params.toString()

    return result.uuid
  },

  async getPdfUrl(context: PracticeContext) {
    const { uuid } = context
    const params = stringify({ uuid })
    const res = await fetch(`${API_URL}/getPdfUrl?${params}`)

    if (!res.ok) {
      throw new Error("Something went wrong")
    }

    const result = await res.json()

    return result
  },
}

export { BallotService }
