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
      <div className="sm:text-base md:text-xl">
        <span className="font-bold mr-12">Dirección</span>
        <span>{town.direccion}</span>
      </div>
      <div className="sm:text-base md:text-xl mt-6">
        <span className="font-bold mr-12">Teléfono</span>
        <span>{town.telefono}</span>
      </div>
      <div className="mt-8">
        <Link to={`tel:${town.telefono}`} variant="inverse">
          Llamar para mas información
        </Link>
      </div>
      <div className="mt-4">
        <Link to={town.googleMapsLink} target="_blank" variant="inverse">
          Dirreciones
        </Link>
      </div>
    </animated.div>
  )
}
