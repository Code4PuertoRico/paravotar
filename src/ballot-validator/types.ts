import BaseRule from "./rules/BaseRule"

export type Selections = (0 | 1)[][]

export enum BallotType {
  state = "state",
  municipality = "municipality",
  legislative = "legislative",
}

export enum RuleOutcomeType {
  allow = "allow",
  deny = "deny",
}

export enum ResultStatus {
  success = "success",
  failure = "failure",
}

export type AnyMetadata = { [key: string]: any }

export interface RuleOutcome<M = AnyMetadata> {
  outcome: RuleOutcomeType
  metadata?: M
}

export type Rule = BaseRule
