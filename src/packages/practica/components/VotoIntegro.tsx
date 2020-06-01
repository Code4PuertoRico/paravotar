import React from "react"
import { BaseScreenProps } from "../types/machine-props"
import { PUBLIC_S3_BUCKET } from "../services/constants"
import { Button } from "../../../components"

export const VotoIntegro: React.FunctionComponent<BaseScreenProps> = ({
  current,
  send,
}) => {
  const service =
    current.context.ballots[current.context.selectedBallotType as string]

  return (
    <section>
      <p>{current.context.selectedBallotType as string} / Voto Integro</p>
      <h2 className="text-xl">Selecciona un partido</h2>

      <div className="h-12"></div>

      <div className="flex flex-wrap flex-auto justify-between">
        {service
          .getParties()
          .filter(p => !p.isIndependent)
          .map((p, idx) => (
            <button
              key={p.text}
              onClick={() => send("partySelection", { column: idx })}
            >
              <img
                className="w-24 h-24 mb-4 cursor-pointer"
                src={`${PUBLIC_S3_BUCKET}${p.imgUrl}`}
                alt="partido"
              />
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
