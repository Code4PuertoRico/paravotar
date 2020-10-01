import { RuleOutcome, Selections } from "../types"

export default abstract class BaseRule {
  public abstract outcome(selections: Selections): RuleOutcome

  public getClassName = () => {
    return this.constructor.name
  }
}
