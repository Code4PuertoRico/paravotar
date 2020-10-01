import _ from "lodash"
import { RuleOutcomeType, Ballot, Selection } from "../types"
import BaseRule from "./BaseRule"

class NoEmptyBallotRule extends BaseRule {
  outcome(ballotSelections: Ballot) {
    const outcome = !_.flatten<Selection>(
      Object.values(ballotSelections).reduce(
        (arr, value) => arr.concat(value),
        [] as Selection[][]
      )
    ).every(selection => selection === 0)

    return {
      outcome: outcome ? RuleOutcomeType.allow : RuleOutcomeType.deny,
    }
  }
}

export default NoEmptyBallotRule
