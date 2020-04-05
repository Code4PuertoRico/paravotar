import React from "react"

import Typography from "../../typography"
import { EarlyVoter, AbsenteeVoter } from "../constants"
import SpecialVoterCard from "./SpecialVoterCard"

export function SpecialVoters() {
  return (
    <>
      <div className="text-center">
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
      <div className="flex flex-row flex-wrap">
        <SpecialVoterCard
          icon={EarlyVoter.icon}
          title="Voto por adelantado"
          summary={EarlyVoter.summary}
          deadline={EarlyVoter.deadline}
          documents={EarlyVoter.documents}
          onClickRequirements={() => {
            // TODO
          }}
          onClickDownload={() => {
            // TODO
          }}
        />
        <SpecialVoterCard
          icon={AbsenteeVoter.icon}
          title="Voto ausente"
          summary={AbsenteeVoter.summary}
          deadline={AbsenteeVoter.deadline}
          documents={AbsenteeVoter.documents}
          onClickRequirements={() => {
            // TODO
          }}
          onClickDownload={() => {
            // TODO
          }}
        />
      </div>
    </>
  )
}
