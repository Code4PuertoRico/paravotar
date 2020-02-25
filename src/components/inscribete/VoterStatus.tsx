import React from "react"

import Typography from "../typography"
import Link from "../link"
import BrowserExample from "../../assets/images/browser-example.png"

export function VoterStatus() {
  return (
    <>
      <div className="text-center">
        <Typography variant="h3" className="uppercase">
          Verifica el estatus de tu registro electoral
        </Typography>
        <Typography variant="h2" weight="base" className="font-normal mt-4">
          Revisa cuál es tu centro de votación junto con su dirección y el
          estatus de tu tarjeta electoral.
        </Typography>
      </div>
      <div className="flex flex-wrap mt-12">
        <div className="w-full lg:w-1/2">
          <img src={BrowserExample} alt="Website Example" />
        </div>
        <div className="w-full lg:mt-3 lg:w-1/2">
          <Typography variant="h3">¿Por que es importante?</Typography>
          <Typography variant="p" className="mt-4">
            Es de suma importancia verificar el estatus de tu tarjeta electoral
            para que pueda ejercer su voto el día de las elecciones. Si su
            tarjeta electoral no esta activa debe visitar la Junta de
            Inscripción Permanente más cercana para activarla.
          </Typography>
          <Typography variant="p" className="mt-4">
            Si se ha mudado recientemente es importante renovar su tarjeta
            electoral para ejercer su voto en la localización actual.
          </Typography>
          <Link
            className="mt-6"
            variant="primary"
            to="http://ww2.ceepur.org/es-pr/Paginas/Estatus-del-Elector.aspx"
            target="_blank"
          >
            Verificar mi status
          </Link>
        </div>
      </div>
    </>
  )
}
