import React, { ReactNode } from "react"

type Props = {
  className: string
  children: ReactNode
}

export default function Card({ children, className }: Props) {
  return (
    <div
      className={`flex flex-col flex-shrink-0 justify-start w-full rounded shadow-md p-6 bg-white mx-0 my-2 relative lg:flex-1 md:m-2 ${className}`}
    >
      {children}
    </div>
  )
}

Card.defaultProps = {
  className: "",
}
