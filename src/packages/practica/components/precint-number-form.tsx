import React, { useRef } from "react"

import { Button, Link, Typography } from "../../../components"
import { FindByType } from "../services/ballot-finder-service"
import InputErrorMessage from "./input-error-message"

type PrecintNumberFormProps = {
  errorMessage: string | null
  onSubmit: ({
    userInput,
    findBy,
  }: {
    userInput: string
    findBy: FindByType.precint
  }) => void
}

export default function PrecintNumberForm(props: PrecintNumberFormProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="mx-auto lg:w-1/2">
      <Typography tag="p" variant="h4">
        Busquemos tus papeletas
      </Typography>
      <Typography tag="p" variant="p">
        Entre el número de precinto de su pueblo
      </Typography>
      <form
        className="mt-4"
        onSubmit={event => {
          event.preventDefault()

          const input =
            inputRef.current && inputRef.current.value
              ? inputRef.current.value
              : ""

          props.onSubmit({
            userInput: input.replace("e", ""),
            findBy: FindByType.precint,
          })
        }}
      >
        <input
          className="border border-primary px-3 py-2 rounded w-full"
          type="number"
          ref={inputRef}
          placeholder="Número de precinto"
        />
        {props.errorMessage ? (
          <InputErrorMessage>{props.errorMessage}</InputErrorMessage>
        ) : (
          <div className="h-4"></div>
        )}
        <Button className="mt-4 block w-full">Continuar</Button>
      </form>
      <Typography tag="p" variant="p" className="text-xs italic mt-2">
        Para encontrar su número de precinto debe ir a{" "}
        <Link to="https://consulta.ceepur.org/" target="_blank">
          Consulta CEE
        </Link>
        , entrar su número electoral, presionar el botón de Buscar y usar el
        número que aparece en el encasillado de Precinto.
      </Typography>
    </div>
  )
}
