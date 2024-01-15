import { expect, test, it } from "vitest";

import { RuleOutcomeType, LegislativeBallot, Selection } from "../../types";
import LegislativeMixedVoteSelection from "../LegislativeMixedVoteSelection";

const { selected, notSelected } = Selection;

test("LegislativeMixedVoteSelection", () => {
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
    };

    expect(
      new LegislativeMixedVoteSelection().outcome(legislativeBallot)
    ).toEqual({
      outcome: RuleOutcomeType.deny,
      metadata: {
        section: "all",
      },
    });
  });

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
    };

    expect(
      new LegislativeMixedVoteSelection().outcome(legislativeBallot)
    ).toEqual({
      outcome: RuleOutcomeType.allow,
    });
  });

  it("should not error on implicit selection", () => {
    const legislativeBallot: LegislativeBallot = {
      parties: [selected, notSelected, notSelected, notSelected],
      districtRepresentative: [notSelected, selected, notSelected, notSelected],
      districtSenator: [
        [notSelected, selected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
      ],
      atLargeRepresentative: [
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, selected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
      ],
      atLargeSenator: [
        [notSelected, notSelected, selected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
      ],
    };

    expect(
      new LegislativeMixedVoteSelection().outcome(legislativeBallot)
    ).toEqual({
      outcome: RuleOutcomeType.allow,
    });
  });
});
