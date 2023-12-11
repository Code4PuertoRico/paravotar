import { BallotType } from "../../../ballot-validator/types"
import { Typography } from "../../../components"
import { MunicipalVotesCount } from "../services/ballot-configs"
import { ElectivePosition } from "../services/ballot-configs/types"
import { PARTY_ROW } from "../services/constants"
import { CandidateVote, Vote } from "../services/vote-service"
import { getElectivePositionForVote } from "../strategies/utils"
import CandidatesSummary from "./candidates-summary"

type StateResultsProps = {
  votesCount: MunicipalVotesCount
  votes: Vote[]
  inverse: boolean
}

export default function ResultsMunicipal(props: StateResultsProps) {
  const votes = props.votes.filter(
    (vote): vote is CandidateVote => vote.position.row !== PARTY_ROW
  )
  const mayorVotes = votes.filter((vote) => {
    const electivePosition = getElectivePositionForVote(
      vote.position,
      BallotType.municipality
    )

    return electivePosition === ElectivePosition.mayor
  }, [])
  const municipalLegislatorsVotes = votes.filter((vote) => {
    const electivePosition = getElectivePositionForVote(
      vote.position,
      BallotType.municipality
    )

    return electivePosition === ElectivePosition.municipalLegislators
  }, [])

  return (
    <div className="w-full">
      <Typography
        tag="p"
        variant="h3"
        className={`mb-2 ${props.inverse ? "" : "text-white"} font-bold`}
      >
        En esta papeleta usted ha votado por:
      </Typography>
      <CandidatesSummary.Section inverse={props.inverse}>
        {props.votesCount.mayor} a Alcalde(sa)
      </CandidatesSummary.Section>
      <CandidatesSummary>
        {mayorVotes.map((vote) => {
          return (
            <CandidatesSummary.Card
              key={vote.candidate.id}
              img={"img" in vote.candidate ? vote.candidate.img : undefined}
              name={vote.candidate.name ?? ""}
            />
          )
        })}
      </CandidatesSummary>
      <CandidatesSummary.Section className="mt-6" inverse={props.inverse}>
        {props.votesCount.municipalLegislators} candidato(a) a Legisladores(as)
        municipales
      </CandidatesSummary.Section>
      <CandidatesSummary>
        {municipalLegislatorsVotes.map((vote) => {
          return (
            <CandidatesSummary.Card
              key={vote.candidate.id}
              img={"img" in vote.candidate ? vote.candidate.img : undefined}
              name={vote.candidate.name ?? ""}
            />
          )
        })}
      </CandidatesSummary>
    </div>
  )
}

ResultsMunicipal.defaultProps = {
  inverse: false,
}
