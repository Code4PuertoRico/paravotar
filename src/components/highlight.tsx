import React, { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function Highlight({ children }: Props) {
  return <div className="bg-secondary h-78 min-h-full">{children}</div>
}
