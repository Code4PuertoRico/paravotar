import { RuleOutcomeType, Selection, LegislativeBallot } from "../../types"
import NoMoreThanTwoDistrictSenatorsRule from "../NoMoreThanTwoDistrictSenatorsRule"

const { selected, notSelected } = Selection

describe("NoMoreThanTwoDistrictSenatorsRule", () => {
  it("should error on more than 2 selections", () => {
    const legislativeBallot: LegislativeBallot = {
      parties: [notSelected, notSelected, notSelected, notSelected],
      districtRepresentative: [
        notSelected,
        notSelected,
        notSelected,
        notSelected,
      ],
      districtSenator: [
        [selected, selected, notSelected, notSelected],
        [notSelected, selected, notSelected, notSelected],
      ],
      atLargeRepresentative: [
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
      ],
      atLargeSenator: [
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
      ],
    }

    expect(
      new NoMoreThanTwoDistrictSenatorsRule().outcome(legislativeBallot)
    ).toEqual({
      outcome: RuleOutcomeType.deny,
    })
  })

  it("should not error on 2 selections", () => {
    const legislativeBallot: LegislativeBallot = {
      parties: [notSelected, notSelected, notSelected, notSelected],
      districtRepresentative: [
        notSelected,
        notSelected,
        notSelected,
        notSelected,
      ],
      districtSenator: [
        [selected, notSelected, notSelected, notSelected],
        [notSelected, selected, notSelected, notSelected],
      ],
      atLargeRepresentative: [
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
      ],
      atLargeSenator: [
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
      ],
    }

    expect(
      new NoMoreThanTwoDistrictSenatorsRule().outcome(legislativeBallot)
    ).toEqual({
      outcome: RuleOutcomeType.allow,
    })
  })
})
