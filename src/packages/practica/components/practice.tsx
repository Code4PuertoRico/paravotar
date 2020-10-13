import React from "react"
import { useMachine } from "@xstate/react"
import { ToastContainer, toast } from "react-toastify"
import i18next from "i18next"

import { toFriendlyErrorMessages } from "../../../ballot-validator/helpers/messages"
import { ColumnHighlightProvider } from "../../../context/column-highlight-context"
import { Button, Card, Typography } from "../../../components/index"
import { useSidebar } from "../../../context/sidebar-context"
import BallotValidator from "../../../ballot-validator/index"
import { BallotType } from "../../../ballot-validator/types"
import { Ballot } from "../../generate-ballot/components"
import Default from "../../../components/default"
import Switch from "../../../components/switch"
import Case from "../../../components/case"
import coordinatesToSections from "../services/coordinates-to-sections"
import {
  BallotConfigs,
  MunicipalBallotConfig,
} from "../services/ballot-configs"
import useBallotValidation from "../hooks/use-ballot-validation"
import useVotesTransform from "../hooks/use-votes-transform"
import useErrorMessages from "../hooks/use-error-messages"
import { practiceMachine } from "../machines/practice"
import useVotesCount from "../hooks/use-votes-count"
import { Vote } from "../services/vote-service"
import BallotFinderPicker from "./ballot-finder-picker"
import PrecintNumberForm from "./precint-number-form"
import EnterVoterIdForm from "./enter-voter-id-form"
import BallotStatus from "./ballot-status"

export default function Practice() {
  const [state, send] = useMachine(practiceMachine)
  const transformedVotes = useVotesTransform(state.context.votes, state)
  const { ballotStatus, setBallotStatus } = useBallotValidation(
    transformedVotes
  )
  const { votesCount, setVotesCount } = useVotesCount(transformedVotes)
  const { setSidebarIsVisible } = useSidebar()
  const { setIsPristine } = useErrorMessages(state, [
    state,
    state.value,
    state.context.votes,
    state.context.ballots.estatal,
    state.context.ballots.legislativa,
    state.context.ballots.municipal,
  ])
  const handleSubmit = (
    votes: Vote[],
    ballotType: BallotType,
    ballot?: BallotConfigs
  ) => {
    const transformedVotes = coordinatesToSections(votes, ballot, ballotType)
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
  }

  const selectBallot = (selectedBallot: string) => {
    setSidebarIsVisible(false)
    setBallotStatus(null)
    setVotesCount(null)

    send(selectedBallot)
  }

  return (
    <div className="relative">
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
                  <div className="overflow-scroll">
                    <ColumnHighlightProvider>
                      <Typography
                        tag="p"
                        variant="p"
                        className="text-xs italic mt-2 mb-6"
                      >
                        *Para ver otros partidos realiza un scroll hacia tu
                        derecha y para ver más candidatos realiza scroll hacia
                        abajo.
                      </Typography>
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
                  {/* <Button
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
                  <div className="overflow-scroll">
                    <ColumnHighlightProvider>
                      <Typography
                        tag="p"
                        variant="p"
                        className="text-xs italic mt-2 mb-6"
                      >
                        *Para ver otros partidos realiza un scroll hacia tu
                        derecha y para ver más candidatos realiza scroll hacia
                        abajo.
                      </Typography>
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
                  {/* <Button
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
                  <div className="overflow-scroll">
                    <ColumnHighlightProvider>
                      <Typography
                        tag="p"
                        variant="p"
                        className="text-xs italic mt-2 mb-6"
                      >
                        *Para ver otros partidos realiza un scroll hacia tu
                        derecha y para ver más candidatos realiza scroll hacia
                        abajo.
                      </Typography>
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
                  {/* <Button
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
      {votesCount &&
      (state.matches("governmental") ||
        state.matches("municipal") ||
        state.matches("legislative")) ? (
        <BallotStatus status={ballotStatus}>
          {state.matches("governmental") ? (
            <>
              <Typography tag="p" variant="p" className="text-white">
                {votesCount?.governor} candidato(a) a Gobernador(a)
              </Typography>
              <Typography tag="p" variant="p" className="text-white">
                {votesCount?.commissionerResident} candidato(a) a Comisionado(a)
                Residente
              </Typography>
            </>
          ) : state.matches("municipal") ? (
            <>
              <Typography tag="p" variant="p" className="text-white">
                {votesCount?.districtRepresentative} candidato(a) a
                Representante por Distrito
              </Typography>
              <Typography tag="p" variant="p" className="text-white">
                {votesCount?.districtSenators} candidato(a) a Senador por
                Distrito
              </Typography>
            </>
          ) : state.matches("legislative") ? (
            <>
              <Typography tag="p" variant="p" className="text-white">
                {votesCount?.atLargeRepresentative} candidato(a) a Representante
                por Acumulación
              </Typography>
              <Typography tag="p" variant="p" className="text-white">
                {votesCount?.atLargeSenator} candidato(a) a Senador por
                Acumulación
              </Typography>
              <Typography tag="p" variant="p" className="text-white">
                {votesCount?.mayor} a Alcalde(sa)
              </Typography>
              <Typography tag="p" variant="p" className="text-white">
                {votesCount?.municipalLegislators} candidato(a) a
                Legisladores(as) municipales
              </Typography>
            </>
          ) : null}
        </BallotStatus>
      ) : null}
    </div>
  )
}
