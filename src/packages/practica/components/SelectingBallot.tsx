import _ from "lodash"
import React from "react"
import { BaseScreenProps } from "../types/machine-props"
import { PracticaMobileEventTypes } from "../types/practica-mobile"
import { Button } from "../../../components"

export const SelectingBallot: React.FunctionComponent<BaseScreenProps> = ({
  current,
  send,
}) => {
  const papeletas = _.get(current.context, "voterDetails.papeletas", {})
  return (
    <section className="flex flex-col justify-center text-center">
      <h2 className="text-xl">Seleccione una papeleta para praticar</h2>

      <div className="h-16"></div>

      {Object.keys(papeletas).map(k => (
        <div key={k} className="mb-8 flex flex-col">
          <Button
            className="h-12 text-lg"
            onClick={() => {
              send(PracticaMobileEventTypes.BALLOT_SELECTED, {
                ballotType: k,
              })
            }}
          >
            {_.upperCase(k)}
          </Button>
        </div>
      ))}
    </section>
  )
}
