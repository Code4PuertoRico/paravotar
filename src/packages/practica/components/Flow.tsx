import _ from "lodash"
import React from "react"
import { practicaMobileMachine } from "../machines/practica-mobile"
import { useMachineWithComponent } from "../../../hooks/useMachineWithComponent"

export const Flow: React.FunctionComponent = () => {
  const [current, send, Component] = useMachineWithComponent(
    practicaMobileMachine
  )

  return (
    <section className="w-104 border-2 flex flex-col p-4">
      <Component current={current} send={send} />
    </section>
  )
}
