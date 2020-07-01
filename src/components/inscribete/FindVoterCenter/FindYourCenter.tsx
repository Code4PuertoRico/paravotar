import React, { useRef } from "react"
import i18next from "i18next"
import { DoneEventObject } from "xstate"
import { useMachine } from "@xstate/react"
import Button from "../../button"
import Typography from "../../typography"
import { findYourCenterMachine } from "./findYourCenterMachine"

const EMBED_LINK_BASE =
  "https://maps.google.com/maps?t=&z=13&ie=UTF8&iwloc=&output=embed&q="

export const FindYourCenter: React.FunctionComponent = () => {
  const [current, send] = useMachine(findYourCenterMachine)

  const inputRef = useRef<HTMLInputElement>(null)

  let embedUrl = ""

  const r = (current.event as DoneEventObject).data

  if (current.matches("loadGoogleMapsLinks")) {
    const query = encodeURIComponent(
      `${r.centroDeVotacion} ${r.direccion} ${r.pueblo}`
    )

    embedUrl = EMBED_LINK_BASE + query
  }

  return (
    <>
      <Typography
        id="tu-centro-de-votacion"
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
          className="h-12 border-primary border-2 rounded-md p-4 mr-6"
          placeholder="Número Electoral"
        />

        <Button
          onClick={() => send("submit", { voterId: inputRef.current?.value })}
          disabled={current.matches("fetchingVoterDetails")}
          className="uppercase pl-8 pr-8"
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
        <div className="flex flex-col items-center">
          <Typography
            tag="h4"
            variant="h4"
            weight="base"
            className="font-bold mt-2"
          >
            Dirección
          </Typography>
          <section className="text-center">
            <Typography
              tag="p"
              variant="p"
              weight="base"
              className="font-normal mt-1"
            >
              {r.centroDeVotacion}
            </Typography>
            <Typography
              tag="p"
              variant="p"
              weight="base"
              className="font-normal mt-1"
            >
              {r.direccion}
            </Typography>
            <Typography
              tag="p"
              variant="p"
              weight="base"
              className="font-normal mt-1"
            >
              {r.pueblo}
            </Typography>
          </section>
          <iframe
            className="mt-16"
            title="Directions to voter center"
            src={embedUrl}
            width="100%"
            height="400"
          />
        </div>
      ) : null}
    </>
  )
}
