import { useState } from "react";

import { Button, Link, Typography } from "../../../components";
import { precintList } from "../constants";
import { FindByType } from "../services/ballot-finder-service";
import Dropdown from "../../../components/button-dropdown";

type PrecintNumberFormProps = {
  errorMessage: string | null;
  onSubmit: ({
    userInput,
    findBy,
  }: {
    userInput: string;
    findBy: FindByType.precint;
  }) => void;
};

export default function PrecintNumberForm(props: PrecintNumberFormProps) {
  const [selectedTown, setSelectedTown] = useState(precintList[0].value);

  return (
    <div className="mx-auto mt-4 lg:mt-0 lg:w-3/4">
      <Typography tag="p" variant="h4">
        Busquemos tus papeletas
      </Typography>
      <Typography tag="p" variant="p" className="mt-4">
        Si su pueblo tiene más de un precinto y usted no conoce a cuál precinto
        pertenece puede ir a{" "}
        <Link to="https://consulta.ceepur.org/" target="_blank">
          Consulta CEE
        </Link>
        , entrar su número electoral, presionar el botón de Buscar y usar el
        número que aparece en el encasillado de Precinto.
      </Typography>
      <form
        className="mt-4"
        onSubmit={(event) => {
          event.preventDefault();

          const result = precintList.find((p) => p.value === selectedTown);

          props.onSubmit({
            userInput: (result && result.precint) || "",
            findBy: FindByType.precint,
          });
        }}
      >
        <div className="font-bold text-left mb-2 block">
          Pueblo y número de precinto
        </div>
        <Dropdown
          options={precintList}
          selectedOption={selectedTown}
          onSelect={(option) => setSelectedTown(option)}
        />
        <Button className="mt-4 block w-full" data-testid="confirm-precint">
          Continuar
        </Button>
      </form>
    </div>
  );
}
