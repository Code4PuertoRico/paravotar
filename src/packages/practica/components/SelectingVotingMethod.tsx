import _ from "lodash"
import React from "react"
import { BaseScreenProps } from "../types/machine-props"
import { PracticaMobileEventTypes } from "../types/practica-mobile"
import { Button } from "../../../components"

export const SelectingVotingMethod: React.FunctionComponent<BaseScreenProps> = ({
  send,
}) => {
  return (
    <section className="flex flex-col justify-center text-center">
      <h2 className="text-xl">Seleccione una forma de votar</h2>

      <div className="h-16"></div>

      <div className="flex flex-col mb-8">
        <Button
          className="h-12 text-lg"
          onClick={() => {
            send(PracticaMobileEventTypes.INTEGRO_SELECTED)
          }}
        >
          VOTO INTEGRO
        </Button>
      </div>
      <div className="flex flex-col mb-8">
        <Button
          className="h-12 text-lg"
          onClick={() => {
            send(PracticaMobileEventTypes.MIXTO_SELECTED)
          }}
        >
          VOTO MIXTO
        </Button>
      </div>
      <div className="flex flex-col mb-8">
        <Button
          className="h-12 text-lg"
          onClick={() => {
            send(PracticaMobileEventTypes.CANDIDATURA_SELECTED)
          }}
        >
          VOTO POR CANDIDATURA
        </Button>
      </div>
      <Button
        onClick={() => {
          send("back")
        }}
      >
        Back
      </Button>
    </section>
  )
}
