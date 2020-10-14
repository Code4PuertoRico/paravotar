import LegislativeMixedVoteSelection from "../rules/LegislativeMixedVoteSelection"
import LegislativeMixedVoteSelectionSameColumn from "../rules/LegislativeMixedVoteSelectionSameColumn"
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
  new LegislativeMixedVoteSelectionSameColumn(),
]

export default LegislativeBallotRuleGroup
