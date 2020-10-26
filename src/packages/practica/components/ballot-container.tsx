import React, { ReactNode } from "react"

import Tour from "reactour"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"

import { TourType } from "../constants"

type BallotContainerProps = {
  children: ReactNode
  tour: TourType[]
  onTourClose: () => void
  isTourOpen: boolean
}

export default function BallotContainer(props: BallotContainerProps) {
  const disableBody = target => {
    if (document) {
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
  }

  const enableBody = target => {
    if (document) {
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
  }

  return (
    <div id="ballot-container" className="overflow-scroll -mx-6 mt-6">
      {props.children}

      <Tour
        onAfterOpen={disableBody}
        onBeforeClose={enableBody}
        steps={props.tour}
        isOpen={props.isTourOpen}
        onRequestClose={props.onTourClose}
        rounded={4}
        accentColor="#886944"
        inViewThreshold={64}
      />
    </div>
  )
}
