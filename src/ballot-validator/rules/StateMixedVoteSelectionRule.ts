import { RuleOutcomeType, StateBallot, Selection } from "../types"
import BaseRule from "./BaseRule"

class StateMixedVoteSelectionRule extends BaseRule {
  ruleName = "StateMixedVoteSelectionRule"

  outcome(ballotSelections: StateBallot) {
    const hasSelectedParty = ballotSelections.parties.some(
      p => p === Selection.selected
    )

    if (!hasSelectedParty) {
      return {
        outcome: RuleOutcomeType.allow,
      }
    }

    const partyIndex = ballotSelections.parties.findIndex(
      p => p === Selection.selected
    )

    const governorIndex = ballotSelections.governor.findIndex(
      g => g === Selection.selected
    )

    const residentCommissioner = ballotSelections.residentCommissioner.findIndex(
      rc => rc === Selection.selected
    )

    if (
      governorIndex !== -1 &&
      residentCommissioner !== -1 &&
      governorIndex !== partyIndex &&
      residentCommissioner !== partyIndex
    ) {
      return {
        outcome: RuleOutcomeType.deny,
        metadata: {
          section: "all",
        },
      }
    }

    return {
      outcome: RuleOutcomeType.allow,
    }
  }
}

export default StateMixedVoteSelectionRule
