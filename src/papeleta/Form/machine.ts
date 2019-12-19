import { Machine, assign, spawn } from "xstate";
import { createSectionMachine } from "../Section/machine";
import { createPartyMachine } from "../Party/machine";
import { Party } from "../Party/types";
import { SectionData } from "../Section/types";
import {
  BallotMachineContext,
  BallotMachineEvent,
  AllowedActors
} from "./types";

export const createBallotMachine = (
  parties: Party[],
  papeletaSections: SectionData[]
) =>
  Machine<BallotMachineContext, BallotMachineEvent>(
    {
      id: "papeletaMachine",
      initial: "init",
      context: {
        parties,
        sections: papeletaSections,
        actors: {}
      },
      on: {
        partySelected: {
          actions: "broadcastSelectedParty"
        },
        partyUnSelected: {
          actions: "broadcastUnSelectedParty"
        }
      },
      states: {
        init: {
          entry: "spawnActorPerSelectionRow",
          on: {
            "": "notCompleted"
          }
        },
        completed: {
          on: {
            selection: {
              target: "notCompleted",
              cond: "isNotComplete"
            }
          }
        },
        notCompleted: {
          on: {
            selection: {
              target: "completed",
              cond: "isComplete"
            }
          }
        }
      }
    },
    {
      actions: {
        spawnActorPerSelectionRow: assign(context => {
          const { parties, sections } = context;
          const actors: { [key: string]: AllowedActors } = {};

          sections.forEach(s => {
            actors[`section-${s.id}`] = spawn(
              createSectionMachine(s),
              `section-${s.id}`
            );
          });

          actors.parties = spawn(createPartyMachine(parties));

          return { actors };
        }),
        broadcastSelectedParty: ({ actors }, { selectedParty }) => {
          const sections = Object.keys(actors).filter(k =>
            k.startsWith("section")
          );

          sections.forEach(actor => {
            actors[actor].send("partySelected", {
              party: selectedParty,
              partyOverride: true
            });
          });
        },
        broadcastUnSelectedParty: ({ actors }, { selectedParty }) => {
          const sections = Object.keys(actors).filter(k =>
            k.startsWith("section")
          );

          sections.forEach(actor => {
            actors[actor].send("partyUnSelected", {
              party: selectedParty,
              partyOverride: true
            });
          });
        }
      },
      guards: {
        isComplete: ({ actors }) => {
          const sections = Object.keys(actors).filter(k =>
            k.startsWith("section")
          );

          return sections.every(s => {
            return actors[s].state.value === "complete";
          });
        },
        isNotComplete: ({ actors }) => {
          const sections = Object.keys(actors).filter(k =>
            k.startsWith("section")
          );

          return !sections.every(s => {
            return actors[s].state.value === "complete";
          });
        }
      }
    }
  );
