import { RuleOutcomeType, StateBallot, Selection } from "../../types"
import NoEmptyBallotRule from "../NoEmptyBallotRule"

const { selected, notSelected } = Selection

describe("NoEmptyBallotRule", () => {
  it("should error on empty selections", () => {
    const stateBallot: StateBallot = {
      parties: [notSelected, notSelected, notSelected, notSelected],
      governor: [notSelected, notSelected, notSelected, notSelected],
      residentCommissioner: [
        notSelected,
        notSelected,
        notSelected,
        notSelected,
      ],
    }

    expect(new NoEmptyBallotRule().outcome(stateBallot)).toEqual({
      outcome: RuleOutcomeType.deny,
    })
  })

  it("should not error on 1 selection", () => {
    const stateBallot: StateBallot = {
      parties: [selected, notSelected, notSelected, notSelected],
      governor: [notSelected, notSelected, notSelected, notSelected],
      residentCommissioner: [
        notSelected,
        notSelected,
        notSelected,
        notSelected,
      ],
    }

    expect(new NoEmptyBallotRule().outcome(stateBallot)).toEqual({
      outcome: RuleOutcomeType.allow,
    })
  })
})
