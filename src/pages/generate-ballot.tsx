import React, { useEffect } from "react"

import { Machine, assign, EventObject } from "xstate"
import { useMachine } from "@xstate/react"

import {
  GovernmentalBallot,
  LegislativeBallot,
  MunicipalBallot,
} from "../components/ballots/index"
import { PUBLIC_S3_BUCKET } from "../packages/practica/services/constants"
import Switch from "../components/switch"
import Case from "../components/case"
import Default from "../components/default"

type BallotContent = {
  ocrResult: string
  logoImg?: string
}

type VotesCoordinates = {
  column: number
  row: number
}

type BallotMachineContext = {
  type: string | null
  path: string | null
  votes: VotesCoordinates[]
  ballot: BallotContent[][]
}

async function fetchBallot(path: string | null) {
  if (path) {
    const resp = await fetch(`${PUBLIC_S3_BUCKET}${path}/data.json`)
    const data = await resp.json()

    return data
  }

  throw Error("Invalid ballot path")
}

const BallotMachine = Machine<BallotMachineContext>({
  id: "ballotMachine",
  initial: "idle",
  context: {
    type: "",
    path: "",
    ballot: [],
    votes: [],
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
          actions: assign({ ballot: (_, event) => event.data }),
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

type PageProps = {
  location: Location
}

export default function GenerateBallot({ location }: PageProps) {
  const params = new URLSearchParams(location.search)
  const ballotType = params.get("ballotType")
  const ballotPath = params.get("ballotPath")
  const rawVotes = params.get("votes") || ""
  const votes = JSON.parse(rawVotes)

  const [state, send] = useMachine<BallotMachineContext, EventObject>(
    BallotMachine,
    {
      context: {
        type: ballotType,
        path: ballotPath,
        votes,
      },
    }
  )

  useEffect(() => {
    send("FETCH")
  }, [send])

  if (state.matches("success") && state.context.path) {
    return (
      <Switch state={state}>
        <Case value={{ success: "governmental" }}>
          <GovernmentalBallot
            path={state.context.path}
            structure={state.context.ballot}
            votes={votes}
          />
        </Case>
        <Case value={{ success: "legislative" }}>
          <LegislativeBallot
            ballotPath={state.context.path}
            votes={state.context.ballot}
          />
        </Case>
        <Case value={{ success: "municipal" }}>
          <MunicipalBallot
            ballotPath={state.context.path}
            votes={state.context.ballot}
          />
        </Case>
        <Default>
          <div>Unknown</div>
        </Default>
      </Switch>
    )
  }

  return (
    <Switch state={state}>
      <Case value="loading">
        <div>Loading...</div>
      </Case>
      <Case value="failure">
        <div>Failure</div>
      </Case>
      <Default>
        <div>Test</div>
      </Default>
    </Switch>
  )
}
