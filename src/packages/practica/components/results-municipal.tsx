import React from "react"
import { Typography } from "../../../components"
import { MunicipalVotesCount } from "../services/ballot-configs"

type StateResultsProps = {
  votesCount: MunicipalVotesCount
}

export default function ResultsMunicipal(props: StateResultsProps) {
  const votes = props.votesCount

  return (
    <div>
      <Typography tag="p" variant="p" className="text-white">
        {votes.mayor} a Alcalde(sa)
      </Typography>
      <Typography tag="p" variant="p" className="text-white">
        {votes.municipalLegislators} candidato(a) a Legisladores(as) municipales
      </Typography>
    </div>
  )
}
