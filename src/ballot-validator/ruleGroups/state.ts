import NoMoreThanOneGovernorSelectedRule from "../rules/NoMoreThanOneGovernorSelectedRule"
import NoMoreThanOneResidentCommissionerRule from "../rules/NoMoreThanOneResidentCommissionerRule"
import StateMixtVoteSelectionRule from "../rules/StateMixtVoteSelectionRule"
import { SharedRules } from "./shared"

const StateBallotRuleGroup = [
  ...SharedRules,
  new NoMoreThanOneGovernorSelectedRule(),
  new NoMoreThanOneResidentCommissionerRule(),
  new StateMixtVoteSelectionRule(),
]

export default StateBallotRuleGroup
