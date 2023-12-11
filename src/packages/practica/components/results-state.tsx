import { BallotType } from "../../../ballot-validator/types"
import { Typography } from "../../../components"
import { StateVotesCount } from "../services/ballot-configs"
import { ElectivePosition } from "../services/ballot-configs/types"
import { PARTY_ROW } from "../services/constants"
import { CandidateVote, Vote } from "../services/vote-service"
import { getElectivePositionForVote } from "../strategies/utils"
import CandidatesSummary from "./candidates-summary"

type StateResultsProps = {
  votesCount: StateVotesCount
  votes: Vote[]
  inverse: boolean
}

export default function ResultsState(props: StateResultsProps) {
  const votes = props.votes.filter(
    (vote): vote is CandidateVote => vote.position.row !== PARTY_ROW
  )
  const governorVotes = votes.filter((vote) => {
    const electivePosition = getElectivePositionForVote(
      vote.position,
      BallotType.state
    )

    return electivePosition === ElectivePosition.governor
  }, [])
  const commissionerResidentVotes = votes.filter((vote) => {
    const electivePosition = getElectivePositionForVote(
      vote.position,
      BallotType.state
    )

    return electivePosition === ElectivePosition.commissionerResident
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
        {props.votesCount.governor} candidato(a) a Gobernador(a)
      </CandidatesSummary.Section>
      <CandidatesSummary>
        {governorVotes.map((vote) => {
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
        {props.votesCount.commissionerResident} candidato(a) a Comisionado(a)
        Residente
      </CandidatesSummary.Section>
      <CandidatesSummary>
        {commissionerResidentVotes.map((vote) => {
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

ResultsState.defaultProps = {
  inverse: false,
}
