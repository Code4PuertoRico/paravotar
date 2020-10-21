import { BallotType } from "../../../ballot-validator/types"
import { VotesCoordinates } from "../../generate-ballot/types/ballot-machine"
import {
  BallotConfigs,
  MunicipalBallotConfig,
} from "../services/ballot-configs"
import { BallotPositions } from "../services/ballot-configs/constants"
import { ElectivePosition } from "../services/ballot-configs/types"
import { VoteEvent } from "../services/types"

export function getElectivePositionForVote(
  position: VotesCoordinates,
  ballotType: BallotType
): ElectivePosition {
  if (ballotType === BallotType.state) {
    if (position.row === BallotPositions.state.governor.start) {
      return ElectivePosition.governor
    }

    return ElectivePosition.commissionerResident
  }

  if (ballotType === BallotType.municipality) {
    if (position.row === BallotPositions.municipality.mayor.start) {
      return ElectivePosition.mayor
    }

    return ElectivePosition.municipalLegislators
  }

  if (
    position.row === BallotPositions.legislative.districtRepresentative.start
  ) {
    return ElectivePosition.districtRepresentative
  } else if (
    position.row >= BallotPositions.legislative.districtSenators.start &&
    position.row <= BallotPositions.legislative.districtSenators.end
  ) {
    return ElectivePosition.districtSenators
  } else if (
    position.row >= BallotPositions.legislative.atLargeRepresentative.start &&
    position.row <= BallotPositions.legislative.atLargeRepresentative.end
  ) {
    return ElectivePosition.atLargeRepresentative
  }

  return ElectivePosition.atLargeSenator
}

export function getStartAndEndPositionsForBallot(
  ballot: BallotConfigs,
  ballotType: BallotType,
  electivePosition: ElectivePosition
) {
  if (ballotType === BallotType.state) {
    return BallotPositions.state[electivePosition]
  } else if (ballotType === BallotType.legislative) {
    return BallotPositions.legislative[electivePosition]
  }

  if (electivePosition === ElectivePosition.mayor) {
    return BallotPositions.municipality.mayor
  }

  return {
    ...BallotPositions.municipality.municipalLegislators,
    end: (ballot as MunicipalBallotConfig).amountOfMunicipalLegislators + 3,
  }
}

export function getColumnForParty(
  ballot: BallotConfigs,
  intendedVote: VoteEvent
) {
  const columnForParty = ballot.structure.reduce((accum, currentRow) => {
    const colForParty = currentRow.filter((column, columnIndex) => {
      if (columnIndex === intendedVote.position.column) {
        return column
      }

      return false
    })

    return [...accum, ...colForParty]
  }, [])

  return columnForParty
}
