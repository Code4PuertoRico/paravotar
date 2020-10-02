import { RuleOutcomeType, Selection, LegislativeBallot } from "../../types"
import NoMoreThanOneAtLargeRepresentativeRule from "../NoMoreThanOneAtLargeRepresentativeRule"

const { selected, notSelected } = Selection

describe("NoMoreThanOneAtLargeRepresentativeRule", () => {
  it("should error on more than 1 selections", () => {
    const legislativeBallot: LegislativeBallot = {
      parties: [notSelected, notSelected, notSelected, notSelected],
      districtRepresentative: [
        notSelected,
        notSelected,
        notSelected,
        notSelected,
      ],
      districtSenator: [
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
      ],
      atLargeRepresentative: [
        [notSelected, notSelected, selected, notSelected],
        [notSelected, notSelected, selected, notSelected],
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
      new NoMoreThanOneAtLargeRepresentativeRule().outcome(legislativeBallot)
    ).toEqual({
      outcome: RuleOutcomeType.deny,
    })
  })

  it("should not error on 1 selection", () => {
    const legislativeBallot: LegislativeBallot = {
      parties: [notSelected, notSelected, notSelected, notSelected],
      districtRepresentative: [
        notSelected,
        notSelected,
        notSelected,
        notSelected,
      ],
      districtSenator: [
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
      ],
      atLargeRepresentative: [
        [notSelected, notSelected, selected, notSelected],
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
      new NoMoreThanOneAtLargeRepresentativeRule().outcome(legislativeBallot)
    ).toEqual({
      outcome: RuleOutcomeType.allow,
    })
  })
})
