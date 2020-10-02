import { RuleOutcomeType, LegislativeBallot, Selection } from "../../types"
import LegislativeMixedVoteSelection from "../LegislativeMixedVoteSelection"

const { selected, notSelected } = Selection

describe("LegislativeMixedVoteSelection", () => {
  it("should error on same party and district representative selection", () => {
    const legislativeBallot: LegislativeBallot = {
      parties: [selected, notSelected, notSelected, notSelected],
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
      new LegislativeMixedVoteSelection().outcome(legislativeBallot)
    ).toEqual({
      outcome: RuleOutcomeType.deny,
      metadata: {
        section: "districtRepresentative",
        index: 0,
      },
    })
  })

  it("should error on same party and district senator selection", () => {
    const legislativeBallot: LegislativeBallot = {
      parties: [selected, notSelected, notSelected, notSelected],
      districtRepresentative: [
        notSelected,
        notSelected,
        notSelected,
        notSelected,
      ],
      districtSenator: [
        [notSelected, notSelected, notSelected, notSelected],
        [selected, notSelected, notSelected, notSelected],
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
      new LegislativeMixedVoteSelection().outcome(legislativeBallot)
    ).toEqual({
      outcome: RuleOutcomeType.deny,
      metadata: {
        section: "districtSenator",
        index: {
          col: 0,
          row: 1,
        },
      },
    })
  })

  it("should error on same party and at large representative selection", () => {
    const legislativeBallot: LegislativeBallot = {
      parties: [selected, notSelected, notSelected, notSelected],
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
        [selected, notSelected, notSelected, notSelected],
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
      new LegislativeMixedVoteSelection().outcome(legislativeBallot)
    ).toEqual({
      outcome: RuleOutcomeType.deny,
      metadata: {
        section: "atLargeRepresentative",
        index: {
          col: 0,
          row: 0,
        },
      },
    })
  })

  it("should error on same party and at large senator selection", () => {
    const legislativeBallot: LegislativeBallot = {
      parties: [selected, notSelected, notSelected, notSelected],
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
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
      ],
      atLargeSenator: [
        [notSelected, notSelected, notSelected, notSelected],
        [selected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
      ],
    }

    expect(
      new LegislativeMixedVoteSelection().outcome(legislativeBallot)
    ).toEqual({
      outcome: RuleOutcomeType.deny,
      metadata: {
        section: "atLargeSenator",
        index: {
          col: 0,
          row: 1,
        },
      },
    })
  })

  it("should error on party selection and different column selections for all sections", () => {
    const legislativeBallot: LegislativeBallot = {
      parties: [selected, notSelected, notSelected, notSelected],
      districtRepresentative: [notSelected, notSelected, notSelected, selected],
      districtSenator: [
        [notSelected, notSelected, selected, notSelected],
        [notSelected, notSelected, notSelected, selected],
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
        [notSelected, notSelected, selected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
      ],
    }

    expect(
      new LegislativeMixedVoteSelection().outcome(legislativeBallot)
    ).toEqual({
      outcome: RuleOutcomeType.deny,
      metadata: {
        section: "all",
      },
    })
  })

  it("should not error on 1 selection", () => {
    const legislativeBallot: LegislativeBallot = {
      parties: [selected, notSelected, notSelected, notSelected],
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
      new LegislativeMixedVoteSelection().outcome(legislativeBallot)
    ).toEqual({
      outcome: RuleOutcomeType.allow,
    })
  })
})
