import _ from "lodash"
import { RuleOutcomeType, Ballot, Selection } from "../types"
import BaseRule from "./BaseRule"

class NoEmptyBallotRule extends BaseRule {
  ruleName = "NoEmptyBallotRule"

  outcome(ballotSelections: Ballot) {
    // Extract & concat all section array values then flatten for simpler selection checks
    const outcome = !_.flatten<Selection>(
      Object.values(ballotSelections).reduce(
        (arr, value) => arr.concat(value),
        [] as Selection[][]
      )
    ).every(selection => selection === Selection.notSelected)

    return {
      outcome: outcome ? RuleOutcomeType.allow : RuleOutcomeType.deny,
    }
  }
}

export default NoEmptyBallotRule
