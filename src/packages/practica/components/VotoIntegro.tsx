import React from "react"
import { BaseScreenProps } from "../types/machine-props"
import { PUBLIC_S3_BUCKET } from "../services/constants"

export const VotoIntegro: React.FunctionComponent<BaseScreenProps> = ({
  current,
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
          .map(p => (
            <img
              key={p.text}
              className="w-24 h-24 mb-4"
              src={`${PUBLIC_S3_BUCKET}${p.imgUrl}`}
              alt="partido"
            />
          ))}
      </div>
    </section>
  )
}
