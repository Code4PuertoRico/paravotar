import { Machine, assign, sendParent, send } from "xstate"
import {
  SectionData,
  SectionMachineContext,
  SectionMachineEvent,
} from "./types"
import { Candidate } from "../types"

export const createSectionMachine = (section: SectionData) =>
  Machine<SectionMachineContext, SectionMachineEvent>(
    {
      id: `sectionMachine-${section.id}`,
      initial: "notComplete",
      context: {
        section,
        selectedCandidates: [],
        limit: section.limit,
      },
      on: {
        partySelected: {
          target: "complete",
          actions: ["applyPartyOverride", "checkComplete", "notifyComplete"],
          cond: "isPartyOverride",
        },
        partyUnSelected: {
          target: "notComplete",
          actions: ["removePartyOverride", "checkComplete", "notifyComplete"],
          cond: "isPartyOverride",
        },
      },
      states: {
        notComplete: {
          on: {
            selection: {
              actions: ["handleSelection", "checkComplete"],
            },
            verifyComplete: {
              target: "complete",
              cond: "isComplete",
              actions: "notifyComplete",
            },
          },
        },
        complete: {
          on: {
            unselect: {
              target: "notComplete",
              actions: ["handleDeselection", "notifyNotComplete"],
              cond: "isValidDeselection",
            },
            verifyComplete: {
              target: "notComplete",
              cond: "isNotComplete",
            },
          },
        },
      },
    },
    {
      actions: {
        checkComplete: send("verifyComplete"),
        clearSelected: assign<SectionMachineContext>(() => ({
          selectedCandidates: [],
        })),
        handleSelection: assign(({ selectedCandidates }, { selected }) => {
          const isSelected = selectedCandidates.some(c => c.id === selected.id)

          if (isSelected) {
            const newCandidates = selectedCandidates.filter(
              c => c.id !== selected.id
            )

            return { selectedCandidates: newCandidates }
          }

          return { selectedCandidates: [...selectedCandidates, selected] }
        }),
        handleDeselection: assign(({ selectedCandidates }, { selected }) => {
          const isSelected = selectedCandidates.some(c => c.id === selected.id)

          if (isSelected) {
            const newCandidates = selectedCandidates.filter(
              c => c.id !== selected.id
            )

            return { selectedCandidates: newCandidates }
          }

          return { selectedCandidates }
        }),
        applyPartyOverride: assign(({ section, limit }, { party }) => {
          const partyCandidates: Candidate[] = []
          section.rows.forEach(candidates => {
            candidates.forEach(c => {
              if (partyCandidates.length < limit && c.party === party.id) {
                partyCandidates.push(c)
              }
            })
          })
          return { selectedCandidates: partyCandidates }
        }),
        removePartyOverride: assign<SectionMachineContext>(() => ({
          selectedCandidates: [],
        })),
        notifyNotComplete: sendParent("selection"),
        notifyComplete: sendParent("selection"),
      },
      guards: {
        isPartyOverride: (_, { partyOverride }) => partyOverride,
        isComplete: ({ limit, selectedCandidates }) =>
          selectedCandidates.length === limit,
        isNotComplete: ({ limit, selectedCandidates }) =>
          selectedCandidates.length < limit,
        isValidDeselection: ({ selectedCandidates }, { selected }) =>
          selectedCandidates.map(c => c.id).indexOf(selected.id) > -1,
      },
    }
  )
