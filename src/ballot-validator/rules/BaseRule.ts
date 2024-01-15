import { Ballot, RuleOutcome } from "../types"

export default abstract class BaseRule {
  public abstract ruleName: string
  public abstract outcome(selections: Ballot): RuleOutcome

  public getRuleName = () => {
    return this.ruleName
  }
}
