import { RuleOutcomeType, Selection, MunicipalBallot } from "../../types"
import NoMoreThanOneMayorSelectedRule from "../NoMoreThanOneMayorSelectedRule"

const { selected, notSelected } = Selection

describe("NoMoreThanOneMayorSelectedRule", () => {
  it("should error on more than 1 selections", () => {
    const municipalBallot: MunicipalBallot = {
      parties: [notSelected, notSelected, notSelected, notSelected],
      mayor: [selected, selected, notSelected, notSelected],
      municipalLegislator: [
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
      ],
    }

    expect(
      new NoMoreThanOneMayorSelectedRule().outcome(municipalBallot)
    ).toEqual({
      outcome: RuleOutcomeType.deny,
    })
  })

  it("should not error on 1 selection", () => {
    const municipalBallot: MunicipalBallot = {
      parties: [notSelected, notSelected, notSelected, notSelected],
      mayor: [selected, notSelected, notSelected, notSelected],
      municipalLegislator: [
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
      ],
    }

    expect(
      new NoMoreThanOneMayorSelectedRule().outcome(municipalBallot)
    ).toEqual({
      outcome: RuleOutcomeType.allow,
    })
  })
})
