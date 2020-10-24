import React from "react"
import { Typography } from "../../../components"
import { LegislativeVotesCount } from "../services/ballot-configs"

type LegislativeResultProps = {
  votesCount: LegislativeVotesCount
}

export default function ResultsLegislative(props: LegislativeResultProps) {
  return (
    <div>
      <Typography tag="p" variant="p" className="text-white">
        {props.votesCount.districtRepresentative} candidato(a) a Representante
        por Distrito
      </Typography>
      <Typography tag="p" variant="p" className="text-white">
        {props.votesCount.districtSenators} candidato(a) a Senador por Distrito
      </Typography>
      <Typography tag="p" variant="p" className="text-white">
        {props.votesCount.atLargeRepresentative} candidato(a) a Representante
        por Acumulación
      </Typography>
      <Typography tag="p" variant="p" className="text-white">
        {props.votesCount.atLargeSenator} candidato(a) a Senador por Acumulación
      </Typography>
    </div>
  )
}
