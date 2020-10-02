import { RuleOutcomeType, StateBallot, Selection } from "../../types"
import NoMoreThanOneGovernorSelectedRule from "../NoMoreThanOneGovernorSelectedRule"

const { selected, notSelected } = Selection

describe("NoMoreThanOneGovernorSelectedRule", () => {
  it("should error on more than 1 selections", () => {
    const stateBallot: StateBallot = {
      parties: [notSelected, notSelected, notSelected, notSelected],
      governor: [selected, selected, notSelected, notSelected],
      residentCommissioner: [
        notSelected,
        notSelected,
        notSelected,
        notSelected,
      ],
    }

    expect(
      new NoMoreThanOneGovernorSelectedRule().outcome(stateBallot)
    ).toEqual({
      outcome: RuleOutcomeType.deny,
    })
  })

  it("should not error on 1 selection", () => {
    const stateBallot: StateBallot = {
      parties: [notSelected, notSelected, notSelected, notSelected],
      governor: [selected, notSelected, notSelected, notSelected],
      residentCommissioner: [
        notSelected,
        notSelected,
        notSelected,
        notSelected,
      ],
    }

    expect(
      new NoMoreThanOneGovernorSelectedRule().outcome(stateBallot)
    ).toEqual({
      outcome: RuleOutcomeType.allow,
    })
  })
})
