import React, { ReactNode } from "react"

type Props = {
  id?: string
  children: ReactNode
  tag?: string
  className?: string
  tabIndex?: number
  ref?: React.RefObject<HTMLElement>
}

export default function Container({
  id,
  children,
  className = "",
  tag = "section",
  tabIndex,
  ref,
}: Props) {
  return React.createElement(
    tag,
    {
      id,
      className: `max-w-6xl mx-auto ${className}`,
      tabIndex,
      ref,
    },
    children
  )
}
