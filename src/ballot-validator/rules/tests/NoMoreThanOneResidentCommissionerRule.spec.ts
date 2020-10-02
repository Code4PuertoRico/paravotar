import { RuleOutcomeType, StateBallot, Selection } from "../../types"
import NoMoreThanOneResidentCommissionerRule from "../NoMoreThanOneResidentCommissionerRule"

const { selected, notSelected } = Selection

describe("NoMoreThanOneResidentCommissionerRule", () => {
  it("should error on more than 1 selections", () => {
    const stateBallot: StateBallot = {
      parties: [notSelected, notSelected, notSelected, notSelected],
      governor: [notSelected, notSelected, notSelected, notSelected],
      residentCommissioner: [selected, selected, notSelected, notSelected],
    }

    expect(
      new NoMoreThanOneResidentCommissionerRule().outcome(stateBallot)
    ).toEqual({
      outcome: RuleOutcomeType.deny,
    })
  })

  it("should not error on 1 selection", () => {
    const stateBallot: StateBallot = {
      parties: [notSelected, notSelected, notSelected, notSelected],
      governor: [notSelected, notSelected, notSelected, notSelected],
      residentCommissioner: [selected, notSelected, notSelected, notSelected],
    }

    expect(
      new NoMoreThanOneResidentCommissionerRule().outcome(stateBallot)
    ).toEqual({
      outcome: RuleOutcomeType.allow,
    })
  })
})
