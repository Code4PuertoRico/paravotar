import { template } from "lodash"
import React from "react"
import detector from "../../../ballot-validator/detector"
import { BallotType } from "../../../ballot-validator/types"
import { Button, Typography } from "../../../components"
import useVotesCount from "../hooks/use-votes-count"
import useVotesTransform from "../hooks/use-votes-transform"
import {
  LegislativeVotesCount,
  MunicipalVotesCount,
  StateVotesCount,
} from "../services/ballot-configs"
import { GeneratePDF } from "./GeneratePDF"
import ResultsLegislative from "./results-legislative"
import ResultsMunicipal from "./results-municipal"
import ResultsState from "./results-state"

interface ResultsProps {
  state: any
  send: any
}

const keysConfig: { [key: string]: string[] } = {
  [BallotType.state]: ["governor", "commissionerResident"],
  [BallotType.municipality]: ["mayor", "municipalLegislators"],
  [BallotType.legislative]: [
    "districtRepresentative",
    "districtSenators",
    "atLargeRepresentative",
    "atLargeSenator",
  ],
}

const keyDescription: { [key: string]: string } = {
  governor: "candidato(a) a Gobernador(a)",
  commissionerResident: "candidato(a) a Comisionado(a) Residente",
  districtRepresentative: "candidato(a) a Representante por Distrito",
  districtSenators: "candidato(a) a Senador por Distrito",
  atLargeRepresentative: "candidato(a) a Representante por Acumulación",
  atLargeSenator: "candidato(a) a Senador por Acumulación",
  mayor: "a Alcalde(sa)",
  municipalLegislators: "candidato(a) a Legisladores(as) municipales",
}

const typeOfVoteConfig: {
  [key: string]: { short: any; long: string }
} = {
  integro: {
    short: template(
      "Usted finalizo la papeleta <%= ballotType %> llevando a cabo un voto integro."
    ),
    long:
      "El voto íntegro será válido cuando se haga una sola marca dentro del rectángulo en blanco bajo la insignia del partido político de preferencia, y no se hagan más marcas en la papeleta.",
  },
  mixto: {
    short: template(
      "Usted finalizo la papeleta <%= ballotType %> llevando a cabo un voto mixto."
    ),
    long:
      "El voto mixto será válido cuando la persona votante coloque una marca válida o equis “X” dentro del rectángulo en blanco que está debajo de la insignia del partido político de preferencia, coloque al menos una equis “X” dentro del rectángulo en blanco que está al lado de un candidato(a) dentro de la columna de esa insignia y coloque también otra equis “X” dentro del rectángulo en blanco al lado de cualquier candidato en la columna de otro partido o candidato independiente.",
  },
  candidatura: {
    short: template(
      "Usted finalizo la papeleta <%= ballotType %> llevando a cabo un voto por candidatura."
    ),
    long:
      "Los votos por candidatura serán válidos cuando se haga una marca válida dentro del rectángulo en blanco al lado del nombre de cada candidato o candidata de su preferencia, o cuando se escriba el nombre completo de un candidato en el encasillado de la columna de nominación directa. Las nominaciones directas también requiren que se haga una marca válida dentro del rectángulo en blanco al lado de cada nombre escrito.",
  },
}

const ballotTypeToString: { [key: string]: string } = {
  [BallotType.state]: "estatal",
  [BallotType.legislative]: "legislativa",
  [BallotType.municipality]: "municipal",
}

export const Results: React.FunctionComponent<ResultsProps> = ({
  state,
  send,
}) => {
  const { context } = state
  const transformedVotes = useVotesTransform(context.votes, state)
  const typeOfVote =
    transformedVotes && detector(transformedVotes.votes, context.ballotType)
  const { votesCount } = useVotesCount(transformedVotes)
  const ballotType = context.ballotType
  const votes = context.votes

  return (
    <div className="mx-auto lg:w-3/4">
      {ballotType === BallotType.state && votesCount ? (
        <ResultsState
          votesCount={votesCount as StateVotesCount}
          votes={votes}
          inverse
        />
      ) : ballotType === BallotType.municipality && votesCount ? (
        <ResultsMunicipal
          votesCount={votesCount as MunicipalVotesCount}
          votes={votes}
          inverse
        />
      ) : ballotType === BallotType.legislative && votesCount ? (
        <ResultsLegislative
          votesCount={votesCount as LegislativeVotesCount}
          votes={votes}
          inverse
        />
      ) : null}
      <br />
      <hr />
      <br />
      <Typography tag="p" variant="p">
        <strong>
          {typeOfVote &&
            typeOfVoteConfig[typeOfVote].short({
              ballotType:
                ballotTypeToString[transformedVotes?.ballotType as any],
            })}
        </strong>
      </Typography>
      <br />
      <Typography tag="p" variant="p">
        {typeOfVote && typeOfVoteConfig[typeOfVote].long}
      </Typography>
      <GeneratePDF
        ballotType={ballotTypeToString[transformedVotes?.ballotType as any]}
        ballotPath={
          state.context.ballotPaths[
            ballotTypeToString[transformedVotes?.ballotType as any]
          ]
        }
        votes={state.context.votes}
      />
      <Button
        variant="inverse"
        className="w-full mt-4"
        onClick={() => send("CONTINUE_PRACTICE")}
      >
        Continuar practicando
      </Button>
    </div>
  )
}
