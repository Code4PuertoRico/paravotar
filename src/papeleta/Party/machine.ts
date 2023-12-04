import { assign, createMachine, sendParent } from "xstate"
import { Party, PartyMachineContext, PartyMachineEvent } from "./types"

export const createPartyMachine = (parties: Party[]) =>
  createMachine<PartyMachineContext, PartyMachineEvent>(
    {
      id: "partyMachine",
      initial: "unselected",
      context: {
        parties,
        selectedParty: undefined,
      },
      states: {
        unselected: {
          on: {
            selection: {
              target: "selected",
              actions: ["notifySelected", "handleSelection"],
            },
          },
        },
        selected: {
          on: {
            unselect: {
              target: "unselected",
              actions: ["notifyNonSelected", "handleDeselection"],
              cond: "isValidDeselection",
            },
          },
        },
      },
    },
    {
      actions: {
        notifySelected: sendParent(
          ({ selectedParty }: PartyMachineContext) => ({
            type: "partySelected",
            selectedParty,
          })
        ),
        notifyNonSelected: sendParent("partyUnSelected"),
        handleSelection: assign<PartyMachineContext, PartyMachineEvent>(
          ({ selectedParty }, { selected }) => {
            if (!selectedParty) {
              return { selectedParty: selected }
            }

            const isSelected = selectedParty.id === selected.id

            if (isSelected) {
              return { selectedParty: undefined }
            }

            return { selectedParty: selected }
          }
        ),
        handleDeselection: assign<PartyMachineContext>(() => {
          return { selectedParty: undefined }
        }),
      },
      guards: {
        isValidDeselection: ({ selectedParty }, { selected }) =>
          !!(selectedParty && selectedParty.id === selected.id),
      },
    }
  )
