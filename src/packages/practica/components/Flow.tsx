import _ from "lodash"
import React from "react"
import { practicaMobileMachine } from "../machines/practica-mobile"
import { useMachineWithComponent } from "../../../hooks/useMachineWithComponent"

export const Flow: React.FunctionComponent = () => {
  const [current, send, Component] = useMachineWithComponent(
    practicaMobileMachine
  )

  return (
    <section>
      <h4>Current: {current.value.toString()}</h4>

      <Component current={current} send={send} />
    </section>
  )
}
