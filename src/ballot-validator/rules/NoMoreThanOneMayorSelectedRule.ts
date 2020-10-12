import { RuleOutcomeType, Selection, MunicipalBallot } from "../types"
import BaseRule from "./BaseRule"

class NoMoreThanOneMayorSelectedRule extends BaseRule {
  ruleName = "NoMoreThanOneMayorSelectedRule"

  outcome(ballotSelections: MunicipalBallot) {
    const outcome =
      ballotSelections.mayor.reduce((counter, value) => {
        return value === Selection.selected ? counter + 1 : counter
      }, 0) <= 1

    return {
      outcome: outcome ? RuleOutcomeType.allow : RuleOutcomeType.deny,
    }
  }
}

export default NoMoreThanOneMayorSelectedRule
