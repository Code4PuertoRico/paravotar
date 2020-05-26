import _ from "lodash"
import React from "react"
import { BaseScreenProps } from "../types/machine-props"
import { PracticaMobileEventTypes } from "../types/practica-mobile"
import { Button } from "../../../components"

export const SelectingVotingMethod: React.FunctionComponent<BaseScreenProps> = ({
  current,
  send,
}) => {
  return (
    <section className="flex flex-col justify-between h-24">
      <Button
        onClick={() => {
          send(PracticaMobileEventTypes.INTEGRO_SELECTED)
        }}
      >
        VOTO INTEGRO
      </Button>
      <Button
        onClick={() => {
          send(PracticaMobileEventTypes.MIXTO_SELECTED)
        }}
      >
        VOTO MIXTO
      </Button>
      <Button
        onClick={() => {
          send(PracticaMobileEventTypes.CANDIDATURA_SELECTED)
        }}
      >
        VOTO POR CANDIDATURA
      </Button>
    </section>
  )
}
