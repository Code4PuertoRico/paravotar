import BaseRule from "./rules/BaseRule"

export enum Selection {
  selected = "selected",
  notSelected = "notSelected",
}

export interface BaseBallot {
  parties: Selection[]
}

export interface StateBallot extends BaseBallot {
  governor: Selection[]
  residentCommissioner: Selection[]
}

export interface MunicipalBallot extends BaseBallot {
  mayor: Selection[]
  municipalLegislator: Selection[][]
}

export interface LegislativeBallot extends BaseBallot {
  districtRepresentative: Selection[]
  districtSenator: Selection[][]
  atLargeRepresentative: Selection[][]
  atLargeSenator: Selection[][]
}

export type Ballot = StateBallot | MunicipalBallot | LegislativeBallot

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyMetadata = { [key: string]: any }

export interface RuleOutcome<M = AnyMetadata> {
  outcome: RuleOutcomeType
  metadata?: M
}

export type Rule = BaseRule
