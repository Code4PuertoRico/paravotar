import { useEffect, useMemo } from "react"
import _ from "lodash"

import { useMachine } from "@xstate/react"
import { ToastContainer, toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"

import { toFriendlyErrorMessages } from "../../../ballot-validator/helpers/messages"
import { Card, Spinner, Typography } from "../../../components/index"
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
  StateVotesCount,
  MunicipalVotesCount,
  LegislativeVotesCount,
} from "../services/ballot-configs"
// import useBallotValidation from "../hooks/use-ballot-validation"
import useVotesTransform from "../hooks/use-votes-transform"
import { BallotSelectionEvent, PracticeMachine } from "../machines/practice"
import useVotesCount from "../hooks/use-votes-count"
import { getExplicitlySelectedVotes, Vote } from "../services/vote-service"
import BallotFinderPicker from "./ballot-finder-picker"
import PrecintNumberForm from "./precint-number-form"
import EnterVoterIdForm from "./enter-voter-id-form"

import { Results } from "./Results"
import BallotStatus from "./ballot-status"
import { Practicing } from "./Practicing"
import { NoVoterIdFound } from "./NoVoterIdFound"
import ResultsState from "./results-state"
import ResultsMunicipal from "./results-municipal"
import ResultsLegislative from "./results-legislative"
import BallotSelector from "./ballot-selector"
import Steps from "./steps"
import ContinuePracticing from "./continue-practicing"
import { FindByType } from "../services/ballot-finder-service"
import "react-toastify/dist/ReactToastify.css"
import { TourProvider } from "@reactour/tour"
import { Tours } from "../constants"

const disableBody = (target: Element | null) => {
  if (document == null || target == null) return

  disableBodyScroll(target)

  const mainContainer: HTMLElement | null =
    document.querySelector("#main-container")

  if (mainContainer) {
    mainContainer.style.overflowY = "hidden"
    mainContainer.style.overflowX = "hidden"
  }

  const ballotContainer: HTMLElement | null =
    document.querySelector("#ballot-container")

  if (ballotContainer) {
    ballotContainer.style.overflowY = "hidden"
    ballotContainer.style.overflowX = "hidden"
  }

  const htmlContainer: HTMLElement | null = document.querySelector("html")

  if (htmlContainer) {
    htmlContainer.style.scrollBehavior = "auto"
  }
}

const enableBody = (target: Element | null) => {
  if (document == null || target == null) return

  enableBodyScroll(target)

  const mainContainer: HTMLElement | null =
    document.querySelector("#main-container")

  if (mainContainer) {
    mainContainer.style.overflowY = "scroll"
    mainContainer.style.overflowX = "autoscroll-behavior: smooth;"
  }

  const ballotContainer: HTMLElement | null =
    document.querySelector("#ballot-container")

  if (ballotContainer) {
    ballotContainer.style.overflowY = "hidden"
    ballotContainer.style.overflowX = "scroll"
  }

  const htmlContainer: HTMLElement | null = document.querySelector("html")

  if (htmlContainer) {
    htmlContainer.style.scrollBehavior = "smooth"
  }
}

export default function Practice({
  initialPrecint,
  initialBallotType,
}: {
  initialPrecint: string | null
  initialBallotType?: BallotType
}) {
  const { t } = useTranslation()
  const [state, send] = useMachine(PracticeMachine, {
    context: {
      ballotType: initialBallotType,
    },
  })

  useEffect(() => {
    send("start", { userInput: initialPrecint, findBy: FindByType.precint })
  }, [])

  const votes = state.context.votes
  const transformedVotes = useVotesTransform(votes, state)
  // const { ballotStatus, setBallotStatus } = useBallotValidation(
  //   transformedVotes
  // )
  const { votesCount, setVotesCount } = useVotesCount(transformedVotes)
  const { setSidebarIsVisible } = useSidebar()

  const handleSubmit = (
    votes: Vote[],
    ballotType: BallotType,
    ballot?: BallotConfigs
  ) => {
    if (ballot == null) return

    const cleanedVotes = getExplicitlySelectedVotes(votes)
    const transformedVotes = coordinatesToSections(
      cleanedVotes,
      ballot,
      ballotType
    )

    const validationResult = BallotValidator(transformedVotes, ballotType)

    toast.dismiss()

    const writeInMissingNames = votes
      .map((v) => {
        if (v.candidate && _.isEmpty(v.candidate.name)) {
          return v
        }
        return null
      })
      .filter((v) => v !== null)

    if (
      validationResult.outcomes.denied.length === 0 &&
      writeInMissingNames.length === 0
    ) {
      send("SUBMIT")
    } else {
      toFriendlyErrorMessages(validationResult)?.map((messageId) => {
        if (
          messageId.includes("MunicipalLegislatorDynamicSelectionRule") &&
          ballotType === BallotType.municipality
        ) {
          toast.error(
            t(messageId, {
              maxSelection: (ballot as MunicipalBallotConfig)
                ?.amountOfMunicipalLegislators,
            })
          )
        } else {
          toast.error(t(messageId))
        }
      })

      if (writeInMissingNames.length > 0) {
        toast.error(
          "El nombre del candidato por nominación directa no puede estar vacio"
        )
      }
    }
  }

  useEffect(() => {
    const elem = document.getElementById("practica-tu-voto")

    if (elem) {
      elem.scrollIntoView && elem.scrollIntoView()
    }
  }, [state.value])

  const selectBallot = (
    selectedBallot: BallotSelectionEvent["type"],
    eventData: any
  ) => {
    setSidebarIsVisible(false)
    // setBallotStatus(null)
    setVotesCount(null)

    send(selectedBallot, eventData)
  }

  const ballotType = state.context.ballotType || null

  const practice = useMemo(() => {
    if (state.context.ballots == null) return { tour: [], onSubmit: () => {} }

    if (
      state.context.ballotType === BallotType.state &&
      state.context.ballots.estatal
    ) {
      return {
        tour: Tours.state,
        onSubmit: () =>
          handleSubmit(
            state.context.votes,
            BallotType.state,
            state.context.ballots?.estatal
          ),
      }
    }

    if (
      state.context.ballotType === BallotType.legislative &&
      state.context.ballots.legislativa
    ) {
      return {
        tour: Tours.legislative,
        onSubmit: () =>
          handleSubmit(
            state.context.votes,
            BallotType.legislative,
            state.context.ballots?.legislativa
          ),
      }
    }

    return {
      tour: Tours.municipal,
      onSubmit: () =>
        handleSubmit(
          state.context.votes,
          BallotType.municipality,
          state.context.ballots?.municipal
        ),
    }
  }, [
    handleSubmit,
    state.context.ballotType,
    state.context.ballots,
    state.context.votes,
  ])

  return (
    <div className="relative w-full">
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
          <Case value="mainScreen">
            <Steps onStart={() => send("START_PRACTICE")} />
          </Case>
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
            <div>
              <Spinner className="mx-auto" />
              <Typography variant="p" tag="p" className="block mt-4">
                Cargando...
              </Typography>
            </div>
          </Case>
          <Case value="selectBallot">
            <BallotSelector
              selectState={() =>
                selectBallot("SELECTED_GOVERNMENTAL", {
                  ballotType: BallotType.state,
                })
              }
              selectMunicipal={() =>
                selectBallot("SELECTED_MUNICIPAL", {
                  ballotType: BallotType.municipality,
                })
              }
              selectLegislative={() =>
                selectBallot("SELECTED_LEGISLATIVE", {
                  ballotType: BallotType.legislative,
                })
              }
            />
          </Case>
          <Case value="practicing">
            <TourProvider
              steps={practice.tour}
              afterOpen={disableBody}
              beforeClose={enableBody}
              onClickClose={({ setIsOpen }) => {
                setIsOpen(false)
              }}
              inViewThreshold={64}
              showCloseButton
            >
              <Practicing
                state={state}
                send={send}
                handleSubmit={practice.onSubmit}
              />
            </TourProvider>
          </Case>
          <Case value="showResults">
            <Results state={state} send={send} />
          </Case>
          <Case value="continuePracticing">
            <ContinuePracticing send={send} />
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
        <BallotStatus>
          {ballotType === BallotType.state ? (
            <ResultsState
              votesCount={votesCount as StateVotesCount}
              votes={votes}
            />
          ) : ballotType === BallotType.municipality ? (
            <ResultsMunicipal
              votesCount={votesCount as MunicipalVotesCount}
              votes={votes}
            />
          ) : ballotType === BallotType.legislative ? (
            <ResultsLegislative
              votesCount={votesCount as LegislativeVotesCount}
              votes={votes}
            />
          ) : null}
        </BallotStatus>
      )}
    </div>
  )
}
