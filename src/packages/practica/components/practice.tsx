import React from "react"

import { useMachine } from "@xstate/react"
import { ToastContainer, toast } from "react-toastify"
import i18next from "i18next"

import { toFriendlyErrorMessages } from "../../../ballot-validator/helpers/messages"
import { Button, Card, Typography } from "../../../components/index"
import { useSidebar } from "../../../context/sidebar-context"
import BallotValidator from "../../../ballot-validator/index"
import { BallotType } from "../../../ballot-validator/types"
import Arrows from "../../../components/arrows"
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
import { practiceMachine } from "../machines/practice"
import useVotesCount from "../hooks/use-votes-count"
import { Vote } from "../services/vote-service"
import BallotFinderPicker from "./ballot-finder-picker"
import PrecintNumberForm from "./precint-number-form"
import EnterVoterIdForm from "./enter-voter-id-form"

import { Results } from "./Results"
import BallotStatus from "./ballot-status"
import { Practicing } from "./Practicing"
import { NoVoterIdFound } from "./NoVoterIdFound"

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
    const validationResult = BallotValidator(transformedVotes, ballotType)

    toast.dismiss()

    if (validationResult.outcomes.denied.length === 0) {
      send("SUBMIT")
    } else {
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
  }

  const selectBallot = (selectedBallot: string, eventData: any) => {
    setSidebarIsVisible(false)
    setBallotStatus(null)
    setVotesCount(null)

    send(selectedBallot, eventData)
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
        {state.nextEvents.includes("BACK") && (
          <div className="absolute top-0 -ml-1 pt-4">
            <button
              className="mb-4 inline-flex items-center border-none text-primary font-semibold hover:underline"
              onClick={() => send("BACK")}
            >
              <Arrows
                className="text-primary block mr-2 hover:text-white"
                style={{ transform: "rotate(90deg)" }}
              />
              Volver
            </button>
          </div>
        )}
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
          <Case value="noVoterIdFound">
            <NoVoterIdFound send={send} />
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
            <div>Cargando...</div>
          </Case>
          <Case value="selectBallot">
            <div className="mx-auto lg:w-1/2">
              <Typography tag="p" variant="h4">
                Escoge por cuál papeleta comenzar
              </Typography>
              <Button
                className="w-full block mt-4 mb-2"
                onClick={() =>
                  selectBallot("SELECTED_GOVERNMENTAL", {
                    ballotType: BallotType.state,
                  })
                }
              >
                Estatal
              </Button>
              <Button
                className="w-full block my-2"
                onClick={() =>
                  selectBallot("SELECTED_LEGISLATIVE", {
                    ballotType: BallotType.legislative,
                  })
                }
              >
                Legislativa
              </Button>
              <Button
                className="w-full block my-2"
                onClick={() =>
                  selectBallot("SELECTED_MUNICIPAL", {
                    ballotType: BallotType.municipality,
                  })
                }
              >
                Municipal
              </Button>
            </div>
          </Case>
          <Case value="practicing">
            <Practicing state={state} send={send} handleSubmit={handleSubmit} />
          </Case>
          <Case value="showResults">
            <Results state={state} send={send} />
          </Case>
          <Default>
            <>FAILURE</>
          </Default>
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
      {votesCount && state.matches("practicing") && (
        <BallotStatus status={ballotStatus}>
          {state.context.ballotType === BallotType.state ? (
            <>
              <Typography tag="p" variant="p" className="text-white">
                {votesCount?.governor} candidato(a) a Gobernador(a)
              </Typography>
              <Typography tag="p" variant="p" className="text-white">
                {votesCount?.commissionerResident} candidato(a) a Comisionado(a)
                Residente
              </Typography>
            </>
          ) : state.context.ballotType === BallotType.municipality ? (
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
          ) : state.context.ballotType === BallotType.legislative ? (
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
      )}
    </div>
  )
}
