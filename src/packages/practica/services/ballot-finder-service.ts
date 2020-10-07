import { API_URL } from "./constants"

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
  const voterInfoRes = await fetch(`${API_URL}/consulta?voterId=${voterId}`)
  const voterInfoJson: VoterInfo = await voterInfoRes.json()
  const ballotsRes = await fetch(
    `${API_URL}/ballots/ByPrecint?precintId=${voterInfoJson.precinto}`
  )
  const ballotsJson: BallotsResponse = await ballotsRes.json()

  return ballotsJson
}

// // Prefetch ballot data
// const ballots = Object.entries(ballotsJson).map(async ([key, value]) => {
//   try {
//     const ballotRes = await fetch(`${PUBLIC_S3_BUCKET}/${value}data.json`)
//     const ballotJson: OcrResult[][] = await ballotRes.json()

//     if (key === "estatal") {
//       return {
//         [key]: new StateBallotConfig(ballotJson, ballotsJson.estatal),
//       }
//     } else if (key === "municipal") {
//       return {
//         [key]: new MunicipalBallotConfig(ballotJson, ballotsJson.municipal),
//       }
//     } else {
//       return {
//         [key]: new LegislativeBallotConfig(
//           ballotJson,
//           ballotsJson.legislativa
//         ),
//       }
//     }
//   } catch (err) {
//     console.log(err)
//   }
// })

// const allBallotsJson = await Promise.all(ballots)
// const initialValue: {
//   estatal?: StateBallotConfig
//   municipal?: MunicipalBallotConfig
//   legislativa?: LegislativeBallotConfig
// } = {
//   estatal: undefined,
//   municipal: undefined,
//   legislativa: undefined,
// }

// return allBallotsJson.reduce((prev, curr) => {
//   return {
//     ...prev,
//     ...curr,
//   }
// }, initialValue)

async function getBallotsByPrecint(precint: string) {
  const ballotsByPrecintRes = await fetch(
    `${API_URL}/ballots/ByPrecint?precintId=${precint}`
  )
  const ballotsJson: BallotsResponse = await ballotsByPrecintRes.json()

  return ballotsJson
}

async function getBallotsByTown(town: string) {
  const ballotsByPrecintRes = await fetch(
    `${API_URL}/ballots/ByTown?townId=${town}`
  )
  const ballotsJson: BallotsResponse = await ballotsByPrecintRes.json()

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
