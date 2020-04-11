import React from "react"

import Typography from "../../typography"
import Tabs from "./Tabs"
import SpecialVoterCards from "./SpecialVoterCards"

export function SpecialVoters() {
  return (
    <>
      <div className="mx-auto mt-3 text-center">
        <Typography tag="h2" variant="h3" className="uppercase tracking-wide">
          Aprende qué es el voto por adelantado y el voto ausente
        </Typography>
        <Typography
          tag="h3"
          variant="h2"
          weight="base"
          className="font-normal mt-4"
        >
          Identifica si cualificas para el voto ausente o voto adelantado y
          descarga la solicitud.
        </Typography>
      </div>
      <div className="mt-12 mb-32">
        <div className="md:hidden">
          <Tabs />
        </div>
        <div className="hidden md:block">
          <SpecialVoterCards />
        </div>
      </div>
    </>
  )
}
