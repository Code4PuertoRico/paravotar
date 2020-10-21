import { Selection } from "../../../ballot-validator/types"
import { VoteEvent } from "../services/types"
import { Vote } from "../services/vote-service"
import { VoteUpdateInterface } from "./interfaces"

export class CandidateVoteStrategy implements VoteUpdateInterface {
  addVote(intendedVote: VoteEvent, prevVotes: Vote[]) {
    const newVote = new Vote(
      intendedVote.position,
      Selection.selected,
      intendedVote.candidate
    )

    return [...prevVotes, newVote]
  }

  removeVote(intendedVote: VoteEvent, prevVotes: Vote[]) {
    return prevVotes.filter(vote => {
      return !(
        intendedVote.position.row === vote.position.row &&
        intendedVote.position.column === vote.position.column
      )
    })
  }
}
