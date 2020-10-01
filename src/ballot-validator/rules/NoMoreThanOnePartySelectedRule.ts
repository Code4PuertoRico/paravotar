import { RuleOutcomeType, Selections } from "../types"
import BaseRule from "./BaseRule"

class NoMoreThanOnePartySelectedRule extends BaseRule {
  outcome(selections: Selections) {
    const outcome = !selections.every(row => row.every(cell => cell === 0))

    return {
      outcome: outcome ? RuleOutcomeType.allow : RuleOutcomeType.deny,
    }
  }
}

export default NoMoreThanOnePartySelectedRule
