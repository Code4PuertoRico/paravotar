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
