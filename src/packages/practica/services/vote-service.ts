import { Selection } from "../../../ballot-validator/types"
import { VotesCoordinates } from "../../generate-ballot/types/ballot-machine"
import { ElectiveField } from "./ballot-configs/base"

export class Vote {
  candidate: ElectiveField
  position: VotesCoordinates
  selection: Selection

  constructor(
    candidate: ElectiveField,
    position: VotesCoordinates,
    selection: Selection
  ) {
    this.candidate = candidate
    this.position = position
    this.selection = selection
  }

  wasSelectedExplictly() {
    return this.selection === Selection.selected
  }

  wasSelectedImplicitly() {
    return this.selection === Selection.selectedImplicitly
  }
}
