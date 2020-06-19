import React, { useEffect } from "react"

import { EventObject } from "xstate"
import { useMachine } from "@xstate/react"

import {
  GovernmentalBallot,
  LegislativeBallot,
  MunicipalBallot,
} from "../packages/generate-ballot/components/index"
import Switch from "../components/switch"
import Case from "../components/case"
import Default from "../components/default"
import { BallotMachine } from "../packages/generate-ballot/machines/ballot-machine"
import { BallotMachineContext } from "../packages/generate-ballot/types/ballot-machine"

type PageProps = {
  location: Location
}

export default function GenerateBallot({ location }: PageProps) {
  const params = new URLSearchParams(location.search)
  const ballotType = params.get("ballotType")
  const ballotPath = params.get("ballotPath")
  const rawVotes = params.get("votes") || "[]"
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
            path={state.context.path}
            structure={state.context.ballot}
            votes={votes}
          />
        </Case>
        <Case value={{ success: "municipal" }}>
          <MunicipalBallot
            path={state.context.path}
            structure={state.context.ballot}
            votes={votes}
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
