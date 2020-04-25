import React, { ReactNode } from "react"
import { Machine } from "xstate"
import { useMachine } from "@xstate/react"

import Typography from "../../typography"
import Card from "../../card"
import { EarlyVoter, AbsenteeVoter } from "../constants"
import TabContent from "./TabContent"

type TabProps = {
  isActive: boolean
  onClick: () => void
  children: ReactNode
}

function Tab({ isActive, onClick, children }: TabProps) {
  return (
    <button
      className={`w-1/2 pb-2 border border-b-8 border-t-0 border-r-0 border-l-0 transition ease-in-out duration-300 ${
        isActive ? "border-primary opacity-100" : "border-white opacity-25"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const tabsState = {
  absenteeVoter: {
    on: {
      EARLY_VOTER_TOGGLED: "earlyVoter",
    },
  },
  earlyVoter: {
    on: {
      ABSENTEE_VOTER_TOGGLED: "absenteeVoter",
    },
  },
}

const SpecialVotersTabsMachine = Machine({
  id: "special-voters-mobile",
  initial: "earlyVoter",
  states: tabsState,
})

export default function Tabs() {
  const [state, send] = useMachine(SpecialVotersTabsMachine)
  const voter = state.value === "earlyVoter" ? EarlyVoter : AbsenteeVoter
  const title = `Electores con derecho al Voto ${
    state.value === "earlyVoter" ? "por Adelantado" : "Ausente"
  }`

  return (
    <Card>
      <div className="flex">
        <Tab
          isActive={state.value === "earlyVoter"}
          onClick={() => send("EARLY_VOTER_TOGGLED")}
        >
          <img src={EarlyVoter.icon} className="mx-auto" alt="" />
          <Typography
            tag="h4"
            variant="h4"
            className="text-center uppercase mt-2 tracking-wide"
          >
            Votar por Adelantado
          </Typography>
        </Tab>
        <Tab
          isActive={state.value === "absenteeVoter"}
          onClick={() => send("ABSENTEE_VOTER_TOGGLED")}
        >
          <img src={AbsenteeVoter.icon} className="mx-auto" alt="" />
          <Typography
            tag="h4"
            variant="h4"
            className="text-center uppercase mt-2 tracking-wide"
          >
            Votar Ausente
          </Typography>
        </Tab>
      </div>
      <TabContent
        key={state.value}
        title={title}
        summary={voter.summary}
        deadline={voter.deadline}
        documents={voter.documents}
        reasons={voter.reasons}
        exceptions={voter.exceptions}
      />
    </Card>
  )
}
