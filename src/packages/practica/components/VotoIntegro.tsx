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
      <h2>Voto Integro</h2>
      <p>Selecciona un partido:</p>
      {service.getParties().map(p => (
        <>
          {p.isIndependent ? (
            <div>I</div>
          ) : (
            <img src={`${PUBLIC_S3_BUCKET}${p.imgUrl}`} alt="partido" />
          )}
          <p>{p.text}</p>
        </>
      ))}
    </section>
  )
}
