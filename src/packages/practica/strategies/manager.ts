import { VoteEvent } from "../services/types"
import { Vote } from "../services/vote-service"
import { VoteUpdateInterface } from "./interfaces"

export class VoteUpdateManager {
  private strategy: VoteUpdateInterface

  constructor(strategy: VoteUpdateInterface) {
    this.strategy = strategy
  }

  add(intendedVote: VoteEvent, prevVotes: Vote[]) {
    return this.strategy.addVote(intendedVote, prevVotes)
  }

  remove(intendedVote: VoteEvent, prevVotes: Vote[]) {
    return this.strategy.removeVote(intendedVote, prevVotes)
  }
}
