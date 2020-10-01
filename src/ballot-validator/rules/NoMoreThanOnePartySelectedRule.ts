import { RuleOutcomeType, Ballot, Selection } from "../types"
import BaseRule from "./BaseRule"

class NoMoreThanOnePartySelectedRule extends BaseRule {
  outcome(ballotSelections: Ballot) {
    const outcome =
      ballotSelections.parties.reduce((counter, value) => {
        return value === Selection.selected ? counter + 1 : counter
      }, 0) <= 1

    return {
      outcome: outcome ? RuleOutcomeType.allow : RuleOutcomeType.deny,
    }
  }
}

export default NoMoreThanOnePartySelectedRule
