import { Selection } from "../../../ballot-validator/types"
import {
  BallotConfigs,
  MunicipalBallotConfig,
} from "../services/ballot-configs"
import { ValidMarkLimits } from "../services/ballot-configs/constants"
import { ElectivePosition } from "../services/ballot-configs/types"
import {
  getElectivePositionForVote,
  getStartAndEndPositionsForBallot,
} from "../services/ballot-service"
import { VoteEvent } from "../services/types"
import { Vote } from "../services/vote-service"
import { VoteUpdateInterface } from "./interfaces"

export class MixedVoteStrategy implements VoteUpdateInterface {
  addVote(intendedVote: VoteEvent, prevVotes: Vote[]) {
    const vote = new Vote(
      intendedVote.position,
      Selection.selected,
      intendedVote.candidate
    )
    const ballot = intendedVote.ballot as BallotConfigs

    const electivePosition = getElectivePositionForVote(
      vote.position,
      intendedVote.ballotType
    )
    const validMarkLimitsOnBallot = ValidMarkLimits[intendedVote.ballotType]
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
    return prevVotes
  }
}
