import React from "react"

import { Button, Typography, Link } from "../../../components"

type BallotFinderPickerProps = {
  selectVoterId: () => void
  selectPrecint: () => void
}

export default function BallotFinderPicker(props: BallotFinderPickerProps) {
  return (
    <div className="mx-auto mt-8 lg:w-3/4">
      <Typography tag="p" variant="h3" className="uppercase">
        Busquemos tus papeletas
      </Typography>
      <Typography tag="p" variant="p" className="mt-1">
        Selecciona una de las siguientes maneras para ver tus papeletas
      </Typography>
      <Typography className="mt-4" tag="p" variant="p">
        Si su pueblo tiene más de un precinto y usted no conoce a cuál precinto
        pertenece puede ir a{" "}
        <Link to="https://consulta.ceepur.org/" target="_blank">
          Consulta CEE
        </Link>
        , entrar su número electoral, presionar el botón de buscar y usar el
        número que aparece en el encasillado de Precinto.
      </Typography>
      <div className="grid grid-cols-1 gap-4 mt-6 lg:grid-cols-2">
        <div className="w-full my-1">
          <Button className="block w-full" onClick={props.selectPrecint}>
            Número de precinto o pueblo
          </Button>
        </div>
        <div className="w-full my-1">
          <Button className="block w-full" onClick={props.selectVoterId}>
            Número de tarjeta electoral
          </Button>
        </div>
      </div>
    </div>
  )
}
