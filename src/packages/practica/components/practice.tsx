import React, { useEffect, useState } from "react"
import { useMachine } from "@xstate/react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import i18next from "i18next"

import { Button, Card, Typography } from "../../../components/index"
import BallotValidator from "../../../ballot-validator/index"
import { BallotType } from "../../../ballot-validator/types"
import { Ballot } from "../../generate-ballot/components"
import Default from "../../../components/default"
import Switch from "../../../components/switch"
import Case from "../../../components/case"
import { practiceMachine } from "../machines/practice"

import coordinatesToSections from "../services/coordinates-to-sections"
import {
  BallotConfigs,
  MunicipalBallotConfig,
} from "../services/ballot-configs"
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
import { toFriendlyErrorMessages } from "../../../ballot-validator/helpers/messages"

export default function Practice() {
  const [isPristine, setIsPristine] = useState(true)
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
    const validationResult = BallotValidator(transformedVotes, ballotType)

    console.log(validationResult)
  }

  const selectBallot = (selectedBallot: string) => {
    setSidebarIsVisible(false)
    setBallotStatus(null)
    setVotesCount(null)

    send(selectedBallot)
  }

  useEffect(() => {
    let ballotType: any = null
    let ballot: any = null

    if (state.matches("governmental")) {
      ballotType = BallotType.state
      ballot = state.context.ballots.estatal
    } else if (state.matches("legislative")) {
      ballotType = BallotType.legislative
      ballot = state.context.ballots.legislativa
    } else if (state.matches("municipal")) {
      ballotType = BallotType.municipality
      ballot = state.context.ballots.municipal
    }

    if (!ballotType) {
      return
    }

    if (isPristine) {
      return
    }

    const transformedVotes = coordinatesToSections(
      state.context.votes,
      ballot,
      ballotType
    )

    const validationResult = BallotValidator(transformedVotes, ballotType)

    toast.dismiss()

    toFriendlyErrorMessages(validationResult)?.map(messageId => {
      if (
        messageId.includes("MunicipalLegislatorDynamicSelectionRule") &&
        ballotType === BallotType.municipality
      ) {
        toast.error(
          i18next.t(messageId, {
            maxSelection: (ballot as MunicipalBallotConfig)
              ?.amountOfMunicipalLegislators,
          })
        )
      } else {
        toast.error(i18next.t(messageId))
      }
    })
  }, [
    state,
    state.value,
    state.context.votes,
    state.context.ballots.estatal,
    state.context.ballots.legislativa,
    state.context.ballots.municipal,
  ])

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
                            ballotType: BallotType.state,
                          })
                          setIsPristine(false)
                        }}
                      />
                    </ColumnHighlightProvider>
                  </div>
                  {/* <Button
                    className="mt-4"
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
                  <Button
                    className="mt-4"
                    onClick={() => {
                      send("EXPORTED_VOTES", {
                        ballotType: "estatal",
                        ballotPath: state.context.ballotPaths.estatal,
                      })
                    }}
                  >
                    Generate PDF
                  </Button> */}
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
                            ballotType: BallotType.legislative,
                          })
                          setIsPristine(false)
                        }}
                      />
                    </ColumnHighlightProvider>
                  </div>
                  {/* <Button
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
                  <Button
                    className="mt-4"
                    onClick={() => {
                      send("EXPORTED_VOTES", {
                        ballotType: "estatal",
                        ballotPath: state.context.ballotPaths.municipal,
                      })
                    }}
                  >
                    Generate PDF
                  </Button> */}
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
                            ballotType: BallotType.municipality,
                          })
                          setIsPristine(false)
                        }}
                      />
                    </ColumnHighlightProvider>
                  </div>
                  {/* <Button
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
                  <Button
                    className="mt-4"
                    onClick={() => {
                      send("EXPORTED_VOTES", {
                        ballotType: "estatal",
                        ballotPath: state.context.ballotPaths.legislativa,
                      })
                    }}
                  >
                    Generate PDF
                  </Button> */}
                </>
              ) : null}
            </div>
          </Case>
          <Default>FAILURE :(</Default>
        </Switch>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}
