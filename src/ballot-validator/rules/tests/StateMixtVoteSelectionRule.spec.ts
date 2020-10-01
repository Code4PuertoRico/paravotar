import { RuleOutcomeType, StateBallot, Selection } from "../../types"
import StateMixtVoteSelectionRule from "../StateMixtVoteSelectionRule"

const { selected, notSelected } = Selection

describe("StateMixtVoteSelectionRule", () => {
  it("should error on same party and governor selection", () => {
    const stateBallot: StateBallot = {
      parties: [selected, notSelected, notSelected, notSelected],
      governor: [selected, notSelected, notSelected, notSelected],
      residentCommissioner: [
        notSelected,
        notSelected,
        notSelected,
        notSelected,
      ],
    }

    expect(new StateMixtVoteSelectionRule().outcome(stateBallot)).toEqual({
      outcome: RuleOutcomeType.deny,
      metadata: {
        section: "governor",
        index: 0,
      },
    })
  })

  it("should error on same party and resident commissioner selection", () => {
    const stateBallot: StateBallot = {
      parties: [selected, notSelected, notSelected, notSelected],
      governor: [notSelected, notSelected, notSelected, notSelected],
      residentCommissioner: [selected, notSelected, notSelected, notSelected],
    }

    expect(new StateMixtVoteSelectionRule().outcome(stateBallot)).toEqual({
      outcome: RuleOutcomeType.deny,
      metadata: {
        section: "residentCommissioner",
        index: 0,
      },
    })
  })

  it("should error on party selection and different column selections for all sections", () => {
    const stateBallot: StateBallot = {
      parties: [selected, notSelected, notSelected, notSelected],
      governor: [notSelected, notSelected, selected, notSelected],
      residentCommissioner: [notSelected, notSelected, selected, notSelected],
    }

    expect(new StateMixtVoteSelectionRule().outcome(stateBallot)).toEqual({
      outcome: RuleOutcomeType.deny,
    })
  })

  it("should not error on 1 selection", () => {
    const stateBallot: StateBallot = {
      parties: [selected, notSelected, notSelected, notSelected],
      governor: [notSelected, notSelected, selected, notSelected],
      residentCommissioner: [
        notSelected,
        notSelected,
        notSelected,
        notSelected,
      ],
    }

    expect(new StateMixtVoteSelectionRule().outcome(stateBallot)).toEqual({
      outcome: RuleOutcomeType.allow,
    })
  })
})
