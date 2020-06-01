import React from "react"
import { BaseScreenProps } from "../types/machine-props"
import { PUBLIC_S3_BUCKET } from "../services/constants"
import { Button } from "../../../components"

export const PartidosPorCandidatura: React.FunctionComponent<BaseScreenProps> = ({
  current,
  send,
}) => {
  const service =
    current.context.ballots[current.context.selectedBallotType as string]

  const parties = service.getParties().reduce(
    (prev, curr) => {
      if (prev.independentCount > 0) {
        return prev
      }

      prev.acum.push(curr)

      return {
        acum: prev.acum,
        independentCount: curr.isIndependent ? 1 : prev.independentCount,
      }
    },
    { acum: [], independentCount: 0 } as {
      independentCount: number
      acum: {
        text: string
        imgUrl?: string
        isIndependent: boolean
      }[]
    }
  ).acum

  return (
    <section>
      <p>
        {current.context.selectedBallotType as string} / Voto Por Candidatura /{" "}
        {current.context.byCandidatePosition}
      </p>
      <h2 className="text-xl">Selecciona un partido</h2>

      <div className="h-12"></div>

      <div className="flex flex-wrap flex-auto justify-between">
        {parties.map((p, idx) => (
          <button key={idx} onClick={() => send("partySelected", { party: p })}>
            {p.isIndependent ? (
              <div className="w-28 h-24">Candidatos Independientes</div>
            ) : (
              <img
                className="w-24 h-24 mb-4 cursor-pointer"
                src={`${PUBLIC_S3_BUCKET}${p.imgUrl}`}
                alt="partido"
              />
            )}
          </button>
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
