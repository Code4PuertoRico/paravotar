import { SharedRules } from "./shared"
import NoMoreThanOneMayorSelectedRule from "../rules/NoMoreThanOneMayorSelectedRule"
import MunicipalLegislatorDynamicSelectionRule from "../rules/MunicipalLegislatorDynamicSelectionRule"
import MunicipalMixedVoteSelection from "../rules/MunicipalMixedVoteSelection"
import MunicipalMixedVoteSelectionSameColumn from "../rules/MunicipalMixedVoteSelectionSameColumn"

const MunicipalityBallotRuleGroup = [
  ...SharedRules,
  new NoMoreThanOneMayorSelectedRule(),
  new MunicipalLegislatorDynamicSelectionRule(),
  new MunicipalMixedVoteSelection(),
  new MunicipalMixedVoteSelectionSameColumn(),
]

export default MunicipalityBallotRuleGroup
