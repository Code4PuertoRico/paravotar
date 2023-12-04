import { useRef } from "react"
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
    <div className="mx-auto mt-4 lg:mt-0">
      <Typography tag="p" variant="h4">
        Busquemos tus papeletas
      </Typography>
      <Typography tag="p" variant="p" className="mt-4">
        Su número electoral solo se utiliza para buscar su número de precinto.{" "}
        <br /> Para Votar no guarda información de los usuarios que utilicen la
        página.
      </Typography>
      <form
        className="mt-4"
        onSubmit={(event) => {
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
        <label htmlFor="voter-id" className="font-bold text-left mb-2 block">
          Número electoral
          <input
            id="voter-id"
            className="border border-primary px-3 py-2 rounded w-full"
            type="number"
            ref={inputRef}
            placeholder="Entre su número electoral"
          />
        </label>
        {props.errorMessage ? (
          <InputErrorMessage>
            Favor entre un número electoral.
          </InputErrorMessage>
        ) : (
          <div className="h-4"></div>
        )}
        <Button className="mt-4 block w-full" data-testid="confirm-voter-id">
          Continuar
        </Button>
      </form>
    </div>
  )
}
