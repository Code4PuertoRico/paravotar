import { BallotType, Selection } from "../../../ballot-validator/types"
import { Candidate } from "../../generate-ballot/components/sections"
import { VotesCoordinates } from "../../generate-ballot/types/ballot-machine"
import {
  BallotConfigs,
  LegislativeBallotConfig,
  MunicipalBallotConfig,
  StateBallotConfig,
} from "./ballot-configs"
import { ElectiveField } from "./ballot-configs/base"
import { PUBLIC_S3_BUCKET } from "./constants"
import { OcrResult, PracticeContext } from "./types"
import { Vote } from "./vote-service"
import BallotFinder, { FindByType } from "./ballot-finder-service"

type FindByEventParams = {
  userInput: string
  findBy: FindByType
}

type VoteEvent = {
  candidate: ElectiveField
  position: VotesCoordinates
  ballotType: BallotType
}

export const BallotService = {
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

    console.log(allBallotsJson)

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
    const prevVotes = context.votes
    const storedVote = prevVotes.find(
      vote =>
        vote.position.row === position.row &&
        vote.position.column === position.column
    )

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
      if (position.row === 0) {
        return prevVotes.filter(vote => {
          if (vote.position.column === position.column) {
            // Remove the party vote.
            if (vote.position.row === 0) {
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
    if (position.row === 0) {
      // Find the ballot that's currently used.
      const { ballots } = context
      const ballot = (ballotType === BallotType.state
        ? context.ballots.estatal
        : ballotType === BallotType.municipality
        ? ballots.municipal
        : ballots.legislativa) as BallotConfigs

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

    // Add candidate vote.
    const vote = new Vote(candidate, position, Selection.selected)

    return [...prevVotes, vote]
  },
}
