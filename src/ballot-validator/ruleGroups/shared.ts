import NoEmptyBallotRule from "../rules/NoEmptyBallotRule"
import NoMoreThanOnePartySelectedRule from "../rules/NoMoreThanOnePartySelectedRule"

export const SharedRules = [
  new NoEmptyBallotRule(),
  new NoMoreThanOnePartySelectedRule(),
]
