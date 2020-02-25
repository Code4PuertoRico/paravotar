import React from "react"

import { Town } from "../types"
import { Link } from "../../../components/index"

interface CenterInfoProps {
  town: Town
}

export function CenterInfo({ town }: CenterInfoProps) {
  return (
    <div className="flex flex-col p-4 border-t border-separator justify-center w-full lg:ml-40 lg:m-0 lg:border-t-0">
      <div className="text-xl">
        <span className="font-bold mr-12">Dirección</span>
        <span>{town.direccion}</span>
      </div>
      <div className="text-xl mt-6">
        <span className="font-bold mr-12">Teléfono</span>
        <span>{town.telefono}</span>
      </div>
      <div className="mt-8">
        <Link to={`tel:${town.telefono}`} variant="inverse">
          Llamar para mas información
        </Link>
      </div>
    </div>
  )
}
