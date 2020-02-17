import React from "react"
import { Town } from "../types"

interface CenterInfoProps {
  town: Town
}

export function CenterInfo({ town }: CenterInfoProps) {
  return (
    <div className="flex flex-col justify-center w-full ml-40">
      <div className="text-xl mb-6">
        <span className="font-bold mr-12">Dirección</span>
        <span>{town.direccion}</span>
      </div>
      <div className="text-xl">
        <span className="font-bold mr-12">Teléfono </span>
        <span>{town.telefono}</span>
      </div>
      <div className="mt-8">
        <a
          href={`tel:${town.telefono}`}
          className="rounded border border-primary bg-transparent text-primary font-bold py-2 px-4 hover:bg-primary-hover hover:text-white active:text-white-active active:bg-primary-active text-xs mt-8 uppercase"
        >
          Llamar para mas información
        </a>
      </div>
    </div>
  )
}
