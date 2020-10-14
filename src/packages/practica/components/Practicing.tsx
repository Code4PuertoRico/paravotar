import React from "react"
import { BallotType } from "../../../ballot-validator/types"
import { ColumnHighlightProvider } from "../../../context/column-highlight-context"
import { Ballot } from "../../generate-ballot/components"
import useErrorMessages from "../hooks/use-error-messages"
import { Button, Typography } from "../../../components/index"

interface PracticingProps {
  state: any
  send: any
  handleSubmit: any
}

export const Practicing: React.FunctionComponent<PracticingProps> = ({
  state,
  send,
  handleSubmit,
}) => {
  const { setIsPristine } = useErrorMessages(state, [
    state,
    state.value,
    state.context.votes,
    state.context.ballots.estatal,
    state.context.ballots.legislativa,
    state.context.ballots.municipal,
  ])

  return (
    <div>
      {state.context.ballotType === BallotType.state &&
        state.context.ballots.estatal && (
          <>
            <div className="overflow-scroll">
              <ColumnHighlightProvider>
                <Typography
                  tag="p"
                  variant="p"
                  className="text-xs italic mt-6 mb-6"
                >
                  *Para ver otros partidos realiza un scroll hacia tu derecha y
                  para ver más candidatos realiza scroll hacia abajo.
                </Typography>
                <Ballot
                  type={BallotType.state}
                  structure={state.context.ballots.estatal.structure}
                  votes={state.context.votes}
                  toggleVote={(candidate, position) => {
                    send("SELECTED_ELECTIVE_FIELD", {
                      candidate,
                      position,
                      ballotType: BallotType.state,
                    })
                    setIsPristine(false)
                  }}
                />
              </ColumnHighlightProvider>
            </div>
            <div className="mt-6 w-full lg:w-1/3 lg:mx-auto">
              <Button
                className="w-full"
                onClick={() => {
                  handleSubmit(
                    state.context.votes,
                    BallotType.state,
                    state.context.ballots.estatal
                  )
                }}
              >
                Validar
              </Button>
            </div>
          </>
        )}
      {state.context.ballotType === BallotType.legislative &&
        state.context.ballots.legislativa && (
          <>
            <div className="overflow-scroll">
              <ColumnHighlightProvider>
                <Typography
                  tag="p"
                  variant="p"
                  className="text-xs italic mt-6 mb-6"
                >
                  *Para ver otros partidos realiza un scroll hacia tu derecha y
                  para ver más candidatos realiza scroll hacia abajo.
                </Typography>
                <Ballot
                  type={BallotType.legislative}
                  structure={state.context.ballots.legislativa.structure}
                  votes={state.context.votes}
                  toggleVote={(candidate, position) => {
                    send("SELECTED_ELECTIVE_FIELD", {
                      candidate,
                      position,
                      ballotType: BallotType.legislative,
                    })
                    setIsPristine(false)
                  }}
                />
              </ColumnHighlightProvider>
            </div>
            <div className="mt-6 w-full lg:w-1/3 lg:mx-auto">
              <Button
                className="w-full"
                onClick={() => {
                  handleSubmit(
                    state.context.votes,
                    BallotType.legislative,
                    state.context.ballots.legislativa
                  )
                }}
              >
                Validar
              </Button>
            </div>
          </>
        )}
      {state.context.ballotType === BallotType.municipality &&
        state.context.ballots.municipal && (
          <>
            <div className="overflow-scroll">
              <ColumnHighlightProvider>
                <Typography
                  tag="p"
                  variant="p"
                  className="text-xs italic mt-6 mb-6"
                >
                  *Para ver otros partidos realiza un scroll hacia tu derecha y
                  para ver más candidatos realiza scroll hacia abajo.
                </Typography>
                <Ballot
                  type={BallotType.municipality}
                  structure={state.context.ballots.municipal.structure}
                  votes={state.context.votes}
                  toggleVote={(candidate, position) => {
                    send("SELECTED_ELECTIVE_FIELD", {
                      candidate,
                      position,
                      ballotType: BallotType.municipality,
                    })
                    setIsPristine(false)
                  }}
                />
              </ColumnHighlightProvider>
            </div>
            <div className="mt-6 w-full lg:w-1/3 lg:mx-auto">
              <Button
                className="w-full"
                onClick={() => {
                  handleSubmit(
                    state.context.votes,
                    BallotType.municipality,
                    state.context.ballots.municipal
                  )
                }}
              >
                Validar
              </Button>
            </div>
          </>
        )}
    </div>
  )
}
