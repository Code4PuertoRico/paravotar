import { EventObject, StateMachine, State, Interpreter } from "xstate"
import { useMachine } from "@xstate/react"
import get from "lodash/get"

const Error = (message: string) => () => (
  <div className="p-3 pt-0 bg-red text-black text-3xl overflow-auto overflow-y-hidden whitespace-pre-line">
    {message}
  </div>
)

export function useMachineWithComponent<TContext, TEvent extends EventObject>(
  machine: StateMachine<TContext, any, TEvent>
): [State<TContext, TEvent>, Interpreter<TContext, any, TEvent>["send"], any] {
  const [current, send] = useMachine(machine)
  const last = get(current.toStrings(), `[${current.toStrings().length - 1}]`)

  const meta = get(current.meta, `${machine.id}.${last}`, {})

  const defaultComponent = !import.meta.env.PROD
    ? Error(`
            Missing meta component property.
            Machine: ${machine.id}
            State: ${current.value}
        `)
    : () => null

  const Component = meta.Component || defaultComponent

  return [current, send, Component]
}
