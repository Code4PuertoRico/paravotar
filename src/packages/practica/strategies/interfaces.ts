import { VoteEvent } from "../services/types"
import { Vote } from "../services/vote-service"

export interface VoteUpdateInterface {
  addVote(intendedVote: VoteEvent, prevVotes: Vote[]): Vote[]
  removeVote(intendedVote: VoteEvent, prevVotes: Vote[]): Vote[]
}
