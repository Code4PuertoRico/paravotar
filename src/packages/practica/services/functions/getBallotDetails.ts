import { s3Client } from "../base"
import { BallotDetails } from "../types"

export default (path: string) =>
  s3Client.get<BallotDetails>(`${path}/data.json`)
