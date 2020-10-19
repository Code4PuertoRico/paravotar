import { createMachine, assign } from "xstate"
import { FindYourCenterContext, FindYourCenterEvent } from "./types"

const isNumberExpr = new RegExp(/^\d+$/)

const getVoterDetails = (voterId?: string) =>
  fetch(`https://api.paravotar.org/consulta?voterId=${voterId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP status code: " + response.status)
      }
      return response.json()
    })
    .then(res => {
      return fetch(
        `https://api.paravotar.org/voterCenter?precinto=${res.precinto}&unidad=${res.unidad}`
      ).then(response => {
        if (!response.ok) {
          throw new Error("HTTP status code: " + response.status)
        }
        return response.json()
      })
    })

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
