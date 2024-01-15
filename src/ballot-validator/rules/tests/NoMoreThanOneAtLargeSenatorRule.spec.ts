import { expect, test, it } from "vitest";

import { RuleOutcomeType, Selection, LegislativeBallot } from "../../types";
import NoMoreThanOneAtLargeSenatorRule from "../NoMoreThanOneAtLargeSenatorRule";

const { selected, notSelected } = Selection;

test("NoMoreThanOneAtLargeSenatorRule", () => {
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
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
      ],
      atLargeSenator: [
        [notSelected, notSelected, selected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, selected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
      ],
    };

    expect(
      new NoMoreThanOneAtLargeSenatorRule().outcome(legislativeBallot)
    ).toEqual({
      outcome: RuleOutcomeType.deny,
    });
  });

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
        [notSelected, notSelected, notSelected, notSelected],
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
      new NoMoreThanOneAtLargeSenatorRule().outcome(legislativeBallot)
    ).toEqual({
      outcome: RuleOutcomeType.allow,
    });
  });
});
