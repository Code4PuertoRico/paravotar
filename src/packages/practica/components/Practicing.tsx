import React, { useState, useEffect, ReactNode } from "react"

import Tour from "reactour"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"

import { ColumnHighlightProvider } from "../../../context/column-highlight-context"
import { Button, Typography } from "../../../components/index"
import { BallotType } from "../../../ballot-validator/types"
import { Ballot } from "../../generate-ballot/components"
import useErrorMessages from "../hooks/use-error-messages"

const StateBallotTour = [
  {
    selector: '[data-slug="governor-header"]',
    content: "Tienes derecho a escoger un (1) candidato(a) a governador(a).",
  },
  {
    selector: '[data-slug="commissioner-resident-header"]',
    content:
      "Tienes derecho a escoger un (1) candidato(a) a comisionado(a) residente.",
  },
]

const MunicipalBallotTour = [
  {
    selector: '[data-slug="mayor-header"]',
    content: "Tienes derecho a escoger un (1) candidato(a) a alcalde(sa).",
  },
  {
    selector: '[data-slug="municipal-legislator-header"]',
    content:
      "Tienes derecho a escoger trece (13) candidatos a legislador(a) municipal.",
  },
]

const LegislativeBallotTour = [
  {
    selector: '[data-slug="district-representative-header"]',
    content:
      "Tienes derecho a escoger un (1) candidato(a) a representante por distrito.",
    position: "top",
  },
  {
    selector: '[data-slug="district-senator-header"]',
    content:
      "Tienes derecho a escoger un (2) candidatos(as) a senador(a) por distrito.",
    position: "top",
  },
  {
    selector: '[data-slug="at-large-representative-header"]',
    content:
      "Tienes derecho a escoger un (1) candidato(a) a representante por acumulación.",
    position: "top",
  },
  {
    selector: '[data-slug="at-large-senator-header"]',
    content:
      "Tienes derecho a escoger un (1) candidato(a) a senador(a) por acumulación.",
    position: "top",
  },
]

function BallotContainer({ children, steps }: { children: ReactNode }) {
  const [isShowingTour, setIsShowingTour] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setIsShowingTour(true)
    }, 1500)
  }, [])

  const onCloseTour = () => {
    setIsShowingTour(false)
  }
  const disableBody = target => {
    disableBodyScroll(target)

    const mainContainer: HTMLElement | null = document.querySelector(
      "#main-container"
    )

    if (mainContainer) {
      mainContainer.style.overflowY = "hidden"
      mainContainer.style.overflowX = "hidden"
    }

    const ballotContainer: HTMLElement | null = document.querySelector(
      "#ballot-container"
    )

    if (ballotContainer) {
      ballotContainer.style.overflowY = "hidden"
      ballotContainer.style.overflowX = "hidden"
    }

    const htmlContainer: HTMLElement | null = document.querySelector("html")

    if (htmlContainer) {
      htmlContainer.style.scrollBehavior = "auto"
    }
  }

  const enableBody = target => {
    enableBodyScroll(target)

    const mainContainer: HTMLElement | null = document.querySelector(
      "#main-container"
    )

    if (mainContainer) {
      mainContainer.style.overflowY = "scroll"
      mainContainer.style.overflowX = "autoscroll-behavior: smooth;"
    }

    const ballotContainer: HTMLElement | null = document.querySelector(
      "#ballot-container"
    )

    if (ballotContainer) {
      ballotContainer.style.overflowY = "hidden"
      ballotContainer.style.overflowX = "scroll"
    }

    const htmlContainer: HTMLElement | null = document.querySelector("html")

    if (htmlContainer) {
      htmlContainer.style.scrollBehavior = "smooth"
    }
  }

  return (
    <div id="ballot-container" className="overflow-scroll -mx-6">
      {children}

      <Tour
        onAfterOpen={disableBody}
        onBeforeClose={enableBody}
        steps={steps}
        isOpen={isShowingTour}
        onRequestClose={onCloseTour}
        rounded={4}
        accentColor="#886944"
        inViewThreshold={64}
      />
    </div>
  )
}

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
                <BallotContainer steps={StateBallotTour}>
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
                <BallotContainer steps={LegislativeBallotTour}>
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
                <BallotContainer steps={MunicipalBallotTour}>
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
