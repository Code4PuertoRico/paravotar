import React, { ReactNode } from "react"

type Props = {
  children: ReactNode
  tag?: string
  className?: string
}

export default function Container({
  children,
  className = "",
  tag = "section",
}: Props) {
  return React.createElement(
    tag,
    {
      className: `max-w-6xl mx-auto ${className}`,
    },
    children
  )
}
