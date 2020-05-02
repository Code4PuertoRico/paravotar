import React from "react"
import { useMachine } from "@xstate/react"
import { practicaMobileMachine } from "../machines/practica-mobile"
import { PracticaMobileEventTypes } from "../types/practica-mobile"

export const Flow: React.FunctionComponent = () => {
  const [current, send] = useMachine(practicaMobileMachine)

  return (
    <section>
      <h4>Current: {current.value.toString()}</h4>

      <pre>Context: {JSON.stringify(current.context, null, 2)}</pre>

      <form
        onSubmit={evt => {
          evt.preventDefault()

          send(PracticaMobileEventTypes.SEARCH_VOTER_ID, {
            voterId: evt.target.voterId.value,
          })
        }}
      >
        <label htmlFor="voterId">
          Voter ID: <input type="text" name="voterId" placeholder="Voter ID" />
        </label>
      </form>
    </section>
  )
}
