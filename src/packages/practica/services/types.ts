import { Ballot, BallotType } from "../../../ballot-validator/types"
import {
  BallotConfigs,
  LegislativeBallotConfig,
  MunicipalBallotConfig,
  StateBallotConfig,
} from "./ballot-configs"
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

export type BallotResponse = { ocrResult: string; logoImg?: string }[][]

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

export type PracticeContext = {
  userInput: string | null
  findBy: FindByType | null
  uuid?: string
  ballotPaths?: {
    estatal: string
    municipal: string
    legislativa: string
  }
  ballots: {
    estatal?: StateBallotConfig
    municipal?: MunicipalBallotConfig
    legislativa?: LegislativeBallotConfig
  }
  votes: Vote[]
  transformedVotes?: TransformedVotes[]
  ballotType?: BallotType
}
