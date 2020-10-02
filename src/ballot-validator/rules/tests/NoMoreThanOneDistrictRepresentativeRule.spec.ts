import { RuleOutcomeType, Selection, LegislativeBallot } from "../../types"
import NoMoreThanOneDistrictRepresentativeRule from "../NoMoreThanOneDistrictRepresentativeRule"

const { selected, notSelected } = Selection

describe("NoMoreThanOneDistrictRepresentativeRule", () => {
  it("should error on more than 1 selections", () => {
    const legislativeBallot: LegislativeBallot = {
      parties: [notSelected, notSelected, notSelected, notSelected],
      districtRepresentative: [selected, selected, notSelected, notSelected],
      districtSenator: [
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
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
      new NoMoreThanOneDistrictRepresentativeRule().outcome(legislativeBallot)
    ).toEqual({
      outcome: RuleOutcomeType.deny,
    })
  })

  it("should not error on 1 selection", () => {
    const legislativeBallot: LegislativeBallot = {
      parties: [notSelected, notSelected, notSelected, notSelected],
      districtRepresentative: [selected, notSelected, notSelected, notSelected],
      districtSenator: [
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
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
      new NoMoreThanOneDistrictRepresentativeRule().outcome(legislativeBallot)
    ).toEqual({
      outcome: RuleOutcomeType.allow,
    })
  })
})
