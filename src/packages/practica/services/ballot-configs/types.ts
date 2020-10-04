import {
  Candidate,
  EmptyCandidacy,
  Party,
  WriteInCandidate,
  Rule,
  Header,
} from "./base"

export type CandidatesRow = (Candidate | WriteInCandidate | EmptyCandidacy)[]
export type PartyRow = (Party | Rule)[]

export type StateBallotStructure = [
  PartyRow,
  Header[],
  CandidatesRow,
  Header[],
  CandidatesRow
]

export type MunicipalBallotStructure = [
  PartyRow,
  Header[],
  CandidatesRow,
  Header[],
  ...CandidatesRow[]
]

export type LegislativeBallotStructure = [
  PartyRow,
  Header[],
  CandidatesRow,
  Header[],
  ...CandidatesRow[]
]

export type BallotStructure =
  | StateBallotStructure
  | MunicipalBallotStructure
  | LegislativeBallotStructure
