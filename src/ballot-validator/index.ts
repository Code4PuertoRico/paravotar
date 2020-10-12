import {
  BallotType,
  ResultStatus,
  Rule,
  RuleOutcomeType,
  Ballot,
  ValidatorReturnValue,
} from "./types"

import RuleGroups from "./ruleGroups"

const validate = (
  ballotSelections: Ballot,
  ballotType: BallotType
): ValidatorReturnValue => {
  // Get rules to execute for a ballot
  const rules: Rule[] = RuleGroups[ballotType]

  // Execute rules for ballot
  const outcomes = rules.map(rule => ({
    ...rule.outcome(ballotSelections),
    ruleName: rule.getRuleName(),
  }))

  // Check if any rule returned a deny outcome
  const hasFailures = outcomes.some(o => o.outcome === RuleOutcomeType.deny)

  // If no rule returned deny, then the ballot is valid
  if (!hasFailures) {
    return {
      status: ResultStatus.success,
      outcomes: {
        allowed: outcomes,
        denied: [],
      },
    }
  }

  // Otherwise the ballot is in valid
  return {
    status: ResultStatus.failure,
    outcomes: {
      allowed: outcomes.filter(o => o.outcome === RuleOutcomeType.allow),
      denied: outcomes.filter(o => o.outcome === RuleOutcomeType.deny),
    },
  }
}

export default validate
