import { ReactNode } from "react"

import { Typography } from "../../../components"

export default function InputErrorMessage({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Typography
      tag="p"
      variant="p"
      className="italic text-xs text-red text-left mt-1"
    >
      {children}
    </Typography>
  )
}
