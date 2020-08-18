import React from "react"

import { Typography } from "../../../components/index"
import ValidSign from "../../../assets/images/valid-sign-illustration.svg"

export default function MakeYourVoteCount() {
  return (
    <>
      <Typography tag="h2" variant="h3" className="uppercase">
        Haz que tu voto cuente
      </Typography>
      <Typography
        tag="h3"
        variant="h2"
        weight="base"
        className="font-normal mt-4"
      >
        Conoce los distintos tipos de votos que puedes ejercer el día de las
        elecciones
      </Typography>
      <div className="flex justify-center mt-8">
        <img className="w-78" src={ValidSign} alt="" />
      </div>
      <Typography tag="p" variant="p" className="mt-6">
        Solo se contará como marca válida la equis “X”— que esté dentro de un
        rectángulo en blanco. <br /> No se contará la que esté encima del nombre
        de un candidato o la que esté sobre su foto.
      </Typography>
    </>
  )
}
