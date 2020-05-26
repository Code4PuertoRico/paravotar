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
    <section className="flex flex-col justify-between h-24">
      {Object.keys(papeletas).map(k => (
        <Button
          key={k}
          onClick={() => {
            send(PracticaMobileEventTypes.BALLOT_SELECTED, {
              ballotType: k,
            })
          }}
        >
          {_.upperCase(k)}
        </Button>
      ))}
    </section>
  )
}
