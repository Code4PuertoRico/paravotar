import React, { useRef } from "react"
import { Button, Typography } from "../../../components"
import { FindByType } from "../services/ballot-finder-service"
import InputErrorMessage from "./input-error-message"

type EnterVoterIdFormProps = {
  errorMessage: string | null
  onSubmit: ({
    userInput,
    findBy,
  }: {
    userInput: string
    findBy: FindByType.voterId
  }) => void
}

export default function EnterVoterIdForm(props: EnterVoterIdFormProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="mx-auto mt-4 lg:mt-0 lg:w-1/2">
      <Typography tag="p" variant="h4">
        Busquemos tus papeletas
      </Typography>
      <Typography tag="p" variant="p">
        Entre su número electoral
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
            findBy: FindByType.voterId,
          })
        }}
      >
        <input
          className="border border-primary px-3 py-2 rounded w-full"
          type="number"
          ref={inputRef}
          placeholder="Número electoral"
        />
        {props.errorMessage ? (
          <InputErrorMessage>
            Favor entre un número electoral.
          </InputErrorMessage>
        ) : (
          <div className="h-4"></div>
        )}
        <Button className="mt-4 block w-full">Continuar</Button>
      </form>
      <p className="text-xs italic mt-2">
        * La utilización de su número electoral es solo para propósitos de
        práctica, paravotar.org no guarda ninguna información personal de
        usuarios que utilicen la página web.
      </p>
    </div>
  )
}
