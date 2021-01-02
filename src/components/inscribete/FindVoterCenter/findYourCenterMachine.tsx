import { createMachine, assign } from "xstate"
import api from "../../../services/api"
import { FindYourCenterContext, FindYourCenterEvent } from "./types"

const isNumberExpr = new RegExp(/^\d+$/)

const getVoterDetails = async (voterId?: string) => {
  const response = await api.get(`/consulta?voterId=${voterId}`)

  return response
}

export const findYourCenterMachine = createMachine<
  FindYourCenterContext,
  FindYourCenterEvent
>(
  {
    id: "findYourCenterMachine",
    initial: "idle",
    states: {
      idle: {
        on: {
          submit: {
            target: "fetchingVoterDetails",
            cond: "hasValidVoterId",
            actions: "persistVoterId",
          },
        },
      },
      fetchingVoterDetails: {
        invoke: {
          src: "fetchVoterDetails",
          onDone: "loadGoogleMapsLinks",
          onError: "failure",
        },
      },
      failure: {
        after: {
          [5000]: "idle",
        },
        on: {
          submit: {
            target: "fetchingVoterDetails",
            cond: "hasValidVoterId",
            actions: "persistVoterId",
          },
        },
      },
      loadGoogleMapsLinks: {
        on: {
          submit: {
            target: "fetchingVoterDetails",
            cond: "hasValidVoterId",
            actions: "persistVoterId",
          },
        },
      },
    },
  },
  {
    guards: {
      hasValidVoterId: (_, { voterId }) => {
        if (typeof voterId !== "string") {
          return false
        }

        return isNumberExpr.test(voterId)
      },
    },
    actions: {
      persistVoterId: assign((_, { voterId }: FindYourCenterEvent) => ({
        voterId,
      })),
    },
    services: {
      fetchVoterDetails: (_, { voterId }) => getVoterDetails(voterId),
    },
  }
)
