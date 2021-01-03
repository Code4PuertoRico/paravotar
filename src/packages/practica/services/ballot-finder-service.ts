import { BallotResource, VoterInformationResource } from "../resource"
import { BallotsResponse, VoterInfo } from "./types"

async function getBallotsByVoterId(voterId: string) {
  const voterInfo: VoterInfo = await VoterInformationResource.getVoterInfo(
    voterId
  )
  const ballots: BallotsResponse = await BallotResource.getBallotsByPrecint(
    voterInfo.precinto
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
  const ballots: BallotsResponse = await BallotResource.getBallotsByPrecint(
    prefixedPrecint
  )

  return ballots
}

async function getBallotsByTown(town: string) {
  const ballots: BallotsResponse = await BallotResource.getBallotsByTown(town)

  return ballots
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
