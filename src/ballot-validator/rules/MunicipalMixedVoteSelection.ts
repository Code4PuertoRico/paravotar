import _ from "lodash"
import { RuleOutcomeType, Selection, MunicipalBallot } from "../types"
import BaseRule from "./BaseRule"

class MunicipalMixedVoteSelection extends BaseRule {
  outcome(ballotSelections: MunicipalBallot) {
    const hasSelectedParty = ballotSelections.parties.some(
      p => p === Selection.selected
    )

    if (!hasSelectedParty) {
      return {
        outcome: RuleOutcomeType.allow,
      }
    }

    const mayorIndex = ballotSelections.mayor.findIndex(
      m => m === Selection.selected
    )

    const legislatorIndexes = _.flatten(
      ballotSelections.municipalLegislator.map((row, rowIndex) => {
        return row.reduce((indexes, cell, colIndex) => {
          if (cell === Selection.selected) {
            return [...indexes, { row: rowIndex, col: colIndex }]
          }
          return indexes
        }, [] as { row: number; col: number }[])
      })
    )

    const maxLegislatorVotes = ballotSelections.municipalLegislator.length

    if (mayorIndex !== -1 && legislatorIndexes.length === maxLegislatorVotes) {
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

export default MunicipalMixedVoteSelection
