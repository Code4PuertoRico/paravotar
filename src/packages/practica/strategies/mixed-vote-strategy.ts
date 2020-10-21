import { Selection } from "../../../ballot-validator/types"
import {
  BallotConfigs,
  MunicipalBallotConfig,
} from "../services/ballot-configs"
import { Candidate } from "../services/ballot-configs/base"
import { ValidMarkLimits } from "../services/ballot-configs/constants"
import { ElectivePosition } from "../services/ballot-configs/types"
import {
  getColumnForParty,
  getElectivePositionForVote,
  getStartAndEndPositionsForBallot,
} from "../services/ballot-service"
import { PARTY_ROW } from "../services/constants"
import { VoteEvent } from "../services/types"
import { Vote } from "../services/vote-service"
import { VoteUpdateInterface } from "./interfaces"

export class MixedVoteStrategy implements VoteUpdateInterface {
  addVote(intendedVote: VoteEvent, prevVotes: Vote[]) {
    const ballot = intendedVote.ballot as BallotConfigs
    const vote = new Vote(
      intendedVote.position,
      Selection.selected,
      intendedVote.candidate
    )
    const validMarkLimitsOnBallot = ValidMarkLimits[intendedVote.ballotType]

    const electivePosition = getElectivePositionForVote(
      vote.position,
      intendedVote.ballotType
    )
    const { start, end } = getStartAndEndPositionsForBallot(
      ballot,
      intendedVote.ballotType,
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

      // Remove the votes for the position completely.
      return [
        ...explicitVotesForPosition,
        vote,
        ...filteredImplicitVotesForPosition,
        ...votesOutsideOfThePosition,
      ]
    }

    return [...prevVotes, vote]
  }

  removeVote(intendedVote: VoteEvent, prevVotes: Vote[]) {
    // Remove the vote.
    const filteredVotes = prevVotes.filter(vote => {
      return !(
        intendedVote.position.row === vote.position.row &&
        intendedVote.position.column === vote.position.column
      )
    })

    // Go through every elective position and make sure it has an explict vote for the position or an implicit vote.
    const ballot = intendedVote.ballot as BallotConfigs
    const validMarkLimitsOnBallot = ValidMarkLimits[intendedVote.ballotType]
    const electivePosition = getElectivePositionForVote(
      intendedVote.position,
      intendedVote.ballotType
    )
    const { start, end } = getStartAndEndPositionsForBallot(
      ballot,
      intendedVote.ballotType,
      electivePosition
    )

    const explicitVotesForPosition = filteredVotes.filter(vote => {
      return (
        vote.position.row >= start &&
        vote.position.row <= end &&
        vote.selection === Selection.selected
      )
    })
    const voteLimit =
      electivePosition === ElectivePosition.municipalLegislators
        ? (ballot as MunicipalBallotConfig).amountOfMunicipalLegislators
        : validMarkLimitsOnBallot[electivePosition]

    // Add an implicit vote when it's removed.
    if (explicitVotesForPosition.length < voteLimit) {
      // Get the sections that have candidates.
      const voteForParty = prevVotes.find(
        vote =>
          vote.selection === Selection.selected &&
          vote.position.row === PARTY_ROW
      )

      if (voteForParty) {
        const columnForParty = getColumnForParty(
          ballot,
          voteForParty as VoteEvent
        )
        const candidate = columnForParty.find((item, index) => {
          const isInElectivePosition = index >= start && index <= end
          const receivesImplicitVote =
            item instanceof Candidate && item.receivesImpicitVote
          const hasVote = filteredVotes.find(
            vote =>
              vote.position.row === index &&
              vote.position.column === voteForParty.position.column
          )

          return isInElectivePosition && receivesImplicitVote && !hasVote
        }) as Candidate
        const index = columnForParty.findIndex(item => item.id === candidate.id)
        const vote = new Vote(
          { column: voteForParty.position.column, row: index },
          Selection.selectedImplicitly,
          candidate
        )

        return [...filteredVotes, vote]
      }
    }

    return filteredVotes
  }
}
