import React from "react"
import { BaseScreenProps } from "../types/machine-props"
import { Button } from "../../../components"

export const VotoPorCandidatura: React.FunctionComponent<BaseScreenProps> = ({
  current,
  send,
}) => {
  const service =
    current.context.ballots[current.context.selectedBallotType as string]

  return (
    <section>
      <p>
        {current.context.selectedBallotType as string} / Voto Por Candidatura
      </p>
      <h2 className="text-xl">Selecciona un puesto/s</h2>

      <div className="h-12"></div>

      <div className="flex flex-wrap flex-auto justify-between">
        {service.getSections().map((s, idx) => (
          <Button
            className="h-14 text-lg mb-4"
            key={idx}
            onClick={() => {
              send("positionSelected", { position: s.title })
            }}
          >
            {s.title}
          </Button>
        ))}
      </div>
      <Button
        onClick={() => {
          send("back")
        }}
      >
        Back
      </Button>
    </section>
  )
}
