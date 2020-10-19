import React, { useRef, useState } from "react"
import Dropdown from "react-dropdown-aria"

import { Button, Link, Typography } from "../../../components"
import { precintList } from "../constants"
import { FindByType } from "../services/ballot-finder-service"

const style: { [key: string]: any } = {
  DropdownButton: (base: any, { open }: any) => ({
    ...base,
    backgroundColor: "white",
    borderColor: open ? "#292936" : "#cacad9",
    "&:hover": {
      borderColor: open ? "#292936" : "#cacad9",
    },

    "&:focus": {
      borderColor: open ? "#292936" : "#cacad9",
    },
  }),
  OptionContainer: (base: any) => ({
    ...base,
    marginTop: 8,
    backgroundColor: "white",
    borderColor: "#cacad9",
    borderWidth: 1,
    borderRadius: 6,
    boxShadow: "0px 3px 10px #cacad9",
  }),
  OptionItem: (base: any) => {
    return {
      ...base,
      backgroundColor: "white",
      color: "#292936",
      paddingTop: 8,
      paddingBottom: 8,
      "&:hover": {
        backgroundColor: "#ebebff",
      },
    }
  },
}

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
  const [selectedTown, setSelectedTown] = useState(precintList[0].value)

  return (
    <div className="mx-auto mt-4 lg:mt-0 lg:w-1/2">
      <Typography tag="p" variant="h4">
        Busquemos tus papeletas
      </Typography>
      <Typography tag="p" variant="p">
        Escoja su pueblo y número de precinto
      </Typography>
      <form
        className="mt-4"
        onSubmit={event => {
          event.preventDefault()

          const result = precintList.find(p => p.value === selectedTown)

          props.onSubmit({
            userInput: (result && result.precint) || "",
            findBy: FindByType.precint,
          })
        }}
      >
        <Dropdown
          placeholder="Pueblo"
          id="dropdown"
          searchable={true}
          options={precintList}
          selectedOption={selectedTown}
          setSelected={(t: string) => setSelectedTown(t)}
          style={style}
        />
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
