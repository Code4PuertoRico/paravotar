import { RuleOutcomeType, Selection, MunicipalBallot } from "../types"
import BaseRule from "./BaseRule"

class MunicipalLegislatorDynamicSelectionRule extends BaseRule {
  outcome(ballotSelections: MunicipalBallot) {
    const maxVotes = ballotSelections.municipalLegislator.length

    const outcome =
      ballotSelections.municipalLegislator.reduce((counter, row) => {
        return (
          row.reduce(
            (rCount, value) =>
              value === Selection.selected ? rCount + 1 : rCount,
            0
          ) + counter
        )
      }, 0) <= maxVotes

    return {
      outcome: outcome ? RuleOutcomeType.allow : RuleOutcomeType.deny,
    }
  }
}

export default MunicipalLegislatorDynamicSelectionRule
