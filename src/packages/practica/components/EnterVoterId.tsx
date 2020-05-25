import React, { useState } from "react"
import { Button } from "../../../components"
import {
  PracticaMobileEventTypes,
  PracticaMobileStates,
} from "../types/practica-mobile"
import { BaseScreenProps } from "../types/machine-props"

export const EnterVoterId: React.FunctionComponent<BaseScreenProps> = ({
  send,
  current,
}) => {
  const [voterId, setVoterId] = useState("")

  return (
    <section>
      <h2>Entre su numero electoral</h2>

      <input
        type="text"
        value={voterId}
        onChange={e => setVoterId(e.target.value)}
      />

      <Button
        onClick={() => {
          send(PracticaMobileEventTypes.SEARCH_VOTER_ID, {
            voterId,
          })
        }}
        disabled={current.matches(PracticaMobileStates.LOADING_VOTER_DETAILS)}
      >
        Continuar
      </Button>
    </section>
  )
}
