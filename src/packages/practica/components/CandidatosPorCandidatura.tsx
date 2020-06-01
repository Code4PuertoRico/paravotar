import React from "react"
import { BaseScreenProps } from "../types/machine-props"
import { Button } from "../../../components"

export const CandidatosPorCandidatura: React.FunctionComponent<BaseScreenProps> = ({
  current,
  send,
}) => {
  const service =
    current.context.ballots[current.context.selectedBallotType as string]

  const candidates =
    service.getCandidatesByPositionAndParty(
      current.context.byCandidatePosition!,
      current.context.byCandidateParty?.text,
      current.context.byCandidateParty.isIndependent
    ) || []

  return (
    <section>
      <p>
        {current.context.selectedBallotType} / Voto Por Candidatura /{" "}
        {current.context.byCandidatePosition} /{" "}
        {current.context.byCandidateParty.isIndependent
          ? "Candidato Independiente"
          : current.context.byCandidateParty.isIndependent.text}
      </p>

      <div className="h-8"></div>

      <h2 className="text-xl">Selecciona Candidato/s</h2>

      <div className="h-12"></div>

      <div className="flex flex-wrap flex-auto justify-between">
        {candidates.length === 0 ? "No Candidates" : ""}
        <ul>
          {candidates.map((c, idx) => (
            <li key={idx} className="block">
              <button onClick={() => send("candidateSelected", { row: idx })}>
                {c.ocrResult}
              </button>
            </li>
          ))}
        </ul>
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
