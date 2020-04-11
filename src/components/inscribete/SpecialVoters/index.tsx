import React from "react"
import { Machine } from "xstate"
import { useMachine } from "@xstate/react"

import Typography from "../../typography"
import { EarlyVoter, AbsenteeVoter } from "../constants"
import SpecialVoterCard from "./SpecialVoterCard"
import Switch from "../../switch"
import Case from "../../case"
import Default from "../../default"
import SpecialVoterReasons from "./SpecialVoterReasons"
import Tabs from "./Tabs"

const states = {
  idle: {
    on: {
      ABSENTEE_VOTER_TOGGLED: "absenteeVoter",
      EARLY_VOTER_TOGGLED: "earlyVoter",
    },
  },
  absenteeVoter: {
    on: {
      CLOSED: "idle",
    },
  },
  earlyVoter: {
    on: {
      CLOSED: "idle",
    },
  },
}

const SpecialVoterMachine = Machine({
  id: "special-voters",
  initial: "idle",
  states,
})

export function SpecialVoters() {
  const [state, send] = useMachine(SpecialVoterMachine)

  return (
    <>
      <div className="mx-auto mt-3 text-center">
        <Typography tag="h2" variant="h3" className="uppercase">
          Aprende a como votar por adelantado o votar de manera ausente
        </Typography>
        <Typography
          tag="h3"
          variant="h2"
          weight="base"
          className="font-normal mt-4"
        >
          Identifica si cualificas en alguna de estas categorías.
        </Typography>
      </div>
      <div className="mt-12 mb-32">
        <div className="md:hidden">
          <Tabs />
        </div>
        <div className="hidden md:block">
          <Switch className="mt-12 mb-32" value={state.value}>
            <Case value="absenteeVoter">
              <SpecialVoterReasons
                icon={AbsenteeVoter.icon}
                title="Electores con derecho al Voto Ausente"
                reasons={AbsenteeVoter.reasons}
                documents={AbsenteeVoter.documents}
                onClickClose={() => send("CLOSED")}
              />
            </Case>
            <Case value="earlyVoter">
              <SpecialVoterReasons
                icon={EarlyVoter.icon}
                title="Electores con derecho al Voto Adelantado"
                reasons={EarlyVoter.reasons}
                documents={EarlyVoter.documents}
                onClickClose={() => send("CLOSED")}
              />
            </Case>
            <Default>
              <div className="flex flex-row flex-wrap">
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
        </div>
      </div>
    </>
  )
}
