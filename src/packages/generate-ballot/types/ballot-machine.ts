export type BallotContent = {
  ocrResult: string
  logoImg?: string
}

export type VotesCoordinates = {
  column: number
  row: number
}

export type BallotMachineContext = {
  type: string | null
  path: string | null
  votes: VotesCoordinates[]
  ballot: BallotContent[][]
}
