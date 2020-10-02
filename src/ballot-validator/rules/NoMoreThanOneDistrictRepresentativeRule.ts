import { RuleOutcomeType, Selection, LegislativeBallot } from "../types"
import BaseRule from "./BaseRule"

class NoMoreThanOneDistrictRepresentativeRule extends BaseRule {
  outcome(ballotSelections: LegislativeBallot) {
    const outcome =
      ballotSelections.districtRepresentative.reduce((counter, value) => {
        return value === Selection.selected ? counter + 1 : counter
      }, 0) <= 1

    return {
      outcome: outcome ? RuleOutcomeType.allow : RuleOutcomeType.deny,
    }
  }
}

export default NoMoreThanOneDistrictRepresentativeRule
