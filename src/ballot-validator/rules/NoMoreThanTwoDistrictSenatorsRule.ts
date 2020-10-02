import { RuleOutcomeType, Selection, LegislativeBallot } from "../types"
import BaseRule from "./BaseRule"

class NoMoreThanTwoDistrictSenatorsRule extends BaseRule {
  outcome(ballotSelections: LegislativeBallot) {
    const outcome =
      ballotSelections.districtSenator.reduce((counter, row) => {
        return (
          row.reduce(
            (rCount, value) =>
              value === Selection.selected ? rCount + 1 : rCount,
            0
          ) + counter
        )
      }, 0) <= 2

    return {
      outcome: outcome ? RuleOutcomeType.allow : RuleOutcomeType.deny,
    }
  }
}

export default NoMoreThanTwoDistrictSenatorsRule
