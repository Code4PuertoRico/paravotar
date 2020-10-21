import { Selection } from "../../../ballot-validator/types"
import { VoteEvent } from "../services/types"
import { Vote } from "../services/vote-service"
import { PARTY_ROW } from "../services/constants"
import { VoteUpdateInterface } from "./interfaces"
import { ElectivePosition } from "../services/ballot-configs/types"
import {
  BallotConfigs,
  MunicipalBallotConfig,
} from "../services/ballot-configs"
import { ValidMarkLimits } from "../services/ballot-configs/constants"
import {
  getColumnForParty,
  getElectivePositionForVote,
  getStartAndEndPositionsForBallot,
} from "../services/ballot-service"
import { Candidate } from "../services/ballot-configs/base"

export class PartyVoteStrategy implements VoteUpdateInterface {
  addVote(intendedVote: VoteEvent, prevVotes: Vote[]) {
    const ballot = intendedVote.ballot as BallotConfigs
    // Get the sections that have candidates.
    const columnForParty = getColumnForParty(ballot, intendedVote)

    const votes = [
      ...prevVotes,
      new Vote(
        intendedVote.position,
        Selection.selected,
        intendedVote.candidate
      ),
    ]
    const validMarkLimitsOnBallot = ValidMarkLimits[intendedVote.ballotType]

    // Create a vote for every section that can receive an implicit vote.
    columnForParty.forEach((item, rowIndex) => {
      const electivePosition = getElectivePositionForVote(
        { column: intendedVote.position.column, row: rowIndex },
        intendedVote.ballotType
      )

      if (item instanceof Candidate) {
        // If the candidate that we're verifying already has an explicit vote, don't try to add any implicit votes.
        const candidateHasExplicitVote = votes.filter(
          vote =>
            vote.selection === Selection.selected &&
            vote.position.column === intendedVote.position.column &&
            vote.position.row === rowIndex
        )

        if (candidateHasExplicitVote.length > 0) {
          return
        }

        // Add implicit votes for candidates in the column
        const votesForElectivePosition = votes.filter(vote => {
          const { start, end } = getStartAndEndPositionsForBallot(
            ballot,
            intendedVote.ballotType,
            electivePosition
          )

          return vote.position.row >= start && vote.position.row <= end
        })
        const voteLimit =
          electivePosition === ElectivePosition.municipalLegislators
            ? (ballot as MunicipalBallotConfig).amountOfMunicipalLegislators
            : validMarkLimitsOnBallot[electivePosition]

        if (
          votesForElectivePosition.length < voteLimit &&
          item.receivesImpicitVote
        ) {
          votes.push(
            new Vote(
              { column: intendedVote.position.column, row: rowIndex },
              Selection.selectedImplicitly,
              item
            )
          )
        }
      }
    })

    return votes
  }

  removeVote(intendedVote: VoteEvent, prevVotes: Vote[]) {
    return prevVotes.filter(vote => {
      if (vote.position.column === intendedVote.position.column) {
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
}
