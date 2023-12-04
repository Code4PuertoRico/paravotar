import { expect, test, it } from "vitest";

import { RuleOutcomeType, StateBallot, Selection } from "../../types";
import StateMixedVoteSelectionRule from "../StateMixedVoteSelectionRule";

const { selected, notSelected } = Selection;

test("StateMixedVoteSelectionRule", () => {
  it("should error on party selection and different column selections for all sections", () => {
    const stateBallot: StateBallot = {
      parties: [selected, notSelected, notSelected, notSelected],
      governor: [notSelected, notSelected, selected, notSelected],
      residentCommissioner: [notSelected, notSelected, selected, notSelected],
    };

    expect(new StateMixedVoteSelectionRule().outcome(stateBallot)).toEqual({
      outcome: RuleOutcomeType.deny,
      metadata: {
        section: "all",
      },
    });
  });

  it("should not error on 1 selection", () => {
    const stateBallot: StateBallot = {
      parties: [selected, notSelected, notSelected, notSelected],
      governor: [notSelected, notSelected, notSelected, notSelected],
      residentCommissioner: [
        notSelected,
        notSelected,
        notSelected,
        notSelected,
      ],
    };

    expect(new StateMixedVoteSelectionRule().outcome(stateBallot)).toEqual({
      outcome: RuleOutcomeType.allow,
    });
  });
});
