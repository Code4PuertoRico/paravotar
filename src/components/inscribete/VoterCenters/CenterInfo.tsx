import React from "react"
import { animated, useSpring } from "react-spring"

import { Town } from "../types"
import { Link } from "../../../components/index"

interface CenterInfoProps {
  town: Town
}

export function CenterInfo({ town }: CenterInfoProps) {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } })

  return (
    <animated.div
      className="flex flex-col p-4 border-t border-separator justify-center w-full lg:ml-40 lg:m-0 lg:border-t-0"
      style={props}
    >
      <table>
        <tbody>
          <tr className="text-base md:text-xl">
            <td className="font-bold pr-12 align-top">Dirección</td>
            <td>{town.direccion}</td>
          </tr>
          <tr className="text-base md:text-xl">
            <td className="font-bold pt-6 pr-12 align-top">Teléfono</td>
            <td className="pt-6">{town.telefono}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-8">
        <Link
          className="w-full text-center lg:w-1/2"
          to={`tel:${town.telefono}`}
          variant="inverse"
        >
          Llamar para mas información
        </Link>
      </div>
      <div className="mt-4">
        <Link
          className="w-full text-center lg:w-1/2"
          to={town.googleMapsLink}
          target="_blank"
          variant="primary"
        >
          Direcciones
        </Link>
      </div>
    </animated.div>
  )
}
