import React, { useRef, useState } from "react"
import { useMachine } from "@xstate/react"

import {
  GovernmentalBallot,
  LegislativeBallot,
  MunicipalBallot,
} from "../../generate-ballot/components"
import Switch from "../../../components/switch"
import Case from "../../../components/case"
import Default from "../../../components/default"
import { Button, Card, Typography } from "../../../components/index"
import { practiceMachine } from "../machines/practice"
import { VotesCoordinates } from "../../generate-ballot/types/ballot-machine"
import BallotValidator from "../../../ballot-validator/index"
import {
  BallotType,
  Selection,
  StateBallot as IStateBallot,
  MunicipalBallot as IMunicipalBallot,
  LegislativeBallot as ILegislativeBallot,
} from "../../../ballot-validator/types"

function useVoteCoordinates(): [
  VotesCoordinates[],
  ({ row, column }: VotesCoordinates) => void
] {
  const [coordinates, setCoordinates] = useState<VotesCoordinates[]>([])
  const setVoteCoordinates = ({ row, column }: VotesCoordinates) => {
    setCoordinates(prevCoordinates => {
      const hasVote = prevCoordinates.some(
        vote => vote.row === row && vote.column === column
      )

      if (hasVote) {
        return prevCoordinates.filter(vote => {
          return !(row === vote.row && column === vote.column)
        })
      }

      return [...prevCoordinates, { row, column }]
    })
  }

  return [coordinates, setVoteCoordinates]
}

type TransformArgs = {
  votes: VotesCoordinates[]
  ballotType: BallotType
}

type MarkAsSelectedArgs = {
  votes: Selection[]
  position: number
}

function markAsSelected({ votes, position }: MarkAsSelectedArgs) {
  return [
    ...votes.slice(0, position),
    Selection.selected,
    ...votes.slice(position + 1),
  ]
}

function transformVotesForValidation({
  votes,
  ballotType,
}: TransformArgs): IStateBallot | IMunicipalBallot | ILegislativeBallot {
  switch (ballotType) {
    case BallotType.state: {
      const parties = new Array(7).fill(Selection.notSelected)
      const governor = new Array(7).fill(Selection.notSelected)
      const residentCommissioner = Array(7).fill(Selection.notSelected)
      const initialValue: IStateBallot = {
        parties,
        governor,
        residentCommissioner,
      }

      return votes.reduce((prev, curr): IStateBallot => {
        if (curr.row === 0) {
          return {
            ...prev,
            parties: markAsSelected({
              votes: prev.parties,
              position: curr.column,
            }),
          }
        } else if (curr.row === 2) {
          return {
            ...prev,
            governor: markAsSelected({
              votes: prev.governor,
              position: curr.column,
            }),
          }
        } else if (curr.row === 4) {
          return {
            ...prev,
            residentCommissioner: markAsSelected({
              votes: prev.residentCommissioner,
              position: curr.column,
            }),
          }
        }

        return prev
      }, initialValue)
    }

    case BallotType.municipality: {
      // TODO: The columns in a municipal ballot can change depending on the town.
      const parties = new Array(7).fill(Selection.notSelected)
      const mayor = new Array(7).fill(Selection.notSelected)
      // TODO: We need to specify the amount of municipal legislators that a town can select.
      const municipalLegislator = new Array(5).fill(null)

      municipalLegislator.forEach((_, index) => {
        municipalLegislator[index] = new Array(7).fill(Selection.notSelected)
      })

      const initialValue: IMunicipalBallot = {
        parties,
        mayor,
        municipalLegislator,
      }

      return votes.reduce((prev, curr): IMunicipalBallot => {
        if (curr.row === 0) {
          return {
            ...prev,
            parties: markAsSelected({
              votes: prev.parties,
              position: curr.column,
            }),
          }
        } else if (curr.row === 2) {
          return {
            ...prev,
            mayor: markAsSelected({
              votes: prev.mayor,
              position: curr.column,
            }),
          }
        }

        // Municipal legislators come after row 3.
        // If my coordinate is on row 4 I have to subtract 4 - (3 + 1) to target the first row of the municipal legislator array.
        return {
          ...prev,
          municipalLegislator: prev.municipalLegislator.map(row => {
            if (curr.row - 4) {
              return markAsSelected({
                votes: row,
                position: curr.column,
              })
            }

            return row
          }),
        }
      }, initialValue)
    }

    // TODO: Update
    case BallotType.legislative: {
      // TODO: The columns in a municipal ballot can change depending on the town.
      const parties = new Array(7).fill(Selection.notSelected)
      const mayor = new Array(7).fill(Selection.notSelected)
      // TODO: We need to specify the amount of municipal legislators that a town can select.
      const municipalLegislator = new Array(5).fill(null)

      municipalLegislator.forEach((_, index) => {
        municipalLegislator[index] = new Array(7).fill(Selection.notSelected)
      })

      const initialValue: IMunicipalBallot = {
        parties,
        mayor,
        municipalLegislator,
      }

      return votes.reduce((prev, curr): IMunicipalBallot => {
        if (curr.row === 0) {
          return {
            ...prev,
            parties: markAsSelected({
              votes: prev.parties,
              position: curr.column,
            }),
          }
        } else if (curr.row === 2) {
          return {
            ...prev,
            mayor: markAsSelected({
              votes: prev.mayor,
              position: curr.column,
            }),
          }
        }

        // Municipal legislators come after row 3.
        // If my coordinate is on row 4 I have to subtract 4 - (3 + 1) to target the first row of the municipal legislator array.
        return {
          ...prev,
          municipalLegislator: prev.municipalLegislator.map(row => {
            if (curr.row - 4) {
              return markAsSelected({
                votes: row,
                position: curr.column,
              })
            }

            return row
          }),
        }
      }, initialValue)
    }

    default:
      throw Error("Ballot type is not recognized.")
  }
}

export default function Practice() {
  const [state, send] = useMachine(practiceMachine)
  const inputRef = useRef<HTMLInputElement>(null)
  const [stateVotes, setStateVotes] = useVoteCoordinates()
  const [legislativeVotes, setLegislativeVotes] = useVoteCoordinates()
  const [municipalVotes, setMunicipalVotes] = useVoteCoordinates()
  const handleSubmit = ({
    votes,
    ballotType,
  }: {
    votes: VotesCoordinates[]
    ballotType: BallotType
  }) => {
    console.log({ votes })

    const transformedVotes = transformVotesForValidation({ votes, ballotType })

    console.log({ transformedVotes })

    const test = BallotValidator(transformedVotes, ballotType)

    console.log({ test })
  }

  return (
    <Card>
      <Switch state={state}>
        <Case value="enterVoterId">
          <div className="mx-auto lg:w-1/3">
            <Typography tag="p" variant="h4">
              Entre su número electoral
            </Typography>
            <form
              className="mt-4"
              onSubmit={() =>
                send("FIND_VOTER_ID", {
                  voterId: inputRef.current ? inputRef.current.value : "",
                })
              }
            >
              <input
                className="border border-primary px-3 py-2 rounded w-full"
                type="text"
                ref={inputRef}
                placeholder="Número electoral"
              />
              <Button className="mt-2 block w-full">Continuar</Button>
            </form>
            <p className="text-xs italic mt-2">
              * La utilización de su número electoral es solo para propósitos de
              práctica, paravotar.org no guarda ninguna información personal de
              usuarios que utilicen la página web.
            </p>
          </div>
        </Case>
        <Case value="findingVoterId">
          <div>Loading...</div>
        </Case>
        <Case value="selectBallot">
          <div className="mx-auto lg:w-1/3">
            <Typography tag="p" variant="h4">
              Escoge por cuál papeleta comenzar
            </Typography>
            <Button
              className="w-full block mt-4 mb-2"
              onClick={() => send("SELECTED_GOVERNMENTAL")}
            >
              Estatal
            </Button>
            <Button
              className="w-full block my-2"
              onClick={() => send("SELECTED_LEGISLATIVE")}
            >
              Legislativa
            </Button>
            <Button
              className="w-full block my-2"
              onClick={() => send("SELECTED_MUNICIPAL")}
            >
              Municipal
            </Button>
          </div>
        </Case>
        <Case value="governmental">
          <div>
            <div className="overflow-scroll">
              <GovernmentalBallot
                path="/papeletas/2016/gobernador-y-comisionado-residente"
                structure={state.context.ballots.estatal}
                votes={stateVotes}
                toggleVote={setStateVotes}
              />
            </div>
            <Button
              onClick={() => {
                handleSubmit({
                  votes: stateVotes,
                  ballotType: BallotType.state,
                })
              }}
            >
              Submit
            </Button>
          </div>
        </Case>
        <Case value="legislative">
          <div>
            <div className="overflow-scroll">
              <LegislativeBallot
                path="/papeletas/2016/091-patillas"
                structure={state.context.ballots.legislativa}
                votes={legislativeVotes}
                toggleVote={setLegislativeVotes}
              />
            </div>
            <Button
              onClick={() => {
                handleSubmit({
                  votes: legislativeVotes,
                  ballotType: BallotType.legislative,
                })
              }}
            >
              Submit
            </Button>
          </div>
        </Case>
        <Case value="municipal">
          <div>
            <div className="overflow-scroll">
              <MunicipalBallot
                path="/papeletas/2016/patillas"
                structure={state.context.ballots.municipal}
                votes={municipalVotes}
                toggleVote={setMunicipalVotes}
              />
            </div>
            <Button
              onClick={() => {
                handleSubmit({
                  votes: municipalVotes,
                  ballotType: BallotType.municipality,
                })
              }}
            >
              Submit
            </Button>
          </div>
        </Case>
        <Default>Shit</Default>
      </Switch>
    </Card>
  )
}
