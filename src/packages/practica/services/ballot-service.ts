import { BallotType, Selection } from "../../../ballot-validator/types"
import { VotesCoordinates } from "../../generate-ballot/types/ballot-machine"
import {
  BallotConfigs,
  LegislativeBallotConfig,
  MunicipalBallotConfig,
  StateBallotConfig,
} from "./ballot-configs"
import { ElectiveField, Candidate } from "./ballot-configs/base"
import { PUBLIC_S3_BUCKET } from "./constants"
import { OcrResult, PracticeContext } from "./types"
import { Vote } from "./vote-service"
import BallotFinder, { FindByType } from "./ballot-finder-service"
import { BallotPositions, ValidMarkLimits } from "./ballot-configs/constants"
import { ElectivePosition } from "./ballot-configs/types"

type FindByEventParams = {
  userInput: string
  findBy: FindByType
}

type VoteEvent = {
  candidate: ElectiveField
  position: VotesCoordinates
  ballotType: BallotType
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

function getElectivePositionForVote(
  vote: Vote,
  ballotType: BallotType
): ElectivePosition {
  if (ballotType === BallotType.state) {
    if (vote.position.row === BallotPositions.state.governor.start) {
      return ElectivePosition.governor
    }

    return ElectivePosition.commissionerResident
  }

  if (ballotType === BallotType.municipality) {
    if (vote.position.row === BallotPositions.municipality.mayor.start) {
      return ElectivePosition.mayor
    }

    return ElectivePosition.municipalLegislators
  }

  if (
    vote.position.row ===
    BallotPositions.legislative.districtRepresentative.start
  ) {
    return ElectivePosition.districtRepresentative
  } else if (
    vote.position.row >= BallotPositions.legislative.districtSenators.start &&
    vote.position.row <= BallotPositions.legislative.districtSenators.end
  ) {
    return ElectivePosition.districtSenators
  } else if (
    vote.position.row >=
      BallotPositions.legislative.atLargeRepresentative.start &&
    vote.position.row <= BallotPositions.legislative.atLargeRepresentative.end
  ) {
    return ElectivePosition.atLargeRepresentative
  }

  return ElectivePosition.atLargeSenator
}

function getStartAndEndPositionsForBallot(
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

const BallotService = {
  async fetchBallots(
    _: PracticeContext,
    { userInput, findBy }: FindByEventParams
  ) {
    const ballots = await BallotFinder(userInput, findBy)

    // Prefetch ballot data
    const test = Object.entries(ballots).map(async ([key, value]) => {
      try {
        const ballotRes = await fetch(`${PUBLIC_S3_BUCKET}/${value}data.json`)
        const ballotJson: OcrResult[][] = await ballotRes.json()

        if (key === "estatal") {
          return {
            [key]: new StateBallotConfig(ballotJson, ballots.estatal),
          }
        } else if (key === "municipal") {
          return {
            [key]: new MunicipalBallotConfig(ballotJson, ballots.municipal),
          }
        } else {
          return {
            [key]: new LegislativeBallotConfig(ballotJson, ballots.legislativa),
          }
        }
      } catch (err) {
        console.log(err)
      }
    })

    const allBallotsJson = await Promise.all(test)
    const initialValue: {
      estatal?: StateBallotConfig
      municipal?: MunicipalBallotConfig
      legislativa?: LegislativeBallotConfig
    } = {
      estatal: undefined,
      municipal: undefined,
      legislativa: undefined,
    }

    return allBallotsJson.reduce((prev, curr) => {
      return {
        ...prev,
        ...curr,
      }
    }, initialValue)
  },

  updateVotes(
    context: PracticeContext,
    { candidate, position, ballotType }: VoteEvent
  ) {
    const ballots = context.ballots
    const prevVotes = context.votes
    const storedVote = prevVotes.find(
      vote =>
        vote.position.row === position.row &&
        vote.position.column === position.column
    )

    // Remove vote or turn an implicit vote to an explicit vote.
    if (storedVote) {
      // Change the vote from an implicity vote to an explict one.
      if (storedVote.selection === Selection.selectedImplicitly) {
        return prevVotes.map(vote => {
          if (
            vote.position.row === position.row &&
            vote.position.column === position.column
          ) {
            return new Vote(vote.candidate, vote.position, Selection.selected)
          }

          return vote
        })
      }

      // Remove vote for party and all of the implict votes
      if (position.row === PARTY_ROW) {
        return prevVotes.filter(vote => {
          if (vote.position.column === position.column) {
            // Remove the party vote.
            if (vote.position.row === PARTY_ROW) {
              return false
            }

            // Remove all of the implicit selections
            return vote.selection !== Selection.selectedImplicitly
          }

          return true
        })
      }

      // Remove vote for candidate
      return prevVotes.filter(vote => {
        return !(
          position.row === vote.position.row &&
          position.column === vote.position.column
        )
      })
    }

    // Party votes will trigger implicit votes for candidates.
    if (position.row === PARTY_ROW) {
      // Find the ballot that's currently used.
      const ballot = getBallot(ballots, ballotType)

      // Get the sections that have candidates.
      const columnForParty = ballot.structure.reduce((accum, currentRow) => {
        const columnForParty = currentRow.filter((column, columnIndex) => {
          if (columnIndex === position.column) {
            return column
          }

          return false
        })

        return [...accum, ...columnForParty]
      }, [])

      const votes = [new Vote(candidate, position, Selection.selected)]

      // Create a vote for every section that can receive an implicit vote.
      columnForParty.forEach((item, rowIndex) => {
        if (item instanceof Candidate && item.receivesImpicitVote) {
          votes.push(
            new Vote(
              item,
              { column: position.column, row: rowIndex },
              Selection.selectedImplicitly
            )
          )
        }
      })

      return [...prevVotes, ...votes]
    }

    // Candidate vote
    const partyVotes = findPartyVotes(prevVotes)
    const hasVotesForParty = partyVotes.length >= 1
    const vote = new Vote(candidate, position, Selection.selected)

    // Manage mixed vote
    if (hasVotesForParty) {
      const ballot = getBallot(ballots, ballotType)
      const electivePosition = getElectivePositionForVote(vote, ballotType)
      const validMarkLimitsOnBallot = ValidMarkLimits[ballotType]
      const { start, end } = getStartAndEndPositionsForBallot(
        ballot,
        ballotType,
        electivePosition
      )

      const implicitVotesForPosition = prevVotes.filter(vote => {
        return (
          vote.position.row >= start &&
          vote.position.row <= end &&
          vote.selection === Selection.selectedImplicitly
        )
      })

      const explicitVotesForPosition = prevVotes.filter(vote => {
        return (
          vote.position.row >= start &&
          vote.position.row <= end &&
          vote.selection === Selection.selected
        )
      })

      const votesOutsideOfThePosition = prevVotes.filter(vote => {
        return vote.position.row < start || vote.position.row > end
      })

      const explicitVotes = explicitVotesForPosition.length + 1
      const totalVotesForPosition =
        implicitVotesForPosition.length + explicitVotes
      const voteLimit =
        electivePosition === ElectivePosition.municipalLegislators
          ? (ballot as MunicipalBallotConfig).amountOfMunicipalLegislators
          : validMarkLimitsOnBallot[electivePosition]

      // Get the section of the vote to determine how we should were we should subtract an implicit vote
      if (totalVotesForPosition > voteLimit) {
        const difference = voteLimit - explicitVotes
        const filteredImplicitVotesForPosition = []

        for (let index = 0; index < difference; index++) {
          filteredImplicitVotesForPosition.push(implicitVotesForPosition[index])
        }

        console.log(filteredImplicitVotesForPosition)

        // Remove the votes for the position completely.
        return [
          ...explicitVotesForPosition,
          vote,
          ...filteredImplicitVotesForPosition,
          ...votesOutsideOfThePosition,
        ]
      }
    }

    // Manage vote for candidacy
    return [...prevVotes, vote]
  },
}

export { BallotService }
