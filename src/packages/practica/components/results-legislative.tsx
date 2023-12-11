import { BallotType } from "../../../ballot-validator/types"
import { Typography } from "../../../components"
import { LegislativeVotesCount } from "../services/ballot-configs"
import { ElectivePosition } from "../services/ballot-configs/types"
import { PARTY_ROW } from "../services/constants"
import { CandidateVote, Vote } from "../services/vote-service"
import { getElectivePositionForVote } from "../strategies/utils"
import CandidatesSummary from "./candidates-summary"

type LegislativeResultProps = {
  votesCount: LegislativeVotesCount
  votes: Vote[]
  inverse: boolean
}

export default function ResultsLegislative(props: LegislativeResultProps) {
  const votes = props.votes.filter(
    (vote): vote is CandidateVote => vote.position.row !== PARTY_ROW
  )
  const districtRepresentativeVotes = votes.filter((vote) => {
    const electivePosition = getElectivePositionForVote(
      vote.position,
      BallotType.legislative
    )

    return electivePosition === ElectivePosition.districtRepresentative
  }, [])
  const districtSenatorsVotes = votes.filter((vote) => {
    const electivePosition = getElectivePositionForVote(
      vote.position,
      BallotType.legislative
    )

    return electivePosition === ElectivePosition.districtSenators
  }, [])
  const atLargeRepresentativeVotes = votes.filter((vote) => {
    const electivePosition = getElectivePositionForVote(
      vote.position,
      BallotType.legislative
    )

    return electivePosition === ElectivePosition.atLargeRepresentative
  }, [])
  const atLargeSenatorVotes = votes.filter((vote) => {
    const electivePosition = getElectivePositionForVote(
      vote.position,
      BallotType.legislative
    )

    return electivePosition === ElectivePosition.atLargeSenator
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
        {props.votesCount.districtRepresentative} candidato(a) a Representante
        por Distrito
      </CandidatesSummary.Section>
      <CandidatesSummary>
        {districtRepresentativeVotes.map((vote) => {
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
        {props.votesCount.districtSenators} candidato(a) a Senador por Distrito
      </CandidatesSummary.Section>
      <CandidatesSummary>
        {districtSenatorsVotes.map((vote) => {
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
        {props.votesCount.atLargeRepresentative} candidato(a) a Representante
        por Acumulación
      </CandidatesSummary.Section>
      <CandidatesSummary>
        {atLargeRepresentativeVotes.map((vote) => {
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
        {props.votesCount.atLargeSenator} candidato(a) a Senador por Acumulación
      </CandidatesSummary.Section>
      <CandidatesSummary>
        {atLargeSenatorVotes.map((vote) => {
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

ResultsLegislative.defaultProps = {
  inverse: false,
}
