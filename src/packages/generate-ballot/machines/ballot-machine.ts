import { Machine, assign } from "xstate"
import {
  LegislativeBallotConfig,
  MunicipalBallotConfig,
  StateBallotConfig,
} from "../../practica/services/ballot-configs"

import { PUBLIC_S3_BUCKET } from "../../practica/services/constants"
import { BallotMachineContext } from "../types/ballot-machine"

async function fetchBallot(path: string | null) {
  if (path) {
    const resp = await fetch(`${PUBLIC_S3_BUCKET}${path}/data.json`)
    const data = await resp.json()

    return data
  }

  throw Error("Invalid ballot path")
}

export const BallotMachine = Machine<BallotMachineContext>({
  id: "ballotMachine",
  initial: "idle",
  context: {
    type: "",
    path: "",
    votes: [],
    ballot: undefined,
  },
  states: {
    idle: {
      on: {
        FETCH: "loading",
      },
    },
    loading: {
      invoke: {
        id: "fetchBallot",
        src: (context: BallotMachineContext) => fetchBallot(context.path),
        onDone: {
          target: "success",
          actions: assign({
            ballot: (context, event) => {
              if (context.type === "estatal") {
                return new StateBallotConfig(event.data, context.path).structure
              } else if (context.type === "municipal") {
                return new MunicipalBallotConfig(event.data, context.path)
                  .structure
              } else {
                return new LegislativeBallotConfig(event.data, context.path)
                  .structure
              }
            },
          }),
        },
        onError: {
          target: "failure",
        },
      },
    },
    success: {
      id: "generateBallotMachine",
      initial: "idle",
      states: {
        idle: {
          on: {
            "": [
              {
                target: "governmental",
                cond(context) {
                  return context.type === "estatal"
                },
              },
              {
                target: "legislative",
                cond(context) {
                  return context.type === "legislativa"
                },
              },
              {
                target: "municipal",
                cond(context) {
                  return context.type === "municipal"
                },
              },
              {
                target: "unknown",
                cond(context) {
                  return (
                    context.type !== "estatal" &&
                    context.type !== "legislativa" &&
                    context.type !== "municipal"
                  )
                },
              },
            ],
          },
        },
        governmental: {
          type: "final",
        },
        legislative: {
          type: "final",
        },
        municipal: {
          type: "final",
        },
        unknown: {
          type: "final",
        },
      },
    },
    failure: {
      type: "final",
    },
  },
})
