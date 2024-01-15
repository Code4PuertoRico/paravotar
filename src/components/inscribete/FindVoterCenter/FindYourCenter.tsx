import { useRef } from "react"
import { DoneEventObject } from "xstate"
import { useMachine } from "@xstate/react"
import { useTranslation } from "react-i18next"

import Button from "../../button"
import Typography from "../../typography"
import { FindYourCenterMachine } from "./findYourCenterMachine"
import Link from "../../link"

const EMBED_LINK_BASE =
  "https://maps.google.com/maps?t=&z=13&ie=UTF8&iwloc=&output=embed&q="

export const FindYourCenter = () => {
  const { t } = useTranslation()
  const [current, send] = useMachine(FindYourCenterMachine)

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
        className="font-normal mt-4 text-center"
      >
        {t("site.enter-voter-id")}
      </Typography>

      <section className="flex flex-col items-center md:flex-row md:justify-center mt-4 mb-8">
        <input
          type="text"
          ref={inputRef}
          className="h-12 border-primary border-2 rounded-md p-4 md:mr-6 mb-6 md:mb-0"
          placeholder={t("site.enter-voter-id-placeholder")}
          onKeyPress={(event) => {
            if (event.keyCode == 13 || event.which == 13) {
              event.preventDefault()
              send("submit", { voterId: inputRef.current?.value })
            }
          }}
        />

        <Button
          onClick={() => send("submit", { voterId: inputRef.current?.value })}
          disabled={current.matches("fetchingVoterDetails")}
          className="uppercase pl-8 pr-8 h-12"
        >
          {t("site.voter-id-cta")}
        </Button>
      </section>
      <Typography
        tag="p"
        variant="p"
        weight="base"
        className="font-normal text-sm mt-2 text-center"
      >
        * paravotar.org no almacena ni tiene información de los votantes.
      </Typography>
      <Typography
        tag="p"
        variant="p"
        weight="base"
        className="font-normal text-sm text-center"
      >
        Toda la información proviene de la{" "}
        <Link to="http://consulta.ceepur.org">CEE</Link>.
      </Typography>

      {current.matches("failure") ? (
        <>
          <Typography
            tag="h4"
            variant="h4"
            weight="base"
            className="font-normal mt-8 text-red text-center"
          >
            {t("site.voter-id-error-1")}
          </Typography>
          <Typography
            tag="h4"
            variant="h4"
            weight="base"
            className="font-normal mt-2 text-red text-center"
          >
            {t("site.voter-id-error-2")}
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
            {t("site.voter-id-results-address-title")}
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
            title={t("site.voter-id-results-iframe-title")}
            src={embedUrl}
            width="100%"
            height="400"
          />
        </div>
      ) : null}
    </>
  )
}
