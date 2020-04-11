import React from "react"
import { Machine } from "xstate"
import { useMachine } from "@xstate/react"
import { useSpring, animated } from "react-spring"

import Card from "../../card"
import { EarlyVoter, AbsenteeVoter } from "../constants"
import Typography from "../../typography"
import TabContent from "./TabContent"

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
  initial: "absenteeVoter",
  states: tabsState,
})

export default function Tabs() {
  const [state, send] = useMachine(SpecialVotersTabsMachine)
  const voter = state.value === "earlyVoter" ? EarlyVoter : AbsenteeVoter
  const props = useSpring({ opacity: 1, from: { opacity: 0 } })

  return (
    <Card>
      <div className="flex">
        <button
          className={`w-1/2 pb-4 border border-b-8 border-t-0 border-r-0 border-l-0 transition ease-in-out duration-300 ${
            state.value === "earlyVoter"
              ? "border-primary opacity-100"
              : "border-white opacity-25"
          }`}
          onClick={() => send("EARLY_VOTER_TOGGLED")}
        >
          <img src={EarlyVoter.icon} className="mx-auto" alt="" />
          <Typography
            tag="h4"
            variant="h4"
            className="text-center uppercase mt-2"
          >
            Votar por Adelantado
          </Typography>
        </button>
        <button
          className={`w-1/2 pb-4 border border-b-8 border-t-0 border-r-0 border-l-0 transition ease-in-out duration-300 ${
            state.value === "absenteeVoter"
              ? "border-primary opacity-100"
              : "border-white opacity-25"
          }`}
          onClick={() => send("ABSENTEE_VOTER_TOGGLED")}
        >
          <img src={AbsenteeVoter.icon} className="mx-auto" alt="" />
          <Typography
            tag="h4"
            variant="h4"
            className="text-center uppercase mt-2"
          >
            Votar Ausente
          </Typography>
        </button>
      </div>
      <animated.div style={props}>
        <TabContent
          summary={voter.summary}
          documents={voter.documents}
          reasons={voter.reasons}
        />
      </animated.div>
    </Card>
  )
}
