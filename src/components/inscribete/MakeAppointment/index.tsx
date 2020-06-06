import React from "react"

import { ActiveCenters } from "./constants"
import Typography from "../../typography"
import { Link } from "../../../components/index"
import Location from "../../../assets/icons/location.inline.svg"

export default function MakeAppointment() {
  return (
    <>
      <div className="mx-auto text-center">
        <Typography
          id="saca-tu-cita"
          tag="h2"
          variant="h3"
          className="uppercase tracking-wide"
        >
          Saca una cita e inscríbete
        </Typography>
        <Typography
          tag="h3"
          variant="h2"
          weight="base"
          className="font-normal mt-4"
        >
          Encuentra la Junta de Inscripción Permanente más cercana a ti e
          inscríbete.
        </Typography>
      </div>
      <div className="mt-12 mb-32">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {ActiveCenters.map(center => (
            <div
              key={center.name}
              className="flex flex-col justify-between bg-white p-4 shadow-md rounded"
            >
              <div>
                <Typography tag="p" variant="h4">
                  {center.name}
                </Typography>
                {center.extra ? (
                  <Typography
                    tag="p"
                    variant="p"
                    className="text-xs text-gray-400"
                  >
                    {center.extra}
                  </Typography>
                ) : null}
                <Typography tag="p" variant="p" className="text-sm mt-1">
                  {center.address}
                </Typography>
              </div>
              <Link
                className="self-end w-full text-center mt-3 self-end"
                to={center.location}
                target="_blank"
                variant="primary"
              >
                <Location className="mr-1 h-5 w-5" /> Direcciones
                <span className="sr-only">
                  para esta Junta de Inscripción Permanente
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
