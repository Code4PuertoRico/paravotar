import React from "react"
import { useMachine } from "@xstate/react"

import { Button, Card, Typography } from "../../../components/index"
import BallotValidator from "../../../ballot-validator/index"
import { BallotType } from "../../../ballot-validator/types"
import { Ballot } from "../../generate-ballot/components"
import Default from "../../../components/default"
import Switch from "../../../components/switch"
import Case from "../../../components/case"
import { practiceMachine } from "../machines/practice"

import coordinatesToSections from "../services/coordinates-to-sections"
import { BallotConfigs } from "../services/ballot-configs"
import { useSidebar } from "../../../context/sidebar-context"
import BallotStatus from "./ballot-status"
import useVotesTransform from "../hooks/use-votes-transform"
import useBallotValidation from "../hooks/use-ballot-validation"
import useVotesCount from "../hooks/use-votes-count"
import BallotFinderPicker from "./ballot-finder-picker"
import PrecintNumberForm from "./precint-number-form"
import EnterVoterIdForm from "./enter-voter-id-form"
import { ColumnHighlightProvider } from "../../../context/column-highlight-context"
import { Vote } from "../services/vote-service"

export default function Practice() {
  const [state, send] = useMachine(practiceMachine)
  const transformedVotes = useVotesTransform(state.context.votes, state)
  const { ballotStatus, setBallotStatus } = useBallotValidation(
    transformedVotes
  )
  const { votesCount, setVotesCount } = useVotesCount(transformedVotes)
  const { setSidebarIsVisible } = useSidebar()
  const handleSubmit = (
    votes: Vote[],
    ballotType: BallotType,
    ballot?: BallotConfigs
  ) => {
    const transformedVotes = coordinatesToSections(votes, ballot, ballotType)
    const test = BallotValidator(transformedVotes, ballotType)

    console.log({ test })
  }

  const selectBallot = (selectedBallot: string) => {
    setSidebarIsVisible(false)
    setBallotStatus(null)
    setVotesCount(null)

    send(selectedBallot)
  }

  return (
    <div>
      <Typography tag="h2" variant="h3" className="uppercase">
        Practica tu voto
      </Typography>
      <Typography
        tag="h3"
        variant="h2"
        weight="base"
        className="font-normal mt-4"
      >
        Pon en práctica lo aprendido cuantas veces necesites
      </Typography>
      <Card className="practice-card flex justify-center mt-8">
        <Switch state={state}>
          <Case value="ballotFinderPicker">
            <BallotFinderPicker
              selectVoterId={() => send("SELECTED_VOTER_ID")}
              selectPrecint={() => send("SELECTED_PRECINT")}
            />
          </Case>
          <Case value="enterVoterId">
            <EnterVoterIdForm
              errorMessage={
                state.matches({ enterVoterId: "empty" })
                  ? "Favor entre un número electoral."
                  : null
              }
              onSubmit={({ userInput, findBy }) => {
                send("ADDED_VOTER_ID", { userInput, findBy })
              }}
            />
          </Case>
          <Case value="enterPrecint">
            <PrecintNumberForm
              errorMessage={
                state.matches({ enterPrecint: "empty" })
                  ? "Favor un número de precinto."
                  : state.matches({ enterPrecint: "invalidLength" })
                  ? "Su precinto debe tener 3 caracteres o menos."
                  : null
              }
              onSubmit={({ userInput, findBy }) =>
                send("ADDED_PRECINT", {
                  userInput,
                  findBy,
                })
              }
            />
          </Case>
          <Case value="fetchBallots">
            <div>Loading...</div>
          </Case>
          <Case value="selectBallot">
            <div className="mx-auto lg:w-1/2">
              <Typography tag="p" variant="h4">
                Escoge por cuál papeleta comenzar
              </Typography>
              <Button
                className="w-full block mt-4 mb-2"
                onClick={() => selectBallot("SELECTED_GOVERNMENTAL")}
              >
                Estatal
              </Button>
              <Button
                className="w-full block my-2"
                onClick={() => selectBallot("SELECTED_LEGISLATIVE")}
              >
                Legislativa
              </Button>
              <Button
                className="w-full block my-2"
                onClick={() => selectBallot("SELECTED_MUNICIPAL")}
              >
                Municipal
              </Button>
            </div>
          </Case>
          <Case value="governmental">
            <div>
              {state.context.ballots.estatal ? (
                <>
                  <BallotStatus status={ballotStatus}>
                    <Typography tag="p" variant="p">
                      {votesCount?.governor} candidato(a) a Gobernador(a)
                    </Typography>
                    <Typography tag="p" variant="p">
                      {votesCount?.commissionerResident} candidato(a) a
                      Comisionado(a) Residente
                    </Typography>
                  </BallotStatus>
                  <div className="overflow-scroll">
                    <ColumnHighlightProvider>
                      <Ballot
                        type={BallotType.state}
                        structure={state.context.ballots.estatal.structure}
                        votes={state.context.votes}
                        toggleVote={(candidate, position) => {
                          send("SELETED_ELECTIVE_FIELD", {
                            candidate,
                            position,
                          })
                        }}
                      />
                    </ColumnHighlightProvider>
                  </div>
                  <Button
                    onClick={() => {
                      handleSubmit(
                        state.context.votes,
                        BallotType.state,
                        state.context.ballots.estatal
                      )
                    }}
                  >
                    Submit
                  </Button>
                </>
              ) : null}
            </div>
          </Case>
          <Case value="legislative">
            <div>
              {state.context.ballots.legislativa ? (
                <>
                  <BallotStatus status={ballotStatus}>
                    <Typography tag="p" variant="p">
                      {votesCount?.districtRepresentative} candidato(a) a
                      Representante por Distrito
                    </Typography>
                    <Typography tag="p" variant="p">
                      {votesCount?.districtSenators} candidato(a) a Senador por
                      Distrito
                    </Typography>
                    <Typography tag="p" variant="p">
                      {votesCount?.atLargeRepresentative} candidato(a) a
                      Representante por Acumulación
                    </Typography>
                    <Typography tag="p" variant="p">
                      {votesCount?.atLargeSenator} candidato(a) a Senador por
                      Acumulación
                    </Typography>
                  </BallotStatus>
                  <div className="overflow-scroll">
                    <ColumnHighlightProvider>
                      <Ballot
                        type={BallotType.legislative}
                        structure={state.context.ballots.legislativa.structure}
                        votes={state.context.votes}
                        toggleVote={(candidate, position) => {
                          send("SELETED_ELECTIVE_FIELD", {
                            candidate,
                            position,
                          })
                        }}
                      />
                    </ColumnHighlightProvider>
                  </div>
                  <Button
                    onClick={() => {
                      handleSubmit(
                        state.context.votes,
                        BallotType.legislative,
                        state.context.ballots.legislativa
                      )
                    }}
                  >
                    Submit
                  </Button>
                </>
              ) : null}
            </div>
          </Case>
          <Case value="municipal">
            <div>
              {state.context.ballots.municipal ? (
                <>
                  <BallotStatus status={ballotStatus}>
                    <Typography tag="p" variant="p">
                      {votesCount?.mayor} a Alcalde(sa)
                    </Typography>
                    <Typography tag="p" variant="p">
                      {votesCount?.municipalLegislators} candidato(a) a
                      Legisladores(as) municipales
                    </Typography>
                  </BallotStatus>
                  <div className="overflow-scroll">
                    <ColumnHighlightProvider>
                      <Ballot
                        type={BallotType.municipality}
                        structure={state.context.ballots.municipal.structure}
                        votes={state.context.votes}
                        toggleVote={(candidate, position) => {
                          send("SELETED_ELECTIVE_FIELD", {
                            candidate,
                            position,
                          })
                        }}
                      />
                    </ColumnHighlightProvider>
                  </div>
                  <Button
                    onClick={() => {
                      handleSubmit(
                        state.context.votes,
                        BallotType.municipality,
                        state.context.ballots.municipal
                      )
                    }}
                  >
                    Submit
                  </Button>
                </>
              ) : null}
            </div>
          </Case>
          <Default>FAILURE</Default>
        </Switch>
      </Card>
    </div>
  )
}
