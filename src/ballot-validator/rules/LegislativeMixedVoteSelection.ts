import _ from "lodash"
import { RuleOutcomeType, Selection, LegislativeBallot } from "../types"
import BaseRule from "./BaseRule"

class LegislativeMixedVoteSelection extends BaseRule {
  outcome(ballotSelections: LegislativeBallot) {
    const hasSelectedParty = ballotSelections.parties.some(
      p => p === Selection.selected
    )

    if (!hasSelectedParty) {
      return {
        outcome: RuleOutcomeType.allow,
      }
    }

    const partyIndex = ballotSelections.parties.findIndex(
      p => p === Selection.selected
    )

    const districtRepresentativeIndex = ballotSelections.districtRepresentative.findIndex(
      m => m === Selection.selected
    )

    const districtSenatorIndexes = _.flatten(
      ballotSelections.districtSenator.map((row, rowIndex) => {
        return row.reduce((indexes, cell, colIndex) => {
          if (cell === Selection.selected) {
            return [...indexes, { row: rowIndex, col: colIndex }]
          }
          return indexes
        }, [] as { row: number; col: number }[])
      })
    )

    const atLargeRepresentativeIndexes = _.flatten(
      ballotSelections.atLargeRepresentative.map((row, rowIndex) => {
        return row.reduce((indexes, cell, colIndex) => {
          if (cell === Selection.selected) {
            return [...indexes, { row: rowIndex, col: colIndex }]
          }
          return indexes
        }, [] as { row: number; col: number }[])
      })
    )

    const atLargeSenatorIndexes = _.flatten(
      ballotSelections.atLargeSenator.map((row, rowIndex) => {
        return row.reduce((indexes, cell, colIndex) => {
          if (cell === Selection.selected) {
            return [...indexes, { row: rowIndex, col: colIndex }]
          }
          return indexes
        }, [] as { row: number; col: number }[])
      })
    )

    if (partyIndex === districtRepresentativeIndex) {
      return {
        outcome: RuleOutcomeType.deny,
        metadata: {
          section: "districtRepresentative",
          index: districtRepresentativeIndex,
        },
      }
    }

    const partyDistrictSenatorIndexesMatches = districtSenatorIndexes.reduce(
      (matching, legislatorIndex) => {
        if (partyIndex === legislatorIndex.col) {
          return [...matching, legislatorIndex]
        }

        return matching
      },
      [] as { row: number; col: number }[]
    )

    if (partyDistrictSenatorIndexesMatches.length > 0) {
      return {
        outcome: RuleOutcomeType.deny,
        metadata: {
          section: "districtSenator",
          index: partyDistrictSenatorIndexesMatches[0],
        },
      }
    }

    const partyAtLargeRepresentativeIndexesMatches = atLargeRepresentativeIndexes.reduce(
      (matching, legislatorIndex) => {
        if (partyIndex === legislatorIndex.col) {
          return [...matching, legislatorIndex]
        }

        return matching
      },
      [] as { row: number; col: number }[]
    )

    if (partyAtLargeRepresentativeIndexesMatches.length > 0) {
      return {
        outcome: RuleOutcomeType.deny,
        metadata: {
          section: "atLargeRepresentative",
          index: partyAtLargeRepresentativeIndexesMatches[0],
        },
      }
    }

    const partyAtLargeSenatorIndexesMatches = atLargeSenatorIndexes.reduce(
      (matching, legislatorIndex) => {
        if (partyIndex === legislatorIndex.col) {
          return [...matching, legislatorIndex]
        }

        return matching
      },
      [] as { row: number; col: number }[]
    )

    if (partyAtLargeSenatorIndexesMatches.length > 0) {
      return {
        outcome: RuleOutcomeType.deny,
        metadata: {
          section: "atLargeSenator",
          index: partyAtLargeSenatorIndexesMatches[0],
        },
      }
    }

    if (
      districtRepresentativeIndex !== -1 &&
      districtSenatorIndexes.length === 2 &&
      atLargeRepresentativeIndexes.length === 1 &&
      atLargeSenatorIndexes.length === 1
    ) {
      return {
        outcome: RuleOutcomeType.deny,
        metadata: {
          section: "all",
        },
      }
    }

    return {
      outcome: RuleOutcomeType.allow,
    }
  }
}

export default LegislativeMixedVoteSelection
