import _ from "lodash"
import React from "react"
import { practicaMobileMachine } from "../machines/practica-mobile"
import {
  PracticaMobileEventTypes,
  PracticaMobileStates,
} from "../types/practica-mobile"
import { Button } from "../../../components"
import { useMachineWithComponent } from "../../../hooks/useMachineWithComponent"

export const Flow: React.FunctionComponent = () => {
  const [current, send, Component] = useMachineWithComponent(
    practicaMobileMachine
  )

  return (
    <section>
      <h4>Current: {current.value.toString()}</h4>

      <pre>Context: {JSON.stringify(current.context, null, 2)}</pre>

      <Component current={current} send={send} />

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
