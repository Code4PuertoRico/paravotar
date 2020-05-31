import React, { useState } from "react"
import { Button } from "../../../components"
import {
  PracticaMobileEventTypes,
  PracticaMobileStates,
} from "../types/practica-mobile"
import { BaseScreenProps } from "../types/machine-props"

const LoadingOverlay = () => {
  return (
    <section className="absolute w-full h-full">
      <div className="w-full h-full bg-background opacity-50 absolute z-10"></div>
      <div className="flex w-full h-full justify-center items-center z-0">
        <p className="text-2xl text-black">Loading...</p>
      </div>
    </section>
  )
}

export const EnterVoterId: React.FunctionComponent<BaseScreenProps> = ({
  send,
  current,
}) => {
  const [voterId, setVoterId] = useState("")

  return (
    <section className="flex flex-col justify-center text-center relative">
      <h2 className="text-2xl">Entre su numero electoral</h2>

      <div className="h-16"></div>

      <input
        type="text"
        className="h-10 border-2 border-dark p-4 rounded-md"
        placeholder="Numero electoral"
        value={voterId}
        onChange={e => setVoterId(e.target.value)}
      />

      <div className="h-16"></div>

      <Button
        className="h-12 text-lg"
        onClick={() => {
          send(PracticaMobileEventTypes.SEARCH_VOTER_ID, {
            voterId,
          })
        }}
        disabled={current.matches(PracticaMobileStates.LOADING_VOTER_DETAILS)}
      >
        Continuar
      </Button>

      {current.matches(PracticaMobileStates.LOADING_VOTER_DETAILS) ? (
        <LoadingOverlay />
      ) : null}
    </section>
  )
}
