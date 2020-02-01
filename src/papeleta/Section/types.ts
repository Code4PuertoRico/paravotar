import { EventObject, Interpreter } from "xstate"
import { Candidate } from "../types"
import { Party } from "../Party/types"

export interface SectionData {
  id: string
  name: string
  limit: number
  maxColumns: number
  rows: Candidate[][]
}

export interface SectionMachineContext {
  section: SectionData
  limit: number
  selectedCandidates: Candidate[]
}

export interface SectionMachineEvent extends EventObject {
  selected: Candidate
  party: Party
  partyOverride: boolean
}

export type SectionActor = Interpreter<
  SectionMachineContext,
  any,
  SectionMachineEvent
>
