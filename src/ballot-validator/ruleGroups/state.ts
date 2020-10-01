import NoEmptyBallotRule from "../rules/NoEmptyBallotRule"
import NoMoreThanOnePartySelectedRule from "../rules/NoMoreThanOnePartySelectedRule"

const StateBallotRuleGroup = [
  new NoEmptyBallotRule(),
  new NoMoreThanOnePartySelectedRule(),
]

export default StateBallotRuleGroup
