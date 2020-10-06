import { useState } from "react"
import { BallotType } from "../../../ballot-validator/types"

import { VotesCoordinates } from "../../generate-ballot/types/ballot-machine"
import coordinatesToSections from "../services/coordinates-to-sections"
import { TransformedVotes } from "../services/types"
import useDeepCompareEffect from "./use-deep-compare-effect"

function getBallot(state) {
  const { ballots } = state.context

  if (ballots) {
    if (state.matches("governmental")) {
      const ballot = ballots.estatal
      const ballotType = BallotType.state

      return { ballot, ballotType }
    } else if (state.matches("legislative")) {
      const ballot = ballots.legislativa
      const ballotType = BallotType.legislative

      return { ballot, ballotType }
    } else if (state.matches("municipal")) {
      const ballot = ballots.municipal
      const ballotType = BallotType.municipality

      return { ballot, ballotType }
    }
  }
}

export default function useVotesTransform(votes: VotesCoordinates[], state) {
  const [
    transformedVotes,
    setTransformedVotes,
  ] = useState<TransformedVotes | null>(null)

  useDeepCompareEffect<VotesCoordinates[]>(() => {
    const res = getBallot(state)

    if (res) {
      const { ballot, ballotType } = res
      const transformedVotes = coordinatesToSections(votes, ballot, ballotType)

      setTransformedVotes({
        votes: transformedVotes,
        ballotConfig: ballot,
        ballotType,
      })
    }
  }, [votes, state.value])

  return transformedVotes
}
