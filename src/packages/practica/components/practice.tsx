import React, { useRef } from "react"
import { useMachine } from "@xstate/react"

import { Button, Card, Link, Typography } from "../../../components/index"
import BallotValidator from "../../../ballot-validator/index"
import { BallotType } from "../../../ballot-validator/types"
import { Ballot } from "../../generate-ballot/components"
import Default from "../../../components/default"
import Switch from "../../../components/switch"
import Case from "../../../components/case"
import { VotesCoordinates } from "../../generate-ballot/types/ballot-machine"
import { practiceMachine } from "../machines/practice"

import useVoteCoordinates from "../hooks/use-vote-coordinates"
import coordinatesToSections from "../services/coordinates-to-sections"
import { BallotConfigs } from "../services/ballot-configs"
import { useSidebar } from "../../../context/sidebar-context"
import BallotStatus from "./ballot-status"
import useVotesTransform from "../hooks/use-votes-transform"
import useBallotValidation from "../hooks/use-ballot-validation"
import useVotesCount from "../hooks/use-votes-count"
import { towns } from "../services/constants"
import Dropdown from "react-dropdown-aria"
import { FindByType } from "../services/ballot-finder-service"

const convertedTowns = towns.map(town => {
  return {
    areaLabel: town,
    title: town,
    value: town,
  }
})

export default function Practice() {
  const [state, send] = useMachine(practiceMachine)
  const inputRef = useRef<HTMLInputElement>(null)
  const precintInputRef = useRef<HTMLInputElement>(null)
  const [votes, setVotes, setVotesToEmpty] = useVoteCoordinates()
  const transformedVotes = useVotesTransform(votes, state)
  const { ballotStatus, setBallotStatus } = useBallotValidation(
    transformedVotes
  )
  const { votesCount, setVotesCount } = useVotesCount(transformedVotes)
  const { setSidebarIsVisible } = useSidebar()
  const handleSubmit = (
    votes: VotesCoordinates[],
    ballotType: BallotType,
    ballot?: BallotConfigs
  ) => {
    const transformedVotes = coordinatesToSections(votes, ballot, ballotType)
    const test = BallotValidator(transformedVotes, ballotType)

    console.log({ test })
  }

  const selectBallot = (selectedBallot: string) => {
    setSidebarIsVisible(false)
    setVotesToEmpty()
    setBallotStatus(null)
    setVotesCount(null)

    send(selectedBallot)
  }

  return (
    <div>
      <Typography tag="h2" variant="h3" className="uppercase">
        Practica tu voto
      </Typography>
      <Typography
        tag="h3"
        variant="h2"
        weight="base"
        className="font-normal mt-4"
      >
        Pon en práctica lo aprendido cuantas veces necesites
      </Typography>
      <Card className="practice-card flex justify-center mt-8">
        <Switch state={state}>
          <Case value="ballotFinderPicker">
            <div>
              <Typography tag="p" variant="h3" className="uppercase">
                Busquemos tus papeletas
              </Typography>
              <Typography tag="p" variant="p" className="mt-1">
                Selecciona una de las siguientes maneras para ver tus papeletas
              </Typography>
              <div className="grid grid-cols-1 gap-2 mt-6 lg:grid-cols-2">
                <div className="w-full my-1">
                  <Button
                    className="block w-full"
                    onClick={() => send("SELECTED_VOTER_ID")}
                  >
                    Número de tarjeta electoral
                  </Button>
                </div>
                <div className="w-full my-1">
                  <Button
                    className="block w-full"
                    onClick={() => send("SELECTED_PRECINT")}
                  >
                    Número de precinto
                  </Button>
                </div>
              </div>
            </div>
          </Case>
          <Case value="enterPrecint">
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
                    precintInputRef.current && precintInputRef.current.value
                      ? precintInputRef.current.value
                      : ""

                  send("ADDED_PRECINT", {
                    userInput: input.replace("e", ""),
                    findBy: FindByType.precint,
                  })
                }}
              >
                <input
                  className="border border-primary px-3 py-2 rounded w-full"
                  type="number"
                  ref={precintInputRef}
                  placeholder="Número de precinto"
                />
                {state.matches({ enterPrecint: "empty" }) ? (
                  <Typography
                    tag="p"
                    variant="p"
                    className="italic text-xs text-red text-left mt-1"
                  >
                    Favor un número de precinto.
                  </Typography>
                ) : state.matches({ enterPrecint: "invalidLength" }) ? (
                  <Typography
                    tag="p"
                    variant="p"
                    className="italic text-xs text-red text-left mt-1"
                  >
                    Su precinto debe tener 3 caracteres o menos.
                  </Typography>
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
                , entrar su número electoral, presionar el botón de "Buscar" y
                usar el número que aparece en el encasillado de Precinto.
              </Typography>
            </div>
          </Case>
          <Case value="enterVoterId">
            <div className="mx-auto lg:w-1/2">
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

                  send("ADDED_VOTING_NUMBER", {
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
                {state.matches({ enterVoterId: "empty" }) ? (
                  <Typography
                    tag="p"
                    variant="p"
                    className="italic text-xs text-red text-left mt-1"
                  >
                    Favor entre un número electoral.
                  </Typography>
                ) : (
                  <div className="h-4"></div>
                )}
                <Button className="mt-4 block w-full">Continuar</Button>
              </form>
              <p className="text-xs italic mt-2">
                * La utilización de su número electoral es solo para propósitos
                de práctica, paravotar.org no guarda ninguna información
                personal de usuarios que utilicen la página web.
              </p>
            </div>
          </Case>
          <Case value="fetchBallots">
            <div>Loading...</div>
          </Case>
          <Case value="selectBallot">
            <div className="mx-auto lg:w-1/2">
              <Typography tag="p" variant="h4">
                Escoge por cuál papeleta comenzar
              </Typography>
              <Button
                className="w-full block mt-4 mb-2"
                onClick={() => selectBallot("SELECTED_GOVERNMENTAL")}
              >
                Estatal
              </Button>
              <Button
                className="w-full block my-2"
                onClick={() => selectBallot("SELECTED_LEGISLATIVE")}
              >
                Legislativa
              </Button>
              <Button
                className="w-full block my-2"
                onClick={() => selectBallot("SELECTED_MUNICIPAL")}
              >
                Municipal
              </Button>
            </div>
          </Case>
          <Case value="governmental">
            <div>
              {state.context.ballots.estatal ? (
                <>
                  <BallotStatus status={ballotStatus}>
                    <Typography tag="p" variant="p">
                      {votesCount?.governor} candidato(a) a Gobernador(a)
                    </Typography>
                    <Typography tag="p" variant="p">
                      {votesCount?.commissionerResident} candidato(a) a
                      Comisionado(a) Residente
                    </Typography>
                  </BallotStatus>
                  <div className="overflow-scroll">
                    <Ballot
                      type={BallotType.state}
                      structure={state.context.ballots.estatal.structure}
                      votes={votes}
                      toggleVote={setVotes}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      handleSubmit(
                        votes,
                        BallotType.state,
                        state.context.ballots.estatal
                      )
                    }}
                  >
                    Submit
                  </Button>
                </>
              ) : null}
            </div>
          </Case>
          <Case value="legislative">
            <div>
              {state.context.ballots.legislativa ? (
                <>
                  <BallotStatus status={ballotStatus}>
                    <Typography tag="p" variant="p">
                      {votesCount?.districtRepresentative} candidato(a) a
                      Representante por Distrito
                    </Typography>
                    <Typography tag="p" variant="p">
                      {votesCount?.districtSenators} candidato(a) a Senador por
                      Distrito
                    </Typography>
                    <Typography tag="p" variant="p">
                      {votesCount?.atLargeRepresentative} candidato(a) a
                      Representante por Acumulación
                    </Typography>
                    <Typography tag="p" variant="p">
                      {votesCount?.atLargeSenator} candidato(a) a Senador por
                      Acumulación
                    </Typography>
                  </BallotStatus>
                  <div className="overflow-scroll">
                    <Ballot
                      type={BallotType.legislative}
                      structure={state.context.ballots.legislativa.structure}
                      votes={votes}
                      toggleVote={setVotes}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      handleSubmit(
                        votes,
                        BallotType.legislative,
                        state.context.ballots.legislativa
                      )
                    }}
                  >
                    Submit
                  </Button>
                </>
              ) : null}
            </div>
          </Case>
          <Case value="municipal">
            <div>
              {state.context.ballots.municipal ? (
                <>
                  <BallotStatus status={ballotStatus}>
                    <Typography tag="p" variant="p">
                      {votesCount?.mayor} a Alcalde(sa)
                    </Typography>
                    <Typography tag="p" variant="p">
                      {votesCount?.municipalLegislators} candidato(a) a
                      Legisladores(as) municipales
                    </Typography>
                  </BallotStatus>
                  <div className="overflow-scroll">
                    <Ballot
                      type={BallotType.municipality}
                      structure={state.context.ballots.municipal.structure}
                      votes={votes}
                      toggleVote={setVotes}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      handleSubmit(
                        votes,
                        BallotType.municipality,
                        state.context.ballots.municipal
                      )
                    }}
                  >
                    Submit
                  </Button>
                </>
              ) : null}
            </div>
          </Case>
          <Default>Shit</Default>
        </Switch>
      </Card>
    </div>
  )
}
