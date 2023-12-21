import { BallotType } from "../../../../ballot-validator/types"
import { ElectivePosition } from "./types"

export const BallotPositions = {
  [BallotType.state]: {
    [ElectivePosition.governor]: {
      start: 2,
      end: 2,
    },
    [ElectivePosition.commissionerResident]: {
      start: 4,
      end: 4,
    },
  },
  [BallotType.municipality]: {
    [ElectivePosition.mayor]: {
      start: 2,
      end: 2,
    },
    [ElectivePosition.municipalLegislators]: {
      start: 4,
    },
  },
  [BallotType.legislative]: {
    [ElectivePosition.districtRepresentative]: {
      start: 2,
      end: 2,
    },
    [ElectivePosition.districtSenators]: {
      start: 4,
      end: 6,
    },
    [ElectivePosition.atLargeRepresentative]: {
      start: 7,
      end: 13,
    },
    [ElectivePosition.atLargeSenator]: {
      start: 14,
      end: 20,
    },
  },
}

export const ValidMarkLimits = {
  [BallotType.state]: {
    [ElectivePosition.governor]: 1,
    [ElectivePosition.commissionerResident]: 1,
  },
  [BallotType.municipality]: {
    [ElectivePosition.mayor]: 1,
    [ElectivePosition.municipalLegislators]: 0,
  },
  [BallotType.legislative]: {
    [ElectivePosition.districtRepresentative]: 1,
    [ElectivePosition.districtSenators]: 2,
    [ElectivePosition.atLargeRepresentative]: 1,
    [ElectivePosition.atLargeSenator]: 1,
  },
}

export function getElectivePositionLimit(
  ballotType: BallotType,
  position: ElectivePosition
) {
  if (!(ballotType in ValidMarkLimits)) throw new Error("Ballot type not found")

  const limitsByBallotType = ValidMarkLimits[ballotType]

  if (!(position in limitsByBallotType))
    throw new Error("Position not found in ballot.")

  // @ts-ignore
  return limitsByBallotType[position]
}
