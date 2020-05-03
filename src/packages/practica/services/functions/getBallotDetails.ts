import { s3Client } from "../base"
import { BallotResponse } from "../types"

export default (path: string) =>
  s3Client.get<BallotResponse>(`${path}/data.json`)
