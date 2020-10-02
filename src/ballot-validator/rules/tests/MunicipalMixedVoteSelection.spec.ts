import { RuleOutcomeType, Selection, MunicipalBallot } from "../../types"
import MunicipalMixedVoteSelection from "../MunicipalMixedVoteSelection"

const { selected, notSelected } = Selection

describe("MunicipalMixedVoteSelection", () => {
  it("should error on same party and mayor column selection", () => {
    const municipalBallot: MunicipalBallot = {
      parties: [selected, notSelected, notSelected, notSelected],
      mayor: [selected, notSelected, notSelected, notSelected],
      municipalLegislator: [
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
      ],
    }

    expect(new MunicipalMixedVoteSelection().outcome(municipalBallot)).toEqual({
      outcome: RuleOutcomeType.deny,
      metadata: {
        section: "mayor",
        index: 0,
      },
    })
  })

  it("should error on same party and legislator selection", () => {
    const municipalBallot: MunicipalBallot = {
      parties: [selected, notSelected, notSelected, notSelected],
      mayor: [notSelected, notSelected, notSelected, notSelected],
      municipalLegislator: [
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [selected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
      ],
    }

    expect(new MunicipalMixedVoteSelection().outcome(municipalBallot)).toEqual({
      outcome: RuleOutcomeType.deny,
      metadata: {
        section: "municipalLegislator",
        index: {
          row: 2,
          col: 0,
        },
      },
    })
  })

  it("should error on different party, mayor & legislator selections", () => {
    const municipalBallot: MunicipalBallot = {
      parties: [selected, notSelected, notSelected, notSelected],
      mayor: [notSelected, selected, notSelected, notSelected],
      municipalLegislator: [
        [notSelected, selected, notSelected, notSelected],
        [notSelected, notSelected, selected, notSelected],
        [notSelected, notSelected, notSelected, selected],
        [notSelected, notSelected, selected, notSelected],
        [notSelected, notSelected, notSelected, selected],
      ],
    }

    expect(new MunicipalMixedVoteSelection().outcome(municipalBallot)).toEqual({
      outcome: RuleOutcomeType.deny,
      metadata: {
        section: "all",
      },
    })
  })

  it("should not error on 1 selection", () => {
    const municipalBallot: MunicipalBallot = {
      parties: [selected, notSelected, notSelected, notSelected],
      mayor: [notSelected, notSelected, notSelected, notSelected],
      municipalLegislator: [
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
      ],
    }

    expect(new MunicipalMixedVoteSelection().outcome(municipalBallot)).toEqual({
      outcome: RuleOutcomeType.allow,
    })
  })
})
