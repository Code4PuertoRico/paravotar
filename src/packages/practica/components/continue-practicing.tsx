import React from "react"
import { BallotType } from "../../../ballot-validator/types"
import { Button, Typography } from "../../../components"

type BallotSelectorProps = {
  send: any
}

const nextBallots = [
  {
    name: "Papeleta Estatal",
    data: { ballotType: BallotType.state },
  },
  {
    name: "Papeleta Legislativa",
    data: { ballotType: BallotType.legislative },
  },
  {
    name: "Papeleta Municipal",
    data: { ballotType: BallotType.municipality },
  },
]

export default function ContinuePracticing(props: BallotSelectorProps) {
  return (
    <div className="mx-auto lg:w-1/2">
      <Typography tag="h2" variant="h4">
        Escoge la papeleta que quieres practicar:
      </Typography>
      {nextBallots.map(ballot => (
        <Button
          key={ballot.name}
          className="w-full mt-4"
          onClick={() => props.send("BALLOT_SELECTION", ballot.data)}
        >
          {ballot.name}
        </Button>
      ))}
    </div>
  )
}
