import { Selection } from "../../../ballot-validator/types"
import { VotesCoordinates } from "../../generate-ballot/types/ballot-machine"
import { ElectiveField } from "./ballot-configs/base"

export class Vote {
  position: VotesCoordinates
  selection: Selection
  candidate?: ElectiveField

  constructor(
    position: VotesCoordinates,
    selection: Selection,
    candidate?: ElectiveField
  ) {
    this.position = position
    this.selection = selection
    this.candidate = candidate
  }

  wasSelectedExplictly() {
    return this.selection === Selection.selected
  }

  wasSelectedImplicitly() {
    return this.selection === Selection.selectedImplicitly
  }
}

export function getExplicitlySelectedVotes(votes: Vote[]) {
  return votes.filter(vote => vote.selection === Selection.selected)
}
