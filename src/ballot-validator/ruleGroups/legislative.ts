import LegislativeMixedVoteSelection from "../rules/LegislativeMixedVoteSelection"
import NoMoreThanOneAtLargeRepresentativeRule from "../rules/NoMoreThanOneAtLargeRepresentativeRule"
import NoMoreThanOneAtLargeSenatorRule from "../rules/NoMoreThanOneAtLargeSenatorRule"
import NoMoreThanOneDistrictRepresentativeRule from "../rules/NoMoreThanOneDistrictRepresentativeRule"
import NoMoreThanTwoDistrictSenatorsRule from "../rules/NoMoreThanTwoDistrictSenatorsRule"
import { SharedRules } from "./shared"

const LegislativeBallotRuleGroup = [
  ...SharedRules,
  new NoMoreThanOneDistrictRepresentativeRule(),
  new NoMoreThanTwoDistrictSenatorsRule(),
  new NoMoreThanOneAtLargeRepresentativeRule(),
  new NoMoreThanOneAtLargeSenatorRule(),
  new LegislativeMixedVoteSelection(),
]

export default LegislativeBallotRuleGroup
