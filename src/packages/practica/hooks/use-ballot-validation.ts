import { useState } from "react"

import { ResultStatus } from "../../../ballot-validator/types"
import BallotValidator from "../../../ballot-validator/index"
import useDeepCompareEffect from "./use-deep-compare-effect"
import { TransformedVotes } from "../services/types"

export default function useBallotValidation(
  transformedVotes: TransformedVotes | null
) {
  const [ballotStatus, setBallotStatus] = useState<ResultStatus | null>(null)

  useDeepCompareEffect<TransformedVotes | null>(() => {
    if (transformedVotes) {
      const { votes, ballotType } = transformedVotes
      const results = BallotValidator(votes, ballotType)

      setBallotStatus(results.status)
    }
  }, [transformedVotes])

  return { ballotStatus, setBallotStatus }
}
