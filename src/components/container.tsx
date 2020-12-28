import React, { ReactNode } from "react"

type Props = {
  children: ReactNode
  tag?: string
  className?: string
  tabIndex?: number
  ref?: React.RefObject<HTMLElement>
  id?: string
}

export default function Container({
  children,
  className = "",
  tag = "section",
  tabIndex,
  ref,
  id,
}: Props) {
  return React.createElement(
    tag,
    {
      id,
      className: `max-w-screen-xl mx-auto ${className}`,
      tabIndex,
      ref,
      "data-testid": id,
    },
    children
  )
}
