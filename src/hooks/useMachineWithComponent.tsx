import React from "react"
import { EventObject, StateMachine, State, Interpreter } from "xstate"
import { useMachine } from "@xstate/react"
import get from "lodash/get"

const Error = (message: string) => () => (
  <div
    style={{
      padding: "50px",
      paddingTop: 0,
      backgroundColor: "indianred",
      color: "black",
      fontSize: "42px",
      overflow: "auto",
      overflowY: "hidden",
      whiteSpace: "pre-line",
    }}
  >
    {message}
  </div>
)

export function useMachineWithComponent<TContext, TEvent extends EventObject>(
  machine: StateMachine<TContext, any, TEvent>
): [State<TContext, TEvent>, Interpreter<TContext, any, TEvent>["send"], any] {
  const [current, send] = useMachine(machine)
  const last = get(current.toStrings(), `[${current.toStrings().length - 1}]`)

  const meta = get(current.meta, `${machine.id}.${last}`)

  const defaultComponent =
    process.env.NODE_ENV !== "production"
      ? Error(`
            Missing meta component property.
            Machine: ${machine.id}
            State: ${current.value}
        `)
      : () => null

  const Component = meta && meta.Component ? meta.Component : defaultComponent

  return [current, send, Component]
}
