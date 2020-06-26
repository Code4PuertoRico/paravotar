import _ from "lodash"
import { createMachine, assign } from "xstate"
import {
  PracticaMobileStates,
  PracticaMobileEventTypes,
  PracticaMobileContext,
} from "../types/practica-mobile"

import * as services from "../services"
import { EnterVoterId } from "../components/EnterVoterId"
import { SelectingBallot } from "../components/SelectingBallot"
import { BallotService } from "../services/BallotService"
import { SelectingVotingMethod } from "../components/SelectingVotingMethod"
import { VotoIntegro } from "../components/VotoIntegro"

const {
  IDLE,
  LOADING_VOTER_DETAILS,
  SELECTING_BALLOT,
  INVALID_VOTER_ID,
  SELECTING_VOTING_METHOD,
  LOADING_BALLOT,
  FAILED_TO_LOAD_BALLOT,
  VOTO_INTEGRO,
  VOTO_MIXTO,
  VOTO_CANDIDATURA,
} = PracticaMobileStates

const {
  SEARCH_VOTER_ID,
  BALLOT_SELECTED,
  INTEGRO_SELECTED,
  MIXTO_SELECTED,
  CANDIDATURA_SELECTED,
} = PracticaMobileEventTypes

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
        meta: {
          Component: SelectingBallot,
        },
      },
      [LOADING_BALLOT]: {
        invoke: {
          src: "getBallotDetails",
          onDone: {
            actions: ["saveBallotDetails", "initiateBallot"],
            target: SELECTING_VOTING_METHOD,
          },
          onError: FAILED_TO_LOAD_BALLOT,
        },
        meta: {
          Component: SelectingBallot,
        },
      },
      [SELECTING_VOTING_METHOD]: {
        on: {
          [INTEGRO_SELECTED]: VOTO_INTEGRO,
          [MIXTO_SELECTED]: VOTO_MIXTO,
          [CANDIDATURA_SELECTED]: VOTO_CANDIDATURA,
        },
        meta: {
          Component: SelectingVotingMethod,
        },
      },
      [FAILED_TO_LOAD_BALLOT]: {
        on: {},
      },
      [VOTO_INTEGRO]: {
        on: {},
        meta: {
          Component: VotoIntegro,
        },
      },
      [VOTO_MIXTO]: {},
      [VOTO_CANDIDATURA]: {},
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
      saveBallotDetails: assign((_, { data }) => {
        console.log({ data })

        return {
          ballotDetails: data.parsedBody,
        }
      }),
      initiateBallot: assign(
        ({ selectedBallotType, voterDetails, ballots }, { data }) => ({
          ballots: {
            ...ballots,
            [selectedBallotType as string]: new BallotService(
              _.get(voterDetails, `papeletas[${selectedBallotType}]`, ""),
              data.parsedBody
            ),
          },
        })
      ),
      saveSelectedBallot: assign((_, { ballotType }) => ({
        selectedBallotType: ballotType,
      })),
    },
  }
)
