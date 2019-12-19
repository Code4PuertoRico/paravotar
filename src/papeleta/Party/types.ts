import { EventObject, Interpreter } from "xstate";

export interface Party {
  id: string;
  description: string;
}

export interface PartyMachineContext {
  parties: Party[];
  selectedParty?: Party;
}

export interface PartyMachineEvent extends EventObject {
  selected: Party;
}

export type PartyActor = Interpreter<
  PartyMachineContext,
  any,
  PartyMachineEvent
>;
