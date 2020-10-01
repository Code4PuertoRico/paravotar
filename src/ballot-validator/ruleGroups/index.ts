import { BallotType } from "../types"
import LegislativeBallotRuleGroup from "./legislative"
import MunicipalityBallotRuleGroup from "./municipality"
import StateBallotRuleGroup from "./state"

export default {
  [BallotType.state]: StateBallotRuleGroup,
  [BallotType.municipality]: MunicipalityBallotRuleGroup,
  [BallotType.legislative]: LegislativeBallotRuleGroup,
}
