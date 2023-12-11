import api from "../../services/api"
import { BallotsResponse, OcrResult, VoterInfo } from "./services/types"
import { CDN_URL } from "./services/constants"

export const VoterInformationResource = {
  getVoterInfo(voterId?: string) {
    return api.get<VoterInfo>(`/consulta?voterId=${voterId}`)
  },
}

export const BallotResource = {
  getBallotsByPrecint(precint: string) {
    return api.get<BallotsResponse>(`/ballots/ByPrecint?precintId=${precint}`)
  },

  getBallotsByTown(town: string) {
    return api.get<BallotsResponse>(`/ballots/ByTown?townId=${town}`)
  },

  async getBallot(path: string) {
    return api.get<OcrResult[][]>(`/${path}data.json`, { baseUrl: CDN_URL })
  },

  createBallotPdf(ballot: {
    ballotType: string
    ballotPath: string
    votes: string
  }) {
    return api.post<{ uuid: string }>("/createBallotTask", ballot)
  },

  getBallotPdf(params: string) {
    api.get(`/getPdfUrl?${params}`)
  },
}
