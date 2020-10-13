import React, { ReactNode, useState } from "react"

import { ResultStatus } from "../../../ballot-validator/types"
import { Typography } from "../../../components"
import Arrows from "../../../components/arrows"
import Success from "../../../assets/images/success.svg"
import ErrorIcon from "../../../assets/images/error.svg"

type BallotStatusType = {
  children: ReactNode
  status: ResultStatus | null
}

export default function BallotStatus({ children, status }: BallotStatusType) {
  const [showFullscreen, setShowFullscreen] = useState(false)

  if (showFullscreen) {
    return (
      <div className="flex flex-col justify-center items-center fixed bottom-0 left-0 bg-primary w-full h-screen">
        <Typography tag="p" variant="h4" className="mb-2 text-white font-bold">
          Para esta papeleta usted puede votar por:
        </Typography>
        {children}
        <div>
          <Typography tag="p" variant="h4" className="text-white mt-6">
            Estado de su papeleta:
          </Typography>
          <div className="mt-4 mx-auto">
            {ResultStatus.success === status ? (
              <>
                <img className="h-20 w-20 block mx-auto" src={Success} alt="" />
                <Typography
                  tag="p"
                  variant="p"
                  className="text-white mt-3 block capitalize"
                >
                  Valida
                </Typography>
              </>
            ) : ResultStatus.failure === status ? (
              <>
                <img
                  className="h-20 w-20 block mx-auto"
                  src={ErrorIcon}
                  alt=""
                />
                <Typography
                  tag="p"
                  variant="p"
                  className="text-white mt-3  block capitalize"
                >
                  Invalida
                </Typography>
              </>
            ) : (
              <Typography
                tag="p"
                variant="p"
                className="text-white mt-3  block capitalize"
              >
                Sin completar
              </Typography>
            )}
          </div>
        </div>
        <button
          className="flex items-center text-white mt-12 px-4 py-2 border border-white rounded"
          onClick={() => setShowFullscreen(false)}
        >
          Ocultar
          <Arrows
            className="ml-4 text-white"
            style={{ transform: "rotate(0deg)" }}
          />
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 bg-primary p-2 text-left w-full">
      <button
        className="flex items-center justify-between text-white text-left lg:1/4 lg:mx-auto"
        onClick={() => setShowFullscreen(true)}
      >
        Ver más información sobre su papeleta
        <Arrows
          className="ml-4 text-white"
          style={{ transform: "rotate(-180deg)" }}
        />
      </button>
    </div>
  )
}
