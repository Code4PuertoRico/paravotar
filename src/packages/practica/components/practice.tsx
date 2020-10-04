import React, { ReactNode, useRef } from "react"
import { useMachine } from "@xstate/react"

import { Button, Card, Typography } from "../../../components/index"
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

function BallotStatus({ children }: { children: ReactNode }) {
  return (
    <div>
      <Typography tag="h3" variant="h3" className="mb-4">
        Para esta papeleta usted puede votar por...
      </Typography>
      {children}
      <hr className="mt-2" />
      <Typography tag="p" variant="p" className="text-xs italic mt-2 mb-6">
        *Para ver otros partidos realiza un scroll hacia tu derecha y para ver
        más candidatos realiza scroll hacia abajo.
      </Typography>
    </div>
  )
}

export default function Practice() {
  const [state, send] = useMachine(practiceMachine)
  const inputRef = useRef<HTMLInputElement>(null)
  const [stateVotes, setStateVotes] = useVoteCoordinates()
  const [legislativeVotes, setLegislativeVotes] = useVoteCoordinates()
  const [municipalVotes, setMunicipalVotes] = useVoteCoordinates()
  const { setSidebarIsVisible } = useSidebar()
  const handleSubmit = (
    ballot: BallotConfigs,
    votes: VotesCoordinates[],
    ballotType: BallotType
  ) => {
    console.log({ votes })

    const transformedVotes = coordinatesToSections(votes, ballot, ballotType)

    console.log({ transformedVotes })

    const test = BallotValidator(transformedVotes, ballotType)

    console.log({ test })
  }

  const selectBallot = (selectedBallot: string) => {
    setSidebarIsVisible(false)

    send(selectedBallot)
  }

  console.log(state.context.ballots)

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
                <BallotStatus>
                  <Typography tag="p" variant="p">
                    0/
                    {state.context.ballots.estatal.votesForGovernor}{" "}
                    candidato(a) a Gobernador(a)
                  </Typography>
                  <Typography tag="p" variant="p">
                    0/
                    {
                      state.context.ballots.estatal.votesForCommissionerResident
                    }{" "}
                    candidato(a) a Comisionado(a) Residente
                  </Typography>
                </BallotStatus>
                <div className="overflow-scroll">
                  <Ballot
                    type={BallotType.state}
                    structure={state.context.ballots.estatal.structure}
                    votes={stateVotes}
                    toggleVote={setStateVotes}
                  />
                </div>
                <Button
                  onClick={() => {
                    handleSubmit(
                      state.context.ballots.estatal,
                      stateVotes,
                      BallotType.state
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
                <BallotStatus>
                  <Typography tag="p" variant="p">
                    0/
                    {
                      state.context.ballots.legislativa
                        .votesForDistrictRepresentatives
                    }{" "}
                    candidato(a) a Representante por Distrito
                  </Typography>
                  <Typography tag="p" variant="p">
                    0/
                    {
                      state.context.ballots.legislativa.votesForDistrictSenators
                    }{" "}
                    candidato(a) a Senador por Distrito
                  </Typography>
                  <Typography tag="p" variant="p">
                    0/
                    {
                      state.context.ballots.legislativa
                        .votesForAtLargeRepresentatives
                    }{" "}
                    candidato(a) a Representante por Acumulación
                  </Typography>
                  <Typography tag="p" variant="p">
                    0/
                    {
                      state.context.ballots.legislativa.votesForAtLargeSenators
                    }{" "}
                    candidato(a) a Senador por Acumulación
                  </Typography>
                </BallotStatus>
                <div className="overflow-scroll">
                  <Ballot
                    type={BallotType.legislative}
                    structure={state.context.ballots.legislativa.structure}
                    votes={legislativeVotes}
                    toggleVote={setLegislativeVotes}
                  />
                </div>
                <Button
                  onClick={() => {
                    handleSubmit(
                      state.context.ballots.legislativa,
                      legislativeVotes,
                      BallotType.legislative
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
                <BallotStatus>
                  <Typography tag="p" variant="p">
                    0/
                    {state.context.ballots.municipal.votesForMayor} candidato(a)
                    a Alcalde(sa)
                  </Typography>
                  <Typography tag="p" variant="p">
                    0/
                    {state.context.ballots.municipal.legislators} candidato(a) a
                    Legisladores(as) municipales
                  </Typography>
                </BallotStatus>
                <div className="overflow-scroll">
                  <Ballot
                    type={BallotType.municipality}
                    structure={state.context.ballots.municipal.structure}
                    votes={municipalVotes}
                    toggleVote={setMunicipalVotes}
                  />
                </div>
                <Button
                  onClick={() => {
                    handleSubmit(
                      state.context.ballots.municipal,
                      municipalVotes,
                      BallotType.municipality
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
  )
}
