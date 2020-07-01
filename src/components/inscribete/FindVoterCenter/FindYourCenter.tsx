import React, { useRef } from "react"
import { createMachine, assign, DoneEventObject } from "xstate"
import { useMachine } from "@xstate/react"
import Button from "../../button"
import Link from "../../link"

const OPEN_LINK_BASE = "https://www.google.com/maps/search/?api=1&query="

const EMBED_LINK_BASE =
  "https://maps.google.com/maps?t=&z=13&ie=UTF8&iwloc=&output=embed&q="

const isNumberExpr = new RegExp(/^\d+$/)

const getVoterDetails = (voterId?: string) =>
  fetch(`https://api.paravotar.org/consulta?voterId=${voterId}`).then(
    response => {
      if (!response.ok) {
        throw new Error("HTTP status code: " + response.status)
      }
      return response.json()
    }
  )

interface FindYourCenterContext {
  voterId?: string
}

type FindYourCenterEvent = { type: "submit"; voterId: string }

const findYourCenterMachine = createMachine<
  FindYourCenterContext,
  FindYourCenterEvent
>(
  {
    id: "findYourCenterMachine",
    initial: "idle",
    states: {
      idle: {
        on: {
          submit: {
            target: "fetchingVoterDetails",
            cond: "hasValidVoterId",
            actions: "persistVoterId",
          },
        },
      },
      fetchingVoterDetails: {
        invoke: {
          src: "fetchVoterDetails",
          onDone: "loadGoogleMapsLinks",
          onError: "failure",
        },
      },
      failure: {
        after: {
          [2000]: "idle",
        },
      },
      loadGoogleMapsLinks: {
        on: {
          submit: {
            target: "fetchingVoterDetails",
            cond: "hasValidVoterId",
            actions: "persistVoterId",
          },
        },
      },
    },
  },
  {
    guards: {
      hasValidVoterId: (_, { voterId }) => {
        if (typeof voterId !== "string") {
          return false
        }

        return isNumberExpr.test(voterId)
      },
    },
    actions: {
      persistVoterId: assign((_, { voterId }: FindYourCenterEvent) => ({
        voterId,
      })),
    },
    services: {
      fetchVoterDetails: (_, { voterId }) => getVoterDetails(voterId),
    },
  }
)

export const FindYourCenter: React.FunctionComponent = () => {
  const [current, send] = useMachine(findYourCenterMachine)

  const inputRef = useRef<HTMLInputElement>(null)

  let openLink = ""
  let embedUrl = ""

  if (current.matches("loadGoogleMapsLinks")) {
    const r = (current.event as DoneEventObject).data

    const query = encodeURIComponent(
      r.centroDeVotacion + " " + r.direccion + " " + r.pueblo
    )
    openLink = OPEN_LINK_BASE + query
    embedUrl = EMBED_LINK_BASE + query
  }

  return (
    <>
      <p>
        Ingrese su numero de votante que se encuentra en la tarjeta electoral
      </p>
      {current.matches("failure") ? (
        <p className="text-red">Error buscando sus datos</p>
      ) : null}

      <input type="text" ref={inputRef} />
      <Button
        onClick={() => send("submit", { voterId: inputRef.current?.value })}
        disabled={current.matches("loading")}
      >
        Submit
      </Button>

      {current.matches("loadGoogleMapsLinks") ? (
        <p>
          <Link to={openLink}>Open GMAPS</Link>
          <iframe
            title="Directions to voter center"
            src={embedUrl}
            width="400"
            height="400"
          />
        </p>
      ) : null}
    </>
  )
}
