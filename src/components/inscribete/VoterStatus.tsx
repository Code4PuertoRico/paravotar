import React from "react"

import Typography from "../typography"
import Link from "../link"
import BrowserExample from "../../assets/images/browser-example.png"
import OutsideLink from "../../assets/icons/outside-link.inline.svg"

export function VoterStatus() {
  return (
    <>
      <div className="text-center">
        <Typography
          id="electoral-status"
          tag="h2"
          variant="h3"
          className="uppercase tracking-wide"
        >
          Verifica el estatus de tu registro electoral
        </Typography>
        <Typography
          tag="h3"
          variant="h2"
          weight="base"
          className="font-normal mt-4"
        >
          Revisa cuál es tu centro de votación junto con su dirección y el
          estatus de tu tarjeta electoral.
        </Typography>
      </div>
      <div className="flex flex-wrap mt-12">
        <div className="w-full lg:w-1/2">
          <img className="mx-auto" src={BrowserExample} alt="" />
        </div>
        <div className="w-full lg:mt-3 lg:w-1/2">
          <Typography tag="h4" variant="h3">
            ¿Por que es importante?
          </Typography>
          <Typography tag="p" variant="p" className="mt-4">
            Es de suma importancia que verifiques el estatus de tu tarjeta
            electoral para que pueda ejercer tu voto el día de las elecciones.
            Si tu tarjeta electoral no esta activa debes visitar la Junta de
            Inscripción Permanente más cercana para activarla.
          </Typography>
          <Typography tag="p" variant="p" className="mt-4">
            Si te has mudado recientemente es importante renovar tu tarjeta
            electoral para ejercer tu voto en el municipio y Centro de Votación
            correspondiente.
          </Typography>
          <Link
            className="mt-6 w-full pt-2 pb-2 md:w-1/2"
            variant="primary"
            to="http://ww2.ceepur.org/es-pr/Paginas/Estatus-del-Elector.aspx"
            target="_blank"
          >
            <OutsideLink className="mr-2 h-5 w-5" /> Verificar mi status
            <span className="sr-only">electoral</span>
          </Link>
          <Typography tag="p" variant="p" className="mt-2 text-xs">
            Este enlace te llevará a la página de la Comisión Estatal de
            Elecciones. Allí podrás llenar el formulario que te dirá cuál es el
            estatus de tu registro electoral.
          </Typography>
        </div>
      </div>
    </>
  )
}
