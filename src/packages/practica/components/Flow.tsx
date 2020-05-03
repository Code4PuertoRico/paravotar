import _ from "lodash"
import React from "react"
import { useMachine } from "@xstate/react"
import { practicaMobileMachine } from "../machines/practica-mobile"
import {
  PracticaMobileEventTypes,
  PracticaMobileStates,
} from "../types/practica-mobile"
import { Button } from "../../../components"

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

      {current.matches(PracticaMobileStates.SELECTING_BALLOT) ? (
        <section className="flex flex-col justify-between h-24">
          {Object.keys(current.context.voterDetails?.papeletas).map(k => (
            <Button
              key={k}
              onClick={() => {
                send(PracticaMobileEventTypes.BALLOT_SELECTED, {
                  ballotType: k,
                })
              }}
            >
              {_.upperCase(k)}
            </Button>
          ))}
        </section>
      ) : null}
    </section>
  )
}
