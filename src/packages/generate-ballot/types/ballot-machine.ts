import { BallotStructure } from "../../practica/services/ballot-configs/types"
import { Vote } from "../../practica/services/vote-service"

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
  votes: Vote[]
  ballot?: BallotStructure
}
