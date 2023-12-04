import {
  Ballot,
  BallotType,
  StateBallot,
  Selection,
  MunicipalBallot,
  LegislativeBallot,
} from "../types"

const sum = (counter: number, value: Selection) => {
  return value === Selection.selected ? counter + 1 : counter
}

const isEmpty = (ballotSelections: Ballot, ballotType: BallotType) => {
  const partySelections = ballotSelections.parties.reduce(sum, 0)

  if (ballotType === BallotType.state) {
    const selections = ballotSelections as StateBallot

    const governerSelections = selections.governor.reduce(sum, 0)
    const residentCommissionerSelections =
      selections.residentCommissioner.reduce(sum, 0)

    return (
      partySelections + governerSelections + residentCommissionerSelections ===
      0
    )
  }

  if (ballotType === BallotType.municipality) {
    const selections = ballotSelections as MunicipalBallot

    const mayorSelections = selections.mayor.reduce(sum, 0)
    const municipalLegislatorSelections = selections.municipalLegislator.reduce(
      (counter, row) => {
        return row.reduce(sum, counter)
      },
      0
    )

    return (
      partySelections + mayorSelections + municipalLegislatorSelections === 0
    )
  }

  if (ballotType === BallotType.legislative) {
    const selections = ballotSelections as LegislativeBallot

    const districtRepresentativeSelections =
      selections.districtRepresentative.reduce(sum, 0)
    const districtSenatorSelections = selections.districtSenator.reduce(
      (counter, row) => {
        return row.reduce(sum, counter)
      },
      0
    )

    const atLargeRepresentativeSelections =
      selections.atLargeRepresentative.reduce((counter, row) => {
        return row.reduce(sum, counter)
      }, 0)

    const atLargeSenatorSelections = selections.atLargeSenator.reduce(
      (counter, row) => {
        return row.reduce(sum, counter)
      },
      0
    )

    return (
      partySelections +
        districtRepresentativeSelections +
        districtSenatorSelections +
        atLargeRepresentativeSelections +
        atLargeSenatorSelections ===
      0
    )
  }
}

const isVoteIntegro = (ballotSelections: Ballot, ballotType: BallotType) => {
  const partySelections = ballotSelections.parties.reduce(sum, 0)

  if (partySelections === 0) {
    return false
  }

  const partyIndex = ballotSelections.parties.findIndex(
    (p) => p === Selection.selected
  )

  if (ballotType === BallotType.state) {
    const selections = ballotSelections as StateBallot

    const governerSelections = selections.governor.reduce(sum, 0)
    const residentCommissionerSelections =
      selections.residentCommissioner.reduce(sum, 0)

    if (governerSelections + residentCommissionerSelections === 0) {
      return true
    }

    const governorIndex = selections.governor.findIndex(
      (p) => p === Selection.selected
    )

    const residentCommissionerIndex = selections.residentCommissioner.findIndex(
      (p) => p === Selection.selected
    )

    if (partyIndex === governorIndex && residentCommissionerIndex === -1) {
      return true
    }

    if (partyIndex === residentCommissionerIndex && governorIndex === -1) {
      return true
    }

    return (
      partyIndex === residentCommissionerIndex && partyIndex === governorIndex
    )
  }

  if (ballotType === BallotType.municipality) {
    const selections = ballotSelections as MunicipalBallot

    const mayorSelections = selections.mayor.reduce(sum, 0)
    const municipalLegislatorIndexes = selections.municipalLegislator.reduce(
      (indexes, row) => {
        const selectedIndexes = row.reduce(
          (colIndexes, value, index) =>
            value === Selection.selected ? [...colIndexes, index] : colIndexes,
          [] as number[]
        )
        return [...indexes, ...selectedIndexes]
      },
      [] as number[]
    )

    if (mayorSelections + municipalLegislatorIndexes.length === 0) {
      return true
    }

    const mayorIndex = selections.mayor.findIndex(
      (p) => p === Selection.selected
    )

    if (partyIndex === mayorIndex && municipalLegislatorIndexes.length === 0) {
      return true
    }

    if (
      municipalLegislatorIndexes.every((i) => i === partyIndex) &&
      mayorIndex === -1
    ) {
      return true
    }

    return (
      partyIndex === mayorIndex &&
      municipalLegislatorIndexes.every((i) => i === partyIndex)
    )
  }

  if (ballotType === BallotType.legislative) {
    const selections = ballotSelections as LegislativeBallot

    const districtRepresentativeSelections =
      selections.districtRepresentative.reduce(sum, 0)
    const districtSenatorIndexes = selections.districtSenator.reduce(
      (indexes, row) => {
        const selectedIndexes = row.reduce(
          (colIndexes, value, index) =>
            value === Selection.selected ? [...colIndexes, index] : colIndexes,
          [] as number[]
        )
        return [...indexes, ...selectedIndexes]
      },
      [] as number[]
    )

    const atLargeRepresentativeIndexes =
      selections.atLargeRepresentative.reduce((indexes, row) => {
        const selectedIndexes = row.reduce(
          (colIndexes, value, index) =>
            value === Selection.selected ? [...colIndexes, index] : colIndexes,
          [] as number[]
        )
        return [...indexes, ...selectedIndexes]
      }, [] as number[])

    const atLargeSenatorIndexes = selections.atLargeSenator.reduce(
      (indexes, row) => {
        const selectedIndexes = row.reduce(
          (colIndexes, value, index) =>
            value === Selection.selected ? [...colIndexes, index] : colIndexes,
          [] as number[]
        )
        return [...indexes, ...selectedIndexes]
      },
      [] as number[]
    )

    if (
      districtRepresentativeSelections +
        districtSenatorIndexes.length +
        atLargeRepresentativeIndexes.length +
        atLargeSenatorIndexes.length ===
      0
    ) {
      return true
    }

    const districtRepresentativeIndex =
      selections.districtRepresentative.findIndex(
        (p) => p === Selection.selected
      )

    if (
      partyIndex === districtRepresentativeIndex &&
      districtSenatorIndexes.length === 0 &&
      atLargeRepresentativeIndexes.length === 0 &&
      atLargeSenatorIndexes.length === 0
    ) {
      return true
    }

    if (
      districtSenatorIndexes.every((i) => i === partyIndex) &&
      atLargeRepresentativeIndexes.length === 0 &&
      atLargeSenatorIndexes.length === 0 &&
      districtRepresentativeIndex === -1
    ) {
      return true
    }

    if (
      atLargeRepresentativeIndexes.every((i) => i === partyIndex) &&
      districtRepresentativeIndex === -1 &&
      districtSenatorIndexes.length === 0 &&
      atLargeSenatorIndexes.length === 0
    ) {
      return true
    }

    if (
      atLargeSenatorIndexes.every((i) => i === partyIndex) &&
      districtRepresentativeIndex === -1 &&
      districtSenatorIndexes.length === 0 &&
      atLargeRepresentativeIndexes.length === 0
    ) {
      return true
    }

    if (
      atLargeSenatorIndexes.every((i) => i === partyIndex) &&
      districtRepresentativeIndex === -1 &&
      districtSenatorIndexes.length === 0 &&
      atLargeRepresentativeIndexes.length === 0
    ) {
      return true
    }

    if (
      atLargeSenatorIndexes.every((i) => i === partyIndex) &&
      districtRepresentativeIndex === partyIndex &&
      districtSenatorIndexes.length === 0 &&
      atLargeRepresentativeIndexes.length === 0
    ) {
      return true
    }

    if (
      districtSenatorIndexes.every((i) => i === partyIndex) &&
      districtRepresentativeIndex === partyIndex &&
      atLargeSenatorIndexes.length === 0 &&
      atLargeRepresentativeIndexes.length === 0
    ) {
      return true
    }

    if (
      atLargeRepresentativeIndexes.every((i) => i === partyIndex) &&
      districtRepresentativeIndex === partyIndex &&
      atLargeSenatorIndexes.length === 0 &&
      districtSenatorIndexes.length === 0
    ) {
      return true
    }

    if (
      atLargeRepresentativeIndexes.every((i) => i === partyIndex) &&
      districtRepresentativeIndex === partyIndex &&
      atLargeSenatorIndexes.every((i) => i === partyIndex) &&
      districtSenatorIndexes.length === 0
    ) {
      return true
    }

    if (
      atLargeRepresentativeIndexes.every((i) => i === partyIndex) &&
      districtRepresentativeIndex === partyIndex &&
      districtSenatorIndexes.every((i) => i === partyIndex) &&
      atLargeSenatorIndexes.length === 0
    ) {
      return true
    }

    if (
      atLargeSenatorIndexes.every((i) => i === partyIndex) &&
      districtRepresentativeIndex === partyIndex &&
      districtSenatorIndexes.every((i) => i === partyIndex) &&
      atLargeRepresentativeIndexes.length === 0
    ) {
      return true
    }

    if (
      atLargeSenatorIndexes.every((i) => i === partyIndex) &&
      districtSenatorIndexes.every((i) => i === partyIndex) &&
      atLargeRepresentativeIndexes.every((i) => i === partyIndex) &&
      districtRepresentativeIndex === -1
    ) {
      return true
    }

    return (
      atLargeSenatorIndexes.every((i) => i === partyIndex) &&
      districtSenatorIndexes.every((i) => i === partyIndex) &&
      atLargeRepresentativeIndexes.every((i) => i === partyIndex) &&
      districtRepresentativeIndex === partyIndex
    )
  }
}

const isVoteCandidatura = (ballotSelections: Ballot) => {
  const partySelections = ballotSelections.parties.reduce(sum, 0)

  if (partySelections === 0) {
    return true
  }

  return false
}

const detector = (ballotSelections: Ballot, ballotType: BallotType) => {
  if (isEmpty(ballotSelections, ballotType)) {
    return "empty"
  }

  if (isVoteIntegro(ballotSelections, ballotType)) {
    return "integro"
  }

  if (isVoteCandidatura(ballotSelections)) {
    return "candidatura"
  }

  return "mixto"
}

export default detector
