import React, { useRef } from "react"
import { createMachine, assign, DoneEventObject } from "xstate"
import i18next from "i18next"
import { useMachine } from "@xstate/react"
import Button from "../../button"
import Typography from "../../typography"

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
          [5000]: "idle",
        },
        on: {
          submit: {
            target: "fetchingVoterDetails",
            cond: "hasValidVoterId",
            actions: "persistVoterId",
          },
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

  let embedUrl = ""

  if (current.matches("loadGoogleMapsLinks")) {
    const r = (current.event as DoneEventObject).data

    const query = encodeURIComponent(
      r.centroDeVotacion + " " + r.direccion + " " + r.pueblo
    )

    embedUrl = EMBED_LINK_BASE + query
  }

  return (
    <>
      <Typography
        tag="h4"
        variant="h4"
        weight="base"
        className="font-normal mt-4 text-gray text-center"
      >
        {i18next.t("site.enter-voter-id")}
      </Typography>

      <section className="flex justify-center mt-8 mb-8">
        <input
          type="text"
          ref={inputRef}
          className="h-16 border-primary border-2 rounded-md p-4 mr-6"
          placeholder="Número Electoral"
        />

        <Button
          onClick={() => send("submit", { voterId: inputRef.current?.value })}
          disabled={current.matches("fetchingVoterDetails")}
          className="uppercase pl-12 pr-12"
        >
          continuar
        </Button>
      </section>

      {current.matches("failure") ? (
        <>
          <Typography
            tag="h4"
            variant="h4"
            weight="base"
            className="font-normal mt-8 text-red text-center"
          >
            Hubo un error buscando su centro de votación.
          </Typography>
          <Typography
            tag="h4"
            variant="h4"
            weight="base"
            className="font-normal mt-2 text-red text-center"
          >
            Asegure entrar el número correcto.
          </Typography>
        </>
      ) : null}

      {current.matches("loadGoogleMapsLinks") ? (
        <iframe
          className="mt-16"
          title="Directions to voter center"
          src={embedUrl}
          width="100%"
          height="400"
        />
      ) : null}
    </>
  )
}
