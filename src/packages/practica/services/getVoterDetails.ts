import { papeletaClient } from "./base"
import { APIPaths } from "./constants"
import { VoterDetailsResponse } from "./types"

export default (voterId: string) =>
  papeletaClient.get<VoterDetailsResponse>(APIPaths.GET_VOTER_ID, { voterId })
