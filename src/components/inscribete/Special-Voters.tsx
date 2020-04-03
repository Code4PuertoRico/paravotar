import React from "react"

import Typography from "../typography"
// AbsenteeVoter
import { EarlyVoter } from "./constants"
import Button from "../button"

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
      <div className="flex flex-row">
        <div className="flex flex-col flex-shrink-0 w-full rounded shadow-md p-6 bg-white mx-0 my-2 relative text-center lg:flex-1 md:m-2">
          <img className="w-12 h-auto m-auto" src={EarlyVoter.icon} alt="" />
          <Typography tag="h4" variant="h4" className="mt-4 uppercase">
            Voto por adelantado
          </Typography>
          <Typography tag="p" variant="p" className="mt-3">
            {EarlyVoter.summary}
          </Typography>
          <Typography tag="p" variant="p" className="mt-3">
            Fecha límite <time>{EarlyVoter.deadline}</time>
          </Typography>
          <Button
            variant="inverse"
            className="mt-6"
            onClick={() => {
              // TODO: Complete
            }}
          >
            Aqui los requisitos
          </Button>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => {
              // TODO: Complete
            }}
          >
            Descarga la solicitud
          </Button>
        </div>
        <div className="flex flex-col flex-shrink-0 w-full rounded shadow-md p-6 bg-white mx-0 my-2 relative lg:flex-1 md:m-2">
          Test
        </div>
      </div>
    </>
  )
}
