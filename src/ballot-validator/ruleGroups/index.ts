import { BallotType } from "../types"
import StateBallotRuleGroup from "./state"

export default {
  [BallotType.state]: StateBallotRuleGroup,
  [BallotType.municipality]: [],
  [BallotType.legislative]: [],
}
