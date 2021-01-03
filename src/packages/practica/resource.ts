import api from "../../services/api"
import { BallotsResponse, OcrResult, VoterInfo } from "./services/types"
import { CDN_URL } from "./services/constants"

export const VoterInformationResource = {
  async getVoterInfo(voterId?: string) {
    const data = await api.get<VoterInfo>(`/consulta?voterId=${voterId}`)

    return data
  },
}

export const BallotResource = {
  async getBallotsByPrecint(precint: string) {
    const ballots: BallotsResponse = await api.get<BallotsResponse>(
      `/ballots/ByPrecint?precintId=${precint}`
    )

    return ballots
  },

  async getBallotsByTown(town: string) {
    const ballots: BallotsResponse = await api.get<BallotsResponse>(
      `/ballots/ByTown?townId=${town}`
    )

    return ballots
  },

  async getBallot(path: string) {
    const data: OcrResult[][] = await api.get<OcrResult[][]>(
      `/${path}data.json`,
      { baseUrl: CDN_URL }
    )

    return data
  },

  async createBallotPdf(ballot: {
    ballotType: string
    ballotPath: string
    votes: string
  }) {
    const data = await api.post("/createBallotTask", ballot)

    return data
  },

  async getBallotPdf(params: string) {
    const result = await api.get(`/getPdfUrl?${params}`)

    return result
  },
}
