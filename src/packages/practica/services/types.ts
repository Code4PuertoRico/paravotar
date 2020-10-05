import { Ballot, BallotType } from "../../../ballot-validator/types"
import { BallotConfigs } from "./ballot-configs"

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
  ballot: BallotConfigs
  ballotType: BallotType
}
