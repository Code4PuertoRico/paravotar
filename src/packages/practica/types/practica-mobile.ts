import { VoterDetailsResponse, BallotResponse } from "../services/types"
import { BallotService } from "../services/BallotService"

export enum PracticaMobileStates {
  IDLE = "IDLE",
  LOADING_VOTER_DETAILS = "LOADING_VOTER_DETAILS",
  SELECTING_BALLOT = "SELECTING_BALLOT",
  INVALID_VOTER_ID = "INVALID_VOTER_ID",
  LOADING_BALLOT = "LOADING_BALLOT",
  FAILED_TO_LOAD_BALLOT = "FAILED_TO_LOAD_BALLOT",
  SELECTING_VOTING_METHOD = "SELECTING_VOTING_METHOD",
  VOTO_INTEGRO = "VOTO_INTEGRO",
  VOTO_MIXTO = "VOTO_MIXTO",
  VOTO_CANDIDATURA = "VOTO_CANDIDATURA",
}

export enum PracticaMobileEventTypes {
  SEARCH_VOTER_ID = "SEARCH_VOTER_ID",
  BALLOT_SELECTED = "BALLOT_SELECTED",
  INTEGRO_SELECTED = "INTEGRO_SELECTED",
  MIXTO_SELECTED = "MIXTO_SELECTED",
  CANDIDATURA_SELECTED = "CANDIDATURA_SELECTED",
}

export interface PracticaMobileContext {
  voterDetails?: VoterDetailsResponse
  ballotDetails?: BallotResponse
  selectedBallotType?: "legislativo" | "municipal" | "estatal"
  byCandidatePosition?: string
  byCandidateParty?: any
  ballots: {
    [key: string]: BallotService
  }
}

export type SectionMetadata = {
  limit: number
}
