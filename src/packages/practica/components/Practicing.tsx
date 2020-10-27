import React, { useState } from "react"

import { ColumnHighlightProvider } from "../../../context/column-highlight-context"
import { Button, Typography } from "../../../components/index"
import { BallotType } from "../../../ballot-validator/types"
import { Ballot } from "../../generate-ballot/components"
import useErrorMessages from "../hooks/use-error-messages"
import BallotContainer from "./ballot-container"
import { Tours } from "../constants"

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
  const [isShowingTour, setIsShowingTour] = useState<boolean>(false)

  const onCloseTour = () => {
    setIsShowingTour(false)
  }
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
            <div>
              <ColumnHighlightProvider>
                <Typography
                  tag="p"
                  variant="p"
                  className="text-xs italic mt-6 mb-6"
                >
                  *Para ver otros partidos realiza un scroll hacia tu derecha y
                  para ver más candidatos realiza scroll hacia abajo.
                </Typography>
                <div className="grid grid-cols-1 gap-2 mx-auto lg:grid-cols-2 lg:w-3/4">
                  <Button
                    onClick={() => {
                      handleSubmit(
                        state.context.votes,
                        BallotType.state,
                        state.context.ballots.estatal
                      )
                    }}
                  >
                    Continuar
                  </Button>
                  <Button
                    variant="inverse"
                    onClick={() => setIsShowingTour(true)}
                  >
                    Ver límite de votos por puestos electivos
                  </Button>
                </div>
                <BallotContainer
                  tour={Tours.state}
                  isTourOpen={isShowingTour}
                  onTourClose={onCloseTour}
                >
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
                </BallotContainer>
              </ColumnHighlightProvider>
            </div>
          </>
        )}
      {state.context.ballotType === BallotType.legislative &&
        state.context.ballots.legislativa && (
          <>
            <div>
              <ColumnHighlightProvider>
                <Typography
                  tag="p"
                  variant="p"
                  className="text-xs italic mt-6 mb-6"
                >
                  *Para ver otros partidos realiza un scroll hacia tu derecha y
                  para ver más candidatos realiza scroll hacia abajo.
                </Typography>
                <div className="grid grid-cols-1 gap-2 mx-auto lg:grid-cols-2 lg:w-3/4">
                  <Button
                    onClick={() => {
                      handleSubmit(
                        state.context.votes,
                        BallotType.legislative,
                        state.context.ballots.legislativa
                      )
                    }}
                  >
                    Continuar
                  </Button>
                  <Button
                    variant="inverse"
                    onClick={() => setIsShowingTour(true)}
                  >
                    Ver límite de votos por puestos electivos
                  </Button>
                </div>
                <BallotContainer
                  tour={Tours.legislative}
                  isTourOpen={isShowingTour}
                  onTourClose={onCloseTour}
                >
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
                </BallotContainer>
              </ColumnHighlightProvider>
            </div>
          </>
        )}
      {state.context.ballotType === BallotType.municipality &&
        state.context.ballots.municipal && (
          <>
            <div>
              <ColumnHighlightProvider>
                <Typography
                  tag="p"
                  variant="p"
                  className="text-xs italic mt-6 mb-6"
                >
                  *Para ver otros partidos realiza un scroll hacia tu derecha y
                  para ver más candidatos realiza scroll hacia abajo.
                </Typography>
                <div className="grid grid-cols-1 gap-2 mx-auto lg:grid-cols-2 lg:w-3/4">
                  <Button
                    onClick={() => {
                      handleSubmit(
                        state.context.votes,
                        BallotType.municipality,
                        state.context.ballots.municipal
                      )
                    }}
                  >
                    Continuar
                  </Button>
                  <Button
                    variant="inverse"
                    onClick={() => setIsShowingTour(true)}
                  >
                    Ver límite de votos por puestos electivos
                  </Button>
                </div>
                <BallotContainer
                  tour={Tours.municipal}
                  isTourOpen={isShowingTour}
                  onTourClose={onCloseTour}
                >
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
                </BallotContainer>
              </ColumnHighlightProvider>
            </div>
          </>
        )}
    </div>
  )
}
