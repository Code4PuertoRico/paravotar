import { createMachine, assign } from "xstate"
import {
  PracticaMobileStates,
  PracticaMobileEventTypes,
  PracticaMobileContext,
} from "../types/practica-mobile"

import * as services from "../services"

const {
  IDLE,
  LOADING_VOTER_DETAILS,
  SELECTING_BALLOT,
  INVALID_VOTER_ID,
  PRACTICE_IN_PROGRESS,
} = PracticaMobileStates

const { SEARCH_VOTER_ID, BALLOT_SELECTED } = PracticaMobileEventTypes

export const practicaMobileMachine = createMachine<PracticaMobileContext>(
  {
    initial: IDLE,
    context: {},
    states: {
      [IDLE]: {
        on: {
          [SEARCH_VOTER_ID]: LOADING_VOTER_DETAILS,
        },
      },
      [LOADING_VOTER_DETAILS]: {
        invoke: {
          src: "getVoterDetails",
          onDone: {
            actions: "saveVoterDetails",
            target: SELECTING_BALLOT,
          },
          onError: INVALID_VOTER_ID,
        },
      },
      [INVALID_VOTER_ID]: {
        on: {
          [SEARCH_VOTER_ID]: LOADING_VOTER_DETAILS,
        },
      },
      [SELECTING_BALLOT]: {
        on: {
          [BALLOT_SELECTED]: {
            actions: "spawnBallotActor",
            target: PRACTICE_IN_PROGRESS,
          },
        },
      },
      [PRACTICE_IN_PROGRESS]: {},
    },
  },
  {
    services: {
      getVoterDetails: (_, { voterId }) => services.getVoterDetails(voterId),
    },
    actions: {
      saveVoterDetails: assign((_, { data }) => ({
        voterDetails: data.parsedBody,
      })),
      spawnBallotActor: () => {
        console.log("spawning ballot actor")
      },
    },
  }
)
