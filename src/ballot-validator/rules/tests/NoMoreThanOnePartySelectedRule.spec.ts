import { RuleOutcomeType, StateBallot, Selection } from "../../types"
import NoMoreThanOnePartySelectedRule from "../NoMoreThanOnePartySelectedRule"

const { selected, notSelected } = Selection

describe("NoMoreThanOnePartySelectedRule", () => {
  it("should error on more than 1 selections", () => {
    const stateBallot: StateBallot = {
      parties: [selected, selected, notSelected, notSelected],
      governor: [notSelected, notSelected, notSelected, notSelected],
      residentComisioner: [notSelected, notSelected, notSelected, notSelected],
    }

    expect(new NoMoreThanOnePartySelectedRule().outcome(stateBallot)).toEqual({
      outcome: RuleOutcomeType.deny,
    })
  })

  it("should not error on empty selection", () => {
    const stateBallot: StateBallot = {
      parties: [notSelected, notSelected, notSelected, notSelected],
      governor: [notSelected, notSelected, notSelected, notSelected],
      residentComisioner: [notSelected, notSelected, notSelected, notSelected],
    }

    expect(new NoMoreThanOnePartySelectedRule().outcome(stateBallot)).toEqual({
      outcome: RuleOutcomeType.allow,
    })
  })

  it("should not error on 1 selection", () => {
    const stateBallot: StateBallot = {
      parties: [selected, notSelected, notSelected, notSelected],
      governor: [notSelected, notSelected, notSelected, notSelected],
      residentComisioner: [notSelected, notSelected, notSelected, notSelected],
    }

    expect(new NoMoreThanOnePartySelectedRule().outcome(stateBallot)).toEqual({
      outcome: RuleOutcomeType.allow,
    })
  })
})
