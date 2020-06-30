import React, { useEffect, createRef, useRef } from "react"
import { Machine, assign } from "xstate"
import { useMachine } from "@xstate/react"
import i18next from "i18next"

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
      <Switch className="mt-12 mb-32" state={state}>
        <Case value="absenteeVoter">
          <SpecialVoterReasons
            icon={AbsenteeVoter.icon}
            title={i18next.t("site.absentee-voter-title")}
            reasons={AbsenteeVoter.reasons}
            documents={AbsenteeVoter.documents}
            exceptions={AbsenteeVoter.exceptions}
            onClickClose={() => send("CLOSED")}
          />
        </Case>
        <Case value="earlyVoter">
          <SpecialVoterReasons
            icon={EarlyVoter.icon}
            title={i18next.t("site.early-voter-title")}
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
              title={i18next.t("site.early-voter")}
              summary={i18next.t("site.early-voter-summary")}
              deadline={i18next.t(EarlyVoter.deadline)}
              documents={EarlyVoter.documents}
              detailsTitle={i18next.t("site.qualified-voters")}
              onClickRequirements={() => send("EARLY_VOTER_TOGGLED")}
            />
            <SpecialVoterCard
              icon={AbsenteeVoter.icon}
              title={i18next.t("site.absentee-voter")}
              summary={i18next.t(AbsenteeVoter.summary)}
              deadline={i18next.t(AbsenteeVoter.deadline)}
              documents={AbsenteeVoter.documents}
              detailsTitle={i18next.t("site.certified-reasons")}
              onClickRequirements={() => send("ABSENTEE_VOTER_TOGGLED")}
            />
          </div>
        </Default>
      </Switch>
    </>
  )
}
