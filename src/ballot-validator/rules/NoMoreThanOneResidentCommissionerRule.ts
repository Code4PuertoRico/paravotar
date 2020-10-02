import { RuleOutcomeType, StateBallot, Selection } from "../types"
import BaseRule from "./BaseRule"

class NoMoreThanOneResidentCommissionerRule extends BaseRule {
  outcome(ballotSelections: StateBallot) {
    const outcome =
      ballotSelections.residentCommissioner.reduce((counter, value) => {
        return value === Selection.selected ? counter + 1 : counter
      }, 0) <= 1

    return {
      outcome: outcome ? RuleOutcomeType.allow : RuleOutcomeType.deny,
    }
  }
}

export default NoMoreThanOneResidentCommissionerRule
