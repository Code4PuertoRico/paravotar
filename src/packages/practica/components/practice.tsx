import React, { useRef } from "react"
import { useMachine } from "@xstate/react"

import {
  GovernmentalBallot,
  LegislativeBallot,
  MunicipalBallot,
} from "../../generate-ballot/components"
import Switch from "../../../components/switch"
import Case from "../../../components/case"
import Default from "../../../components/default"
import { Button, Card, Typography } from "../../../components/index"
import { practiceMachine } from "../machines/practice"

export default function Practice() {
  const [state, send] = useMachine(practiceMachine)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Card>
      <Switch state={state}>
        <Case value="enterVoterId">
          <div className="mx-auto lg:w-1/3">
            <Typography tag="p" variant="h4">
              Entre su número electoral
            </Typography>
            <form
              className="mt-4"
              onSubmit={() =>
                send("FIND_VOTER_ID", {
                  voterId: inputRef.current ? inputRef.current.value : "",
                })
              }
            >
              <input
                className="border border-primary px-3 py-2 rounded w-full"
                type="text"
                ref={inputRef}
                placeholder="Número electoral"
              />
              <Button className="mt-2 block w-full">Continuar</Button>
            </form>
            <p className="text-xs italic mt-2">
              * La utilización de su número electoral es solo para propósitos de
              práctica, paravotar.org no guarda ninguna información personal de
              usuarios que utilicen la página web.
            </p>
          </div>
        </Case>
        <Case value="findingVoterId">
          <div>Loading...</div>
        </Case>
        <Case value="selectBallot">
          <div className="mx-auto lg:w-1/3">
            <Typography tag="p" variant="h4">
              Escoge por cuál papeleta comenzar
            </Typography>
            <Button
              className="w-full block mt-4 mb-2"
              onClick={() => send("SELECTED_GOVERNMENTAL")}
            >
              Estatal
            </Button>
            <Button
              className="w-full block my-2"
              onClick={() => send("SELECTED_LEGISLATIVA")}
            >
              Legislativa
            </Button>
            <Button
              className="w-full block my-2"
              onClick={() => send("SELECTED_MUNICIPAL")}
            >
              Municipal
            </Button>
          </div>
        </Case>
        <Case value="governmental">
          <div className="overflow-scroll">
            <GovernmentalBallot
              path="/papeletas/2016/gobernador-y-comisionado-residente"
              structure={state.context.ballots.estatal}
              votes={[]}
            />
          </div>
        </Case>
        <Case value="legislative">
          <div className="overflow-scroll">
            <LegislativeBallot
              path="/papeletas/2016/gobernador-y-comisionado-residente"
              structure={state.context.ballots.legislativa}
              votes={[]}
            />
          </div>
        </Case>
        <Case value="municipal">
          <div className="overflow-scroll">
            <MunicipalBallot
              path="/papeletas/2016/gobernador-y-comisionado-residente"
              structure={state.context.ballots.municipal}
              votes={[]}
            />
          </div>
        </Case>
        <Default>Shit</Default>
      </Switch>
    </Card>
  )
}
