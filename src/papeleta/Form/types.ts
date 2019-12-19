import { EventObject, Interpreter } from "xstate";
import { Party, PartyMachineContext, PartyMachineEvent } from "../Party/types";
import {
  SectionData,
  SectionMachineContext,
  SectionMachineEvent
} from "../Section/types";

export type AllowedActors =
  | Interpreter<SectionMachineContext, any, SectionMachineEvent>
  | Interpreter<PartyMachineContext, any, PartyMachineEvent>;

export interface BallotMachineContext {
  parties: Party[];
  sections: SectionData[];
  actors: {
    [key: string]: AllowedActors;
  };
}

export interface BallotMachineEvent extends EventObject {
  selectedParty: Party;
}
