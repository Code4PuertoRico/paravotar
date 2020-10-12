import { RuleOutcome, Selections } from "../types"

export default abstract class BaseRule {
  public abstract ruleName: string
  public abstract outcome(selections: Selections): RuleOutcome

  public getRuleName = () => {
    return this.ruleName
  }
}
