import React from "react"
import { BallotType } from "../../../ballot-validator/types"
import { Typography } from "../../../components"
import { LegislativeVotesCount } from "../services/ballot-configs"
import { ElectivePosition } from "../services/ballot-configs/types"
import { PARTY_ROW } from "../services/constants"
import { Vote } from "../services/vote-service"
import { getElectivePositionForVote } from "../strategies/utils"
import CandidatesSummary from "./candidates-summary"

type LegislativeResultProps = {
  votesCount: LegislativeVotesCount
  votes: Vote[]
}

export default function ResultsLegislative(props: LegislativeResultProps) {
  const votes = props.votes.filter(vote => vote.position.row !== PARTY_ROW)
  const districtRepresentativeVotes: Vote[] = votes.filter(vote => {
    const electivePosition = getElectivePositionForVote(
      vote.position,
      BallotType.legislative
    )

    return electivePosition === ElectivePosition.districtRepresentative
  }, [])
  const districtSenatorsVotes: Vote[] = votes.filter(vote => {
    const electivePosition = getElectivePositionForVote(
      vote.position,
      BallotType.legislative
    )

    return electivePosition === ElectivePosition.districtSenators
  }, [])
  const atLargeRepresentativeVotes: Vote[] = votes.filter(vote => {
    const electivePosition = getElectivePositionForVote(
      vote.position,
      BallotType.legislative
    )

    return electivePosition === ElectivePosition.atLargeRepresentative
  }, [])
  const atLargeSenatorVotes: Vote[] = votes.filter(vote => {
    const electivePosition = getElectivePositionForVote(
      vote.position,
      BallotType.legislative
    )

    return electivePosition === ElectivePosition.atLargeSenator
  }, [])

  return (
    <div className="w-11/12 mx-auto lg:w-4/4">
      <Typography tag="p" variant="h3" className="mb-2 text-white font-bold">
        En esta papeleta usted ha votado por:
      </Typography>
      <CandidatesSummary.Section>
        {props.votesCount.districtRepresentative} candidato(a) a Representante
        por Distrito
      </CandidatesSummary.Section>
      <CandidatesSummary>
        {districtRepresentativeVotes.map((vote: Vote) => {
          return (
            <CandidatesSummary.Card
              key={vote.candidate.id}
              img={vote.candidate.img}
              name={vote.candidate.name}
            />
          )
        })}
      </CandidatesSummary>
      <CandidatesSummary.Section className="mt-6">
        {props.votesCount.districtSenators} candidato(a) a Senador por Distrito
      </CandidatesSummary.Section>
      <CandidatesSummary>
        {districtSenatorsVotes.map((vote: Vote) => {
          return (
            <CandidatesSummary.Card
              key={vote.candidate.id}
              img={vote.candidate.img}
              name={vote.candidate.name}
            />
          )
        })}
      </CandidatesSummary>
      <CandidatesSummary.Section className="mt-6">
        {props.votesCount.atLargeRepresentative} candidato(a) a Representante
        por Acumulación
      </CandidatesSummary.Section>
      <CandidatesSummary>
        {atLargeRepresentativeVotes.map((vote: Vote) => {
          return (
            <CandidatesSummary.Card
              key={vote.candidate.id}
              img={vote.candidate.img}
              name={vote.candidate.name}
            />
          )
        })}
      </CandidatesSummary>
      <CandidatesSummary.Section className="mt-6">
        {props.votesCount.atLargeSenator} candidato(a) a Senador por Acumulación
      </CandidatesSummary.Section>
      <CandidatesSummary>
        {atLargeSenatorVotes.map((vote: Vote) => {
          return (
            <CandidatesSummary.Card
              key={vote.candidate.id}
              img={vote.candidate.img}
              name={vote.candidate.name}
            />
          )
        })}
      </CandidatesSummary>
    </div>
  )
}
