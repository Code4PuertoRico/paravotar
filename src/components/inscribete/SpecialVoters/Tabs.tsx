import { createMachine } from "xstate"
import { useMachine } from "@xstate/react"

import Typography from "../../typography"
import Card from "../../card"
import Tab from "../../tab"
import { EarlyVoter, AbsenteeVoter } from "../constants"
import TabContent from "./TabContent"
import { useTranslation } from "react-i18next"

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

const SpecialVotersTabsMachine = createMachine({
  id: "special-voters-mobile",
  initial: "earlyVoter",
  states: tabsState,
})

export default function Tabs() {
  const { t } = useTranslation()
  const [state, send] = useMachine(SpecialVotersTabsMachine)
  const voter = state.value === "earlyVoter" ? EarlyVoter : AbsenteeVoter
  const title =
    state.value === "earlyVoter"
      ? "site.early-voter-title"
      : "site.absentee-voter-title"

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
            {t("site.early-voter")}
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
            {t("site.absentee-voter")}
          </Typography>
        </Tab>
      </div>
      <TabContent
        key={state.value}
        title={t(title)}
        summary={t(voter.summary)}
        deadline={t(voter.deadline)}
        documents={voter.documents}
        reasons={voter.reasons}
        exceptions={t(voter.exceptions)}
      />
    </Card>
  )
}
