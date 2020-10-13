import React, { ReactNode } from "react"

import { ResultStatus } from "../../../ballot-validator/types"
import { Typography } from "../../../components"

export default function BallotStatus({
  children,
  status,
}: {
  children: ReactNode
  status: ResultStatus | null
}) {
  const result =
    status === ResultStatus.success
      ? "valida"
      : status === ResultStatus.failure
      ? "invalida"
      : "sin completar"

  return (
    <div className="absolute bottom-0 bg-primary w-full">
      <Typography tag="h3" variant="h3" className="mb-4">
        Para esta papeleta usted puede votar por...
      </Typography>
      {children}
      <Typography tag="p" variant="p">
        Estado de su papeleta: {result}
      </Typography>
      <hr className="mt-2" />
      <Typography tag="p" variant="p" className="text-xs italic mt-2 mb-6">
        *Para ver otros partidos realiza un scroll hacia tu derecha y para ver
        más candidatos realiza scroll hacia abajo.
      </Typography>
    </div>
  )
}
