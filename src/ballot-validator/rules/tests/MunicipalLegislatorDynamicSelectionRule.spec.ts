import { expect, test, it } from "vitest";

import { RuleOutcomeType, Selection, MunicipalBallot } from "../../types";
import MunicipalLegislatorDynamicSelectionRule from "../MunicipalLegislatorDynamicSelectionRule";

const { selected, notSelected } = Selection;

test("MunicipalLegislatorDynamicSelectionRule", () => {
  it("should error on more than rows length selections", () => {
    const municipalBallot: MunicipalBallot = {
      parties: [notSelected, notSelected, notSelected, notSelected],
      mayor: [selected, selected, notSelected, notSelected],
      municipalLegislator: [
        [selected, notSelected, notSelected, notSelected],
        [selected, selected, notSelected, notSelected],
        [notSelected, selected, notSelected, notSelected],
        [notSelected, notSelected, selected, notSelected],
        [notSelected, notSelected, selected, notSelected],
      ],
    };

    expect(
      new MunicipalLegislatorDynamicSelectionRule().outcome(municipalBallot)
    ).toEqual({
      outcome: RuleOutcomeType.deny,
    });
  });

  it("should not error on max selection", () => {
    const municipalBallot: MunicipalBallot = {
      parties: [notSelected, notSelected, notSelected, notSelected],
      mayor: [selected, notSelected, notSelected, notSelected],
      municipalLegislator: [
        [selected, notSelected, notSelected, notSelected],
        [notSelected, selected, notSelected, notSelected],
        [notSelected, selected, notSelected, notSelected],
        [notSelected, selected, notSelected, notSelected],
        [notSelected, selected, notSelected, notSelected],
      ],
    };

    expect(
      new MunicipalLegislatorDynamicSelectionRule().outcome(municipalBallot)
    ).toEqual({
      outcome: RuleOutcomeType.allow,
    });
  });

  it("should not error on partial selection", () => {
    const municipalBallot: MunicipalBallot = {
      parties: [notSelected, notSelected, notSelected, notSelected],
      mayor: [selected, notSelected, notSelected, notSelected],
      municipalLegislator: [
        [selected, notSelected, notSelected, notSelected],
        [notSelected, selected, notSelected, notSelected],
        [notSelected, selected, notSelected, notSelected],
        [notSelected, selected, notSelected, notSelected],
        [notSelected, notSelected, notSelected, notSelected],
      ],
    };

    expect(
      new MunicipalLegislatorDynamicSelectionRule().outcome(municipalBallot)
    ).toEqual({
      outcome: RuleOutcomeType.allow,
    });
  });
});
