import { Ballot, BallotType } from "../../../ballot-validator/types"
import { VotesCoordinates } from "../../generate-ballot/types/ballot-machine"
import {
  BallotConfigs,
  LegislativeBallotConfig,
  MunicipalBallotConfig,
  StateBallotConfig,
} from "./ballot-configs"
import { ElectiveField } from "./ballot-configs/base"
import { FindByType } from "./ballot-finder-service"
import { Vote } from "./vote-service"

export type VoterDetailsResponse = {
  numeroElectoral: string
  precinto: string
  unidad: string
  colegio: string
  pagina: string
  linea: string
  estatus: string
  fechaDeNacimiento: string
  centroDeVotacion: string
  direccion: string
  papeletas: {
    legislativo: string
    municipal: string
    estatal: string
  }
}

export type BallotDetails = { ocrResult: string; logoImg?: string }[][]

export type OcrResult = {
  ocrResult: string
  logoImg?: string
}

export type TransformedVotes = {
  votes: Ballot
  ballotConfig: BallotConfigs
  ballotType: BallotType
}

export type FindByEventParams = {
  userInput: string
  findBy: FindByType
}

export type Ballots = {
  estatal: StateBallotConfig
  municipal: MunicipalBallotConfig
  legislativa: LegislativeBallotConfig
}

export type PracticeContext = {
  userInput: string | null
  findBy: FindByType | null
  uuid?: string
  ballotPaths?: BallotsResponse
  ballots?: Partial<Ballots>
  votes: Vote[]
  transformedVotes?: TransformedVotes[]
  ballotType?: BallotType
  pdfUrl?: any
}

export type VoteEvent = {
  candidate: ElectiveField
  position: VotesCoordinates
  ballotType: BallotType
  ballot?: BallotConfigs
}

export type VoterInfo = {
  estatus: string
  numeroElectoral: string
  precinto: string
  unidad: string
}

export interface BallotsResponse {
  estatal: string
  municipal: string
  legislativa: string
}
