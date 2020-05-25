import _ from "lodash"
import { createMachine, assign } from "xstate"
import {
  PracticaMobileStates,
  PracticaMobileEventTypes,
  PracticaMobileContext,
} from "../types/practica-mobile"

import * as services from "../services"
import { EnterVoterId } from "../components/EnterVoterId"

const {
  IDLE,
  LOADING_VOTER_DETAILS,
  SELECTING_BALLOT,
  INVALID_VOTER_ID,
  PRACTICE_IN_PROGRESS,
  LOADING_BALLOT,
  FAILED_TO_LOAD_BALLOT,
} = PracticaMobileStates

const { SEARCH_VOTER_ID, BALLOT_SELECTED } = PracticaMobileEventTypes

export const practicaMobileMachine = createMachine<PracticaMobileContext>(
  {
    initial: IDLE,
    states: {
      [IDLE]: {
        on: {
          [SEARCH_VOTER_ID]: LOADING_VOTER_DETAILS,
        },
        meta: {
          Component: EnterVoterId,
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
        meta: {
          Component: EnterVoterId,
        },
      },
      [INVALID_VOTER_ID]: {
        on: {
          [SEARCH_VOTER_ID]: LOADING_VOTER_DETAILS,
        },
        meta: {
          Component: EnterVoterId,
        },
      },
      [SELECTING_BALLOT]: {
        on: {
          [BALLOT_SELECTED]: {
            actions: "saveSelectedBallot",
            target: LOADING_BALLOT,
          },
        },
      },
      [LOADING_BALLOT]: {
        invoke: {
          src: "getBallotDetails",
          onDone: {
            actions: "saveBallotDetails",
            target: PRACTICE_IN_PROGRESS,
          },
          onError: FAILED_TO_LOAD_BALLOT,
        },
      },
      [PRACTICE_IN_PROGRESS]: {
        on: {},
      },
      [FAILED_TO_LOAD_BALLOT]: {
        on: {},
      },
    },
  },
  {
    services: {
      getVoterDetails: (_, { voterId }) => services.getVoterDetails(voterId),
      getBallotDetails: ({ voterDetails, selectedBallotType }) =>
        services.getBallotDetails(
          _.get(voterDetails, `papeletas.${selectedBallotType}`, "")
        ),
    },
    actions: {
      saveVoterDetails: assign((_, { data }) => ({
        voterDetails: data.parsedBody,
      })),
      saveBallotDetails: assign((_, { data }) => ({
        ballotDetails: data.parsedBody,
      })),
      saveSelectedBallot: assign((_, { ballotType }) => ({
        selectedBallotType: ballotType,
      })),
    },
  }
)
