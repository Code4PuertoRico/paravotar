import NoMoreThanOneGovernorSelectedRule from "../rules/NoMoreThanOneGovernorSelectedRule"
import NoMoreThanOneResidentCommissionerRule from "../rules/NoMoreThanOneResidentCommissionerRule"
import StateMixedVoteSelectionRule from "../rules/StateMixedVoteSelectionRule"
import { SharedRules } from "./shared"

const StateBallotRuleGroup = [
  ...SharedRules,
  new NoMoreThanOneGovernorSelectedRule(),
  new NoMoreThanOneResidentCommissionerRule(),
  new StateMixedVoteSelectionRule(),
  // new StateMixedVoteSelectionSameColumnRule(),
]

export default StateBallotRuleGroup
