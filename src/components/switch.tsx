import { ReactComponentElement } from "react"

import { State } from "xstate"

import Case from "./case"
import Default from "./default"

type Props = {
  children: Array<ReactComponentElement<any, { value?: string }>>
  className?: string
  state: State<any>
}

export default function Switch({ children, state }: Props) {
  const match = children.find(child => {
    return (
      state.matches(child.props.value) &&
      child.type.componentName === Case.componentName
    )
  })

  if (!match) {
    const defaultCase = children.find(child => {
      return child.type.componentName === Default.componentName
    })

    return defaultCase || null
  }

  return match
}
