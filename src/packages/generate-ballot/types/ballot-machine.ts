import { BallotStructure } from "../../practica/services/ballot-configs/types"

export type BallotContent = {
  ocrResult: string
  logoImg?: string
}

export type VotesCoordinates = {
  column: number
  row: number
}

export type BallotMachineContext = {
  type: string
  path: string
  votes: VotesCoordinates[]
  ballot?: BallotStructure
}
