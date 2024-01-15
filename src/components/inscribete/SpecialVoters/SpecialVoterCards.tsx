import { useEffect, useRef } from "react"
import { assign, createMachine } from "xstate"
import { useMachine } from "@xstate/react"

import { AbsenteeVoter, EarlyVoter } from "../constants"
import Switch from "../../switch"
import Case from "../../case"
import Default from "../../default"
import SpecialVoterCard from "./SpecialVoterCard"
import SpecialVoterReasons from "./SpecialVoterReasons"
import { useTranslation } from "react-i18next"

interface SpecialVotersContext {
  previous: string
}

type SpecialVotersEvent =
  | { type: "ABSENTEE_VOTER_TOGGLED" }
  | { type: "EARLY_VOTER_TOGGLED" }
  | { type: "CLOSED" }

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
  handlePrevUpdate: assign<SpecialVotersContext, SpecialVotersEvent>({
    previous: (context) => {
      if (context.previous === "idle") {
        return "reasons"
      }

      return "idle"
    },
  }),
}

const SpecialVoterMachine = createMachine<
  SpecialVotersContext,
  SpecialVotersEvent
>(config, {
  actions,
})

export default function SpecialVoterCards() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null!)
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
            title={t("site.absentee-voter-title")}
            reasons={AbsenteeVoter.reasons}
            documents={AbsenteeVoter.documents}
            exceptions={AbsenteeVoter.exceptions}
            onClickClose={() => send("CLOSED")}
          />
        </Case>
        <Case value="earlyVoter">
          <SpecialVoterReasons
            icon={EarlyVoter.icon}
            title={t("site.early-voter-title")}
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
              title={t("site.early-voter")}
              summary={t("site.early-voter-summary")}
              deadline={t(EarlyVoter.deadline)}
              documents={EarlyVoter.documents}
              detailsTitle={t("site.qualified-voters")}
              onClickRequirements={() => send("EARLY_VOTER_TOGGLED")}
            />
            <SpecialVoterCard
              icon={AbsenteeVoter.icon}
              title={t("site.absentee-voter")}
              summary={t(AbsenteeVoter.summary)}
              deadline={t(AbsenteeVoter.deadline)}
              documents={AbsenteeVoter.documents}
              detailsTitle={t("site.certified-reasons")}
              onClickRequirements={() => send("ABSENTEE_VOTER_TOGGLED")}
            />
          </div>
        </Default>
      </Switch>
    </>
  )
}
