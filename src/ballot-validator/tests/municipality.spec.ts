import { Selection, BallotType, ResultStatus, MunicipalBallot } from "../types"
import ballotValidator from "../index"

const { selected, notSelected } = Selection

describe("Municipal Ballot", () => {
  it.each([
    [
      "empty selections",
      {
        parties: [notSelected, notSelected, notSelected, notSelected],
        mayor: [notSelected, notSelected, notSelected, notSelected],
        municipalLegislator: [
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
    [
      "all selections",
      {
        parties: [selected, selected, selected, selected],
        mayor: [selected, selected, selected, selected],
        municipalLegislator: [
          [selected, selected, selected, selected],
          [selected, selected, selected, selected],
          [selected, selected, selected, selected],
          [selected, selected, selected, selected],
          [selected, selected, selected, selected],
        ],
      },
    ],
    [
      "more than 1 mayor",
      {
        parties: [notSelected, notSelected, notSelected, notSelected],
        mayor: [selected, selected, notSelected, notSelected],
        municipalLegislator: [
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
    [
      "more than max amount of legislators",
      {
        parties: [notSelected, notSelected, notSelected, notSelected],
        mayor: [notSelected, notSelected, notSelected, notSelected],
        municipalLegislator: [
          [selected, selected, notSelected, notSelected],
          [notSelected, selected, notSelected, notSelected],
          [notSelected, selected, notSelected, notSelected],
          [notSelected, notSelected, selected, notSelected],
          [notSelected, notSelected, notSelected, selected],
        ],
      },
    ],
    [
      "mixed vote with same column mayor selected",
      {
        parties: [notSelected, notSelected, notSelected, selected],
        mayor: [notSelected, notSelected, notSelected, selected],
        municipalLegislator: [
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
    [
      "mixed vote with same column legislator selected",
      {
        parties: [notSelected, notSelected, notSelected, selected],
        mayor: [notSelected, notSelected, notSelected, notSelected],
        municipalLegislator: [
          [notSelected, notSelected, notSelected, selected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
    [
      "mixed vote with same column legislator & mayor selected",
      {
        parties: [notSelected, notSelected, notSelected, selected],
        mayor: [notSelected, notSelected, notSelected, selected],
        municipalLegislator: [
          [notSelected, notSelected, notSelected, selected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
    [
      "mixed vote with different column legislator & mayor selected",
      {
        parties: [notSelected, selected, notSelected, notSelected],
        mayor: [notSelected, notSelected, notSelected, selected],
        municipalLegislator: [
          [notSelected, notSelected, selected, selected],
          [notSelected, notSelected, selected, selected],
          [notSelected, notSelected, selected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
  ])("should error on %s", (_: string, municipalBallot: MunicipalBallot) => {
    expect(ballotValidator(municipalBallot, BallotType.municipality)).toEqual(
      expect.objectContaining({
        status: ResultStatus.failure,
      })
    )
  })

  it.each([
    [
      "1 selection",
      {
        parties: [selected, notSelected, notSelected, notSelected],
        mayor: [notSelected, notSelected, notSelected, notSelected],
        municipalLegislator: [
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
    [
      "1 mayor selected",
      {
        parties: [notSelected, notSelected, notSelected, notSelected],
        mayor: [selected, notSelected, notSelected, notSelected],
        municipalLegislator: [
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
    [
      "1 legislator selected",
      {
        parties: [notSelected, notSelected, notSelected, notSelected],
        mayor: [notSelected, notSelected, notSelected, notSelected],
        municipalLegislator: [
          [notSelected, selected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
    [
      "1 party & mayor selected",
      {
        parties: [notSelected, selected, notSelected, notSelected],
        mayor: [selected, notSelected, notSelected, notSelected],
        municipalLegislator: [
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
    [
      "1 party & legislator selected",
      {
        parties: [notSelected, selected, notSelected, notSelected],
        mayor: [notSelected, notSelected, notSelected, notSelected],
        municipalLegislator: [
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, selected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
    [
      "1 party & multiple legislator selected",
      {
        parties: [notSelected, selected, notSelected, notSelected],
        mayor: [notSelected, notSelected, notSelected, notSelected],
        municipalLegislator: [
          [selected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, selected, notSelected],
          [notSelected, notSelected, notSelected, selected],
          [selected, notSelected, selected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
  ])(
    "should not error on %s",
    (_: string, municipalBallot: MunicipalBallot) => {
      expect(ballotValidator(municipalBallot, BallotType.municipality)).toEqual(
        expect.objectContaining({
          status: ResultStatus.success,
        })
      )
    }
  )
})
