import React, { useEffect, createRef, useRef } from "react"
import { Machine, assign } from "xstate"
import { useMachine } from "@xstate/react"

import { AbsenteeVoter, EarlyVoter } from "../constants"
import Switch from "../../switch"
import Case from "../../case"
import Default from "../../default"
import SpecialVoterCard from "./SpecialVoterCard"
import SpecialVoterReasons from "./SpecialVoterReasons"

const config = {
  id: "special-voters",
  initial: "idle",
  context: {
    previous: "",
  },
  states: {
    idle: {
      on: {
        ABSENTEE_VOTER_TOGGLED: "absenteeVoter",
        EARLY_VOTER_TOGGLED: "earlyVoter",
      },
      exit: ["handlePrevUpdate"],
    },
    absenteeVoter: {
      on: {
        CLOSED: "idle",
      },
      exit: ["handlePrevUpdate"],
    },
    earlyVoter: {
      on: {
        CLOSED: "idle",
      },
      exit: ["handlePrevUpdate"],
    },
  },
}

const actions = {
  handlePrevUpdate: assign({
    previous: context => {
      if (context.previous === "idle") {
        return "reasons"
      }

      return "idle"
    },
  }),
}

const SpecialVoterMachine = Machine(config, {
  actions,
})

export default function SpecialVoterCards() {
  const ref = useRef<HTMLDivElement>()
  const [state, send] = useMachine(SpecialVoterMachine)

  useEffect(() => {
    if (state.context.previous === "reasons" && ref && ref.current) {
      ref.current.focus()
    }
  }, [ref, state.context])

  return (
    <>
      <Switch className="mt-12 mb-32" value={state.value}>
        <Case value="absenteeVoter">
          <SpecialVoterReasons
            icon={AbsenteeVoter.icon}
            title="Electores con derecho al Voto Ausente"
            reasons={AbsenteeVoter.reasons}
            documents={AbsenteeVoter.documents}
            exceptions={AbsenteeVoter.exceptions}
            onClickClose={() => send("CLOSED")}
          />
        </Case>
        <Case value="earlyVoter">
          <SpecialVoterReasons
            icon={EarlyVoter.icon}
            title="Electores con derecho al Voto Adelantado"
            reasons={EarlyVoter.reasons}
            documents={EarlyVoter.documents}
            exceptions={EarlyVoter.exceptions}
            onClickClose={() => send("CLOSED")}
          />
        </Case>
        <Default>
          <div className="flex flex-row flex-wrap" ref={ref} tabIndex={-1}>
            <SpecialVoterCard
              icon={EarlyVoter.icon}
              title="Voto por adelantado"
              summary={EarlyVoter.summary}
              deadline={EarlyVoter.deadline}
              documents={EarlyVoter.documents}
              detailsTitle="Ver electores cualificados"
              onClickRequirements={() => send("EARLY_VOTER_TOGGLED")}
            />
            <SpecialVoterCard
              icon={AbsenteeVoter.icon}
              title="Voto ausente"
              summary={AbsenteeVoter.summary}
              deadline={AbsenteeVoter.deadline}
              documents={AbsenteeVoter.documents}
              detailsTitle="Ver razones certificadas"
              onClickRequirements={() => send("ABSENTEE_VOTER_TOGGLED")}
            />
          </div>
        </Default>
      </Switch>
    </>
  )
}
