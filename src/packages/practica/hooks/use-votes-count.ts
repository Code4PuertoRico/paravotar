import { useState } from "react"
import { VoteCounts } from "../services/ballot-configs"

import { TransformedVotes } from "../services/types"
import useDeepCompareEffect from "./use-deep-compare-effect"

export default function useVotesCount(
  transformedVotes: TransformedVotes | null
) {
  const [votesCount, setVotesCount] = useState<VoteCounts | null>(null)

  useDeepCompareEffect(() => {
    if (transformedVotes) {
      const { ballotConfig, votes } = transformedVotes
      const votesCount: VoteCounts = ballotConfig.countVotes(votes)

      setVotesCount(votesCount)
    }
  }, [transformedVotes])

  return { votesCount, setVotesCount }
}
