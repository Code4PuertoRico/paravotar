import React from "react"
import { animated, useSpring } from "react-spring"

import { Town } from "../types"
import { Link } from "../../../components/index"
import Location from "../../../assets/icons/location.inline.svg"
import Phone from "../../../assets/icons/phone.inline.svg"

interface CenterInfoProps {
  town: Town
}

const TownInfo: React.FunctionComponent<{ town: Required<Town> }> = ({
  town,
}) => (
  <>
    <div>
      <div className="flex text-base md:text-xl">
        <p className="font-bold pr-12 align-top w-1/4">Dirección</p>
        <p className="w-3/4">{town.direccion}</p>
      </div>
      <div className="flex text-base md:text-xl pt-6">
        <p className="font-bold pr-12 align-top w-1/4">Teléfono</p>
        <p className="w-3/4">{town.telefono}</p>
      </div>
      <div className="flex text-base md:text-xl pt-6">
        <p className="font-bold pr-12 align-top w-1/4">Servicios</p>
        <p className="w-3/4">
          {town.servicios.map(s => (
            <p key={s}>{s}</p>
          ))}
        </p>
      </div>
    </div>
    {town.JIPIsla ? (
      <p className="mt-4">
        * En este centro puede realizar cualquier trámite electoral sin importar
        el precinto en el cual reside.
      </p>
    ) : null}
    <div className="mt-8">
      <Link
        className="w-full text-center lg:w-1/2"
        to={town.googleMapsLink}
        target="_blank"
        variant="primary"
      >
        <Location className="mr-1 h-5 w-5" /> Direcciones
        <span className="sr-only">
          para esta Junta de Inscripción Permanente
        </span>
      </Link>
    </div>
    <div className="mt-4">
      <Link
        className="w-full text-center lg:w-1/2"
        to={`tel:${town.telefono}`}
        variant="inverse"
      >
        <Phone className="mr-1 h-5 w-5" /> Llamar para mas información
        <span className="sr-only">
          sobre esta Junta de Inscripción Permanente
        </span>
      </Link>
    </div>
  </>
)

export const CenterInfo: React.FunctionComponent<CenterInfoProps> = ({
  town,
}) => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } })

  if (!town.locations) {
    return (
      <animated.div
        className="flex flex-col p-4 border-t border-separator justify-center w-full lg:ml-40 lg:m-0 lg:border-t-0"
        style={props}
      >
        <TownInfo town={town as Required<Town>} />
      </animated.div>
    )
  } else {
    return (
      <animated.div
        className="flex flex-col p-4 border-t border-separator justify-center w-full lg:ml-40 lg:m-0 lg:border-t-0"
        style={props}
      >
        {town.locations
          .sort((a, b) => {
            if (a.JIPIsla) {
              return -1
            } else if (b.JIPIsla) {
              return 1
            }

            return 0
          })
          .map((t, i) => (
            <div
              key={`town-${i}`}
              className="pt-10 pb-10 border-b border-separator last:border-b-0"
            >
              <TownInfo town={t as Required<Town>} />
            </div>
          ))}
      </animated.div>
    )
  }
}
