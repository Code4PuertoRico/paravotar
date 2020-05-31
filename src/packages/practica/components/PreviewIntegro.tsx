import React from "react"
import { BaseScreenProps } from "../types/machine-props"
import { Button } from "../../../components"

export const PreviewIntegro: React.FunctionComponent<BaseScreenProps> = ({
  current,
  send,
}) => {
  const service =
    current.context.ballots[current.context.selectedBallotType as string]

  console.log("hi")

  return (
    <section>
      <p>
        {current.context.selectedBallotType as string} / Voto Integro / Preview
      </p>

      <div className="h-12"></div>

      <p className="font-bold">
        Partido seleccionado: {service.getSelectedParty()?.text}
      </p>

      <div className="h-12"></div>

      {service.getPreferredCandidatesByParty().map((p, idx) => (
        <div key={idx} className="mb-8">
          <p className="font-bold">{p.title}</p>
          <ul>
            {p.candidates.map((c, idx) => (
              <li key={idx}>{c.candidate.ocrResult}</li>
            ))}
          </ul>
        </div>
      ))}

      <Button
        className="h-12 text-lg"
        onClick={() => {
          send("back")
        }}
      >
        Back
      </Button>

      <div className="h-8"></div>

      <Button
        className="h-12 text-lg"
        onClick={() => {
          send("complete")
        }}
      >
        Generate PDF
      </Button>
    </section>
  )
}
