import React, { useRef } from "react"
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
import BallotStatus from "./ballot-status"
import useVotesTransform from "../hooks/use-votes-transform"
import useBallotValidation from "../hooks/use-ballot-validation"

export default function Practice() {
  const [state, send] = useMachine(practiceMachine)
  const inputRef = useRef<HTMLInputElement>(null)
  const [votes, setVotes, setVotesToEmpty] = useVoteCoordinates()
  const transformedVotes = useVotesTransform(votes, state)
  const { ballotStatus, setBallotStatus } = useBallotValidation(
    transformedVotes
  )
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

    send(selectedBallot)
  }

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
                <BallotStatus status={ballotStatus}>
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
  )
}
