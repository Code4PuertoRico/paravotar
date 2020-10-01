import {
  BallotType,
  ResultStatus,
  Rule,
  RuleOutcomeType,
  Ballot,
} from "./types"

import RuleGroups from "./ruleGroups"

const validate = (ballotSelections: Ballot, ballotType: BallotType) => {
  // Get rules to execute for a ballot
  const rules: Rule[] = RuleGroups[ballotType]

  // Execute rules for ballot
  const outcomes = rules.map(rule => ({
    ...rule.outcome(ballotSelections),
    ruleName: rule.getClassName(),
  }))

  // Check if any rule returned a deny outcome
  const hasFailures = outcomes.some(o => o.outcome === RuleOutcomeType.deny)

  // If no rule returned deny, then the ballot is valid
  if (!hasFailures) {
    return {
      status: ResultStatus.success,
      outcomes,
    }
  }

  // Otherwise the ballot is in valid
  return {
    status: ResultStatus.failure,
    outcomes,
  }
}

export default validate
