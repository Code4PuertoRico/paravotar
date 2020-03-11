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
    <table>
      <tbody>
        <tr className="text-base md:text-xl">
          <td className="font-bold pr-12 align-top w-1/4">Dirección</td>
          <td className="w-3/4">{town.direccion}</td>
        </tr>
        <tr className="text-base md:text-xl">
          <td className="font-bold pt-6 pr-12 align-top w-1/4">Teléfono</td>
          <td className="w-3/4 pt-6">{town.telefono}</td>
        </tr>
      </tbody>
    </table>
    <div className="mt-8">
      <Link
        className="w-full text-center lg:w-1/2"
        to={town.googleMapsLink}
        target="_blank"
        variant="primary"
      >
        <Location className="mr-1 h-5 w-5" /> Direcciones
      </Link>
    </div>
    <div className="mt-4">
      <Link
        className="w-full text-center lg:w-1/2"
        to={`tel:${town.telefono}`}
        variant="inverse"
      >
        <Phone className="mr-1 h-5 w-5" /> Llamar para mas información
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
        {town.locations.map((t, i) => (
          <TownInfo town={t as Required<Town>} key={`town-${i}`} />
        ))}
      </animated.div>
    )
  }
}
