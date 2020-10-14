import { ResultStatus, ValidatorReturnValue } from "../types"

const KEY_PREFIX = "ballot-validator"

const RuleMessageMap: { [key: string]: (metadata?: any) => string } = {
  NoEmptyBallotRule: () => `${KEY_PREFIX}.NoEmptyBallotRule`,
  NoMoreThanOnePartySelectedRule: () =>
    `${KEY_PREFIX}.NoMoreThanOnePartySelectedRule`,
  NoMoreThanOneGovernorSelectedRule: () =>
    `${KEY_PREFIX}.NoMoreThanOneGovernorSelectedRule`,
  NoMoreThanOneResidentCommissionerRule: () =>
    `${KEY_PREFIX}.NoMoreThanOneResidentCommissionerRule`,
  NoMoreThanOneDistrictRepresentativeRule: () =>
    `${KEY_PREFIX}.NoMoreThanOneDistrictRepresentativeRule`,
  NoMoreThanTwoDistrictSenatorsRule: () =>
    `${KEY_PREFIX}.NoMoreThanTwoDistrictSenatorsRule`,
  NoMoreThanOneAtLargeRepresentativeRule: () =>
    `${KEY_PREFIX}.NoMoreThanOneAtLargeRepresentativeRule`,
  NoMoreThanOneAtLargeSenatorRule: () =>
    `${KEY_PREFIX}.NoMoreThanOneAtLargeSenatorRule`,
  NoMoreThanOneMayorSelectedRule: () =>
    `${KEY_PREFIX}.NoMoreThanOneMayorSelectedRule`,
  MunicipalLegislatorDynamicSelectionRule: () =>
    `${KEY_PREFIX}.MunicipalLegislatorDynamicSelectionRule`,
  StateMixedVoteSelectionRule: () =>
    `${KEY_PREFIX}.StateMixedVoteSelectionRule`,
  StateMixedVoteSelectionSameColumnRule: () =>
    `${KEY_PREFIX}.StateMixedVoteSelectionSameColumnRule`,
  LegislativeMixedVoteSelection: () =>
    `${KEY_PREFIX}.LegislativeMixedVoteSelection`,
  LegislativeMixedVoteSelectionSameColumn: () =>
    `${KEY_PREFIX}.LegislativeMixedVoteSelectionSameColumn`,
  MunicipalMixedVoteSelection: () =>
    `${KEY_PREFIX}.MunicipalMixedVoteSelection`,
  MunicipalMixedVoteSelectionSameColumn: () =>
    `${KEY_PREFIX}.MunicipalMixedVoteSelectionSameColumn`,
}

export const toFriendlyErrorMessages = (result: ValidatorReturnValue) => {
  if (result.status === ResultStatus.success) {
    return []
  }

  return result.outcomes.denied
    .map(
      ({ ruleName, metadata }) =>
        RuleMessageMap[ruleName] && RuleMessageMap[ruleName](metadata)
    )
    .filter(m => m !== undefined)
}
