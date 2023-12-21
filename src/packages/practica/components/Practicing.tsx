import { useTour } from "@reactour/tour"

import { ColumnHighlightProvider } from "../../../context/column-highlight-context"
import { Button, Typography } from "../../../components/index"
import { BallotType } from "../../../ballot-validator/types"
import { Ballot } from "../../generate-ballot/components"
import useErrorMessages from "../hooks/use-error-messages"
import BallotContainer from "./ballot-container"

interface PracticingProps {
  state: any
  send: any
  handleSubmit: VoidFunction
}

export const Practicing = ({ state, send, handleSubmit }: PracticingProps) => {
  const { setIsOpen } = useTour()
  const { setIsPristine } = useErrorMessages(state, [
    state,
    state.value,
    state.context.votes,
    state.context.ballots?.estatal,
    state.context.ballots?.legislativa,
    state.context.ballots?.municipal,
  ])

  if (state.context.ballots == null) return

  return (
    <div>
      <ColumnHighlightProvider>
        <Typography tag="p" variant="p" className="text-xs italic mt-6 mb-6">
          *Para ver otros partidos realiza un scroll hacia tu derecha y para ver
          más candidatos realiza scroll hacia abajo.
        </Typography>
        <div className="grid grid-cols-1 gap-2 mx-auto lg:grid-cols-2 lg:w-3/4">
          <Button onClick={handleSubmit} data-testid="submit">
            Continuar
          </Button>
          <Button variant="inverse" onClick={() => setIsOpen(true)}>
            Ver límite de votos por puestos electivos
          </Button>
        </div>
        {state.context.ballotType === BallotType.state &&
          state.context.ballots.estatal && (
            <BallotContainer>
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
          )}
        {state.context.ballotType === BallotType.legislative &&
          state.context.ballots.legislativa && (
            <BallotContainer>
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
          )}
        {state.context.ballotType === BallotType.municipality &&
          state.context.ballots.municipal && (
            <BallotContainer>
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
          )}
      </ColumnHighlightProvider>
    </div>
  )
}
