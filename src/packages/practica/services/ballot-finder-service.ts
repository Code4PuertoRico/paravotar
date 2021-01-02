import api from "../../../services/api"

type VoterInfo = {
  estatus: string
  numeroElectoral: string
  precinto: string
  unidad: string
}

type BallotsResponse = {
  estatal: string
  municipal: string
  legislative: string
}

async function getBallotsByVoterId(voterId: string) {
  const voterInfo: VoterInfo = await api.get<VoterInfo>(
    `/consulta?voterId=${voterId}`
  )
  const ballots: BallotsResponse = await api.get<BallotsResponse>(
    `/ballots/ByPrecint?precintId=${voterInfo.precinto}`
  )

  return ballots
}

function prefixPrecint(precint: string) {
  let input = precint
  const inputSize = precint.length
  const missingChars = 3 - inputSize

  if (missingChars > 0) {
    let count = 0

    while (count < missingChars) {
      input = `0${input}`

      count++
    }
  }

  return input
}

async function getBallotsByPrecint(precint: string) {
  const prefixedPrecint = prefixPrecint(precint)
  const ballots: BallotsResponse = await api.get<BallotsResponse>(
    `/ballots/ByPrecint?precintId=${prefixedPrecint}`
  )

  return ballots
}

async function getBallotsByTown(town: string) {
  const ballotsJson: BallotsResponse = await api.get<BallotsResponse>(
    `/ballots/ByTown?townId=${town}`
  )

  return ballotsJson
}

export enum FindByType {
  "town" = "town",
  "precint" = "precint",
  "voterId" = "voterId",
}

export default async function finder(data: string, findBy: FindByType) {
  switch (findBy) {
    case FindByType.voterId:
      return getBallotsByVoterId(data)

    case FindByType.precint:
      return getBallotsByPrecint(data)

    case FindByType.town:
      return getBallotsByTown(data)

    default:
      throw Error(`Search method "${findBy}" is not handled`)
  }
}
