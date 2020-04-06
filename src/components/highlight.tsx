import React, { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function Highlight({ children }: Props) {
  return (
    <div className="bg-secondary sm:h-128 pb-4 md:h-104 lg:h-104 min-h-full">
      {children}
    </div>
  )
}
