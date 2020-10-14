import {
  BallotType,
  LegislativeBallot,
  MunicipalBallot,
  Selection,
  StateBallot,
} from "../../../ballot-validator/types"
import { BallotConfigs, MunicipalBallotConfig } from "./ballot-configs"
import { Vote } from "./vote-service"

type MarkAsSelectedArgs = {
  votes: Selection[]
  position: number
}

function markAsSelected({ votes, position }: MarkAsSelectedArgs) {
  return [
    ...votes.slice(0, position),
    Selection.selected,
    ...votes.slice(position + 1),
  ]
}

function transformStateVotes(votes: Vote[], cols: number): StateBallot {
  const parties = new Array(cols).fill(Selection.notSelected)
  const governor = new Array(cols).fill(Selection.notSelected)
  const residentCommissioner = Array(cols).fill(Selection.notSelected)
  const initialValue: StateBallot = {
    parties,
    governor,
    residentCommissioner,
  }

  return votes.reduce((prev, curr): StateBallot => {
    if (curr.position.row === 0) {
      return {
        ...prev,
        parties: markAsSelected({
          votes: prev.parties,
          position: curr.position.column,
        }),
      }
    } else if (curr.position.row === 2) {
      return {
        ...prev,
        governor: markAsSelected({
          votes: prev.governor,
          position: curr.position.column,
        }),
      }
    } else if (curr.position.row === 4) {
      return {
        ...prev,
        residentCommissioner: markAsSelected({
          votes: prev.residentCommissioner,
          position: curr.position.column,
        }),
      }
    }

    return prev
  }, initialValue)
}

function transformMunicipalVotes(
  votes: Vote[],
  cols: number,
  legislators: number
): MunicipalBallot {
  const parties = new Array(cols).fill(Selection.notSelected)
  const mayor = new Array(cols).fill(Selection.notSelected)
  const municipalLegislator = new Array(legislators).fill(null)

  municipalLegislator.forEach((_, index) => {
    municipalLegislator[index] = new Array(cols).fill(Selection.notSelected)
  })

  const initialValue: MunicipalBallot = {
    parties,
    mayor,
    municipalLegislator,
  }

  return votes.reduce((prev, curr): MunicipalBallot => {
    if (curr.position.row === 0) {
      return {
        ...prev,
        parties: markAsSelected({
          votes: prev.parties,
          position: curr.position.column,
        }),
      }
    } else if (curr.position.row === 2) {
      return {
        ...prev,
        mayor: markAsSelected({
          votes: prev.mayor,
          position: curr.position.column,
        }),
      }
    }

    // Municipal legislators come after row 3.
    // If my coordinate is on row 4 I have to subtract 4 - (3 + 1) to target the first row of the municipal legislator array.
    return {
      ...prev,
      municipalLegislator: prev.municipalLegislator.map((row, index) => {
        if (curr.position.row - 4 === index) {
          return markAsSelected({
            votes: row,
            position: curr.position.column,
          })
        }

        return row
      }),
    }
  }, initialValue)
}

function transformLegislativeVotes(
  votes: Vote[],
  cols: number
): LegislativeBallot {
  // TODO: The columns in a municipal ballot can change depending on the town.
  const parties = new Array(cols).fill(Selection.notSelected)
  const districtRepresentative = new Array(cols).fill(Selection.notSelected)
  const districtSenator = new Array(2).fill(null)
  districtSenator.forEach((_, index) => {
    districtSenator[index] = new Array(cols).fill(Selection.notSelected)
  })

  const atLargeRepresentative = new Array(6).fill(null)
  atLargeRepresentative.forEach((_, index) => {
    atLargeRepresentative[index] = new Array(cols).fill(Selection.notSelected)
  })

  const atLargeSenator = new Array(6).fill(null)
  atLargeSenator.forEach((_, index) => {
    atLargeSenator[index] = new Array(cols).fill(Selection.notSelected)
  })

  // TODO: We need to specify the amount of municipal legislators that a town can select.
  const initialValue: LegislativeBallot = {
    parties,
    districtRepresentative,
    districtSenator,
    atLargeRepresentative,
    atLargeSenator,
  }

  return votes.reduce((prev, curr): LegislativeBallot => {
    if (curr.position.row === 0) {
      // Party

      return {
        ...prev,
        parties: markAsSelected({
          votes: prev.parties,
          position: curr.position.column,
        }),
      }
    } else if (curr.position.row === 2) {
      // District Representative

      return {
        ...prev,
        districtRepresentative: markAsSelected({
          votes: prev.districtRepresentative,
          position: curr.position.column,
        }),
      }
    } else if (curr.position.row > 3 && curr.position.row < 6) {
      // District Senators

      return {
        ...prev,
        districtSenator: prev.districtSenator.map((row, index) => {
          if (curr.position.row - 4 === index) {
            return markAsSelected({
              votes: row,
              position: curr.position.column,
            })
          }

          return row
        }),
      }
    } else if (curr.position.row > 6 && curr.position.row < 13) {
      // At large representative

      return {
        ...prev,
        atLargeRepresentative: prev.atLargeRepresentative.map((row, index) => {
          if (curr.position.row - 7 === index) {
            return markAsSelected({
              votes: row,
              position: curr.position.column,
            })
          }

          return row
        }),
      }
    }

    // At large senator
    return {
      ...prev,
      atLargeSenator: prev.atLargeSenator.map((row, index) => {
        if (curr.position.row - 14 === index) {
          return markAsSelected({
            votes: row,
            position: curr.position.column,
          })
        }

        return row
      }),
    }
  }, initialValue)
}

export default function coordinatesToSections(
  votes: Vote[],
  ballot: BallotConfigs,
  ballotType: BallotType
) {
  switch (ballotType) {
    case BallotType.state:
      return transformStateVotes(votes, ballot.cols)

    case BallotType.municipality:
      return transformMunicipalVotes(
        votes,
        ballot.cols,
        (ballot as MunicipalBallotConfig).amountOfMunicipalLegislators
      )

    default:
      return transformLegislativeVotes(votes, ballot.cols)
  }
}
