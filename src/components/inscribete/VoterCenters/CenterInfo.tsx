import React from "react"

import i18next from "i18next"
import { animated, useSpring } from "react-spring"

import { Town } from "../types"
import { Link } from "../../../components/index"
import Location from "../../../assets/icons/location.inline.svg"
// import Phone from "../../../assets/icons/phone.inline.svg"

interface CenterInfoProps {
  town: Town
}

const TownInfo: React.FunctionComponent<{ town: Required<Town> }> = ({
  town,
}) => (
  <>
    <div>
      {/* <div className="text-base md:text-xl">
        <p className="font-semibold pr-12 align-top">Nombre</p>
        <p>{town.pueblo}</p>
      </div> */}
      {/* <div className="text-base md:text-xl pt-6">
        <p className="font-semibold pr-12 align-top">Dirección</p>
        <p>{town.direccion}</p>
      </div> */}
      <div className="flex text-base md:text-xl">
        <p className="font-bold pr-12 align-top w-1/4">Dirección</p>
        <p className="w-3/4">{town.direccion}</p>
      </div>
      {/* <div className="flex text-base md:text-xl pt-6">
        <p className="font-bold pr-12 align-top w-1/4">Teléfono</p>
        <p className="w-3/4">{town.telefono}</p>
      </div> */}
      <div className="flex text-base md:text-xl pt-6">
        <p className="font-bold pr-12 align-top w-1/4">Horario</p>
        <p className="w-3/4">
          {i18next.t("site.enrollment-centers-dates")} <br /> 8:00 am - 4:00 pm
        </p>
      </div>
      <div className="flex text-base md:text-xl pt-6">
        <p className="font-bold pr-12 align-top w-1/4">Servicios</p>
        <p className="w-3/4">
          {i18next.t("site.enrollment-centers-services")}
          {/* {town.servicios.map(s => (
            <span key={s} className="block">
              {s}
            </span>
          ))} */}
        </p>
      </div>
    </div>
    {/* {town.JIPIsla ? ( */}
    <p className="mt-4">{i18next.t("site.enrollment-centers-note")}</p>
    {/* ) : null} */}
    <div className="mt-8">
      <Link
        className="w-full text-center"
        to={town.googleMapsLink}
        target="_blank"
        variant="primary"
      >
        <Location className="mr-1 h-5 w-5" /> {i18next.t("site.location")}
        <span className="sr-only">
          para esta Junta de Inscripción Permanente
        </span>
      </Link>
    </div>
    {/* <div className="mt-4">
      <Link
        className="w-full text-center"
        to={`tel:${town.telefono}`}
        variant="inverse"
      >
        <Phone className="mr-1 h-5 w-5" /> Llamar para mas información
        <span className="sr-only">
          sobre esta Junta de Inscripción Permanente
        </span>
      </Link>
    </div> */}
  </>
)

export const CenterInfo: React.FunctionComponent<CenterInfoProps> = ({
  town,
}) => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } })

  if (!town.locations) {
    return (
      <animated.div
        className="flex flex-col p-4 border-t border-separator justify-center w-full lg:ml-12 lg:m-0 lg:border-t-0"
        style={props}
      >
        <TownInfo town={town as Required<Town>} />
      </animated.div>
    )
  } else {
    return (
      <div className="border-t border-separator p-4 w-full overflow-y-auto lg:ml-12 lg:m-0 lg:border-t-0">
        <animated.div
          className="flex flex-col justify-center w-full"
          style={props}
        >
          {town.locations
            .sort((a, b) => {
              if (a.JIPIsla) {
                return -1
              } else if (b.JIPIsla) {
                return 1
              }

              return 0
            })
            .map((t, i) => (
              <div
                key={`town-${i}`}
                className="pt-10 pb-10 border-b border-separator last:border-b-0"
              >
                <TownInfo town={t as Required<Town>} />
              </div>
            ))}
        </animated.div>
      </div>
    )
  }
}
