import React from "react"
import { Typography } from "../../../components"
import { StateVotesCount } from "../services/ballot-configs"

type StateResultsProps = {
  votesCount: StateVotesCount
}

export default function ResultsState(props: StateResultsProps) {
  const votes = props.votesCount

  return (
    <div>
      <Typography tag="p" variant="p" className="text-white">
        {votes.governor} candidato(a) a Gobernador(a)
      </Typography>
      <Typography tag="p" variant="p" className="text-white">
        {votes.commissionerResident} candidato(a) a Comisionado(a) Residente
      </Typography>
    </div>
  )
}
