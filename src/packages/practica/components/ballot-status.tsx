import React, { ReactNode, useState } from "react"

import { ResultStatus } from "../../../ballot-validator/types"
import Arrows from "../../../components/arrows"

type BallotStatusType = {
  children: ReactNode
  status: ResultStatus | null
}

export default function BallotStatus({ children, status }: BallotStatusType) {
  const [showFullscreen, setShowFullscreen] = useState(false)

  if (showFullscreen) {
    return (
      <div className="fixed bottom-0 left-0 bg-primary w-full h-screen pt-16 lg:pt-10">
        <div className="flex flex-col">
          <div className="w-11/12  mx-auto py-4 overflow-y-auto ballot-summary">
            {children}
            <button
              className="flex items-center text-white mt-12 px-4 py-2 border border-white rounded mx-auto"
              onClick={() => setShowFullscreen(false)}
            >
              Ocultar
              <Arrows
                className="ml-4 text-white"
                style={{ transform: "rotate(0deg)" }}
              />
            </button>
          </div>
        </div>
        {/* <div>
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
            ) : null}
          </div>
        </div> */}
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
