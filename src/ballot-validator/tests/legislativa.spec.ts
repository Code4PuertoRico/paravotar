import {
  Selection,
  BallotType,
  ResultStatus,
  LegislativeBallot,
} from "../types"
import ballotValidator from "../index"

const { selected, notSelected } = Selection

describe("Legislative Ballot", () => {
  it.each([
    [
      "empty selections",
      {
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
        districtRepresentative: [selected, selected, selected, selected],
        districtSenator: [
          [selected, selected, selected, selected],
          [selected, selected, selected, selected],
        ],
        atLargeRepresentative: [
          [selected, selected, selected, selected],
          [selected, selected, selected, selected],
          [selected, selected, selected, selected],
          [selected, selected, selected, selected],
          [selected, selected, selected, selected],
          [selected, selected, selected, selected],
        ],
        atLargeSenator: [
          [selected, selected, selected, selected],
          [selected, selected, selected, selected],
          [selected, selected, selected, selected],
          [selected, selected, selected, selected],
          [selected, selected, selected, selected],
          [selected, selected, selected, selected],
        ],
      },
    ],
    [
      "more than 1 District Representative",
      {
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
      },
    ],
    [
      "more than 2 District Senators",
      {
        parties: [notSelected, notSelected, notSelected, notSelected],
        districtRepresentative: [
          notSelected,
          notSelected,
          notSelected,
          notSelected,
        ],
        districtSenator: [
          [selected, notSelected, selected, notSelected],
          [notSelected, selected, notSelected, notSelected],
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
      },
    ],
    [
      "more than 1 at large Representative",
      {
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
          [selected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, selected, notSelected, notSelected],
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
      },
    ],
    [
      "more than 1 at large Senator",
      {
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
          [selected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, selected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
    [
      "mixed vote with same column District Representative selected",
      {
        parties: [notSelected, selected, notSelected, notSelected],
        districtRepresentative: [
          notSelected,
          selected,
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
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
    [
      "mixed vote with same column District Senator selected",
      {
        parties: [notSelected, selected, notSelected, notSelected],
        districtRepresentative: [
          notSelected,
          notSelected,
          notSelected,
          notSelected,
        ],
        districtSenator: [
          [notSelected, selected, notSelected, notSelected],
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
      },
    ],
    [
      "mixed vote with same column District Representative & District Senator selected",
      {
        parties: [notSelected, selected, notSelected, notSelected],
        districtRepresentative: [
          notSelected,
          selected,
          notSelected,
          notSelected,
        ],
        districtSenator: [
          [notSelected, selected, notSelected, notSelected],
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
      },
    ],
    [
      "mixed vote with same column at large representative",
      {
        parties: [notSelected, selected, notSelected, notSelected],
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
          [notSelected, selected, notSelected, notSelected],
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
      },
    ],
    [
      "mixed vote with same column District Representative & District Senator selected & at large representative",
      {
        parties: [notSelected, selected, notSelected, notSelected],
        districtRepresentative: [
          notSelected,
          selected,
          notSelected,
          notSelected,
        ],
        districtSenator: [
          [notSelected, selected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
        atLargeRepresentative: [
          [notSelected, selected, notSelected, notSelected],
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
      },
    ],
    [
      "mixed vote with same column at large senator",
      {
        parties: [notSelected, selected, notSelected, notSelected],
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
          [notSelected, selected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
    [
      "mixed vote with same column District Representative & District Senator selected & at large representative & at large senator",
      {
        parties: [notSelected, selected, notSelected, notSelected],
        districtRepresentative: [
          notSelected,
          selected,
          notSelected,
          notSelected,
        ],
        districtSenator: [
          [notSelected, selected, notSelected, notSelected],
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
          [notSelected, selected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
  ])(
    "should error on %s",
    (_: string, legislativeBallot: LegislativeBallot) => {
      expect(
        ballotValidator(legislativeBallot, BallotType.legislative)
      ).toEqual(
        expect.objectContaining({
          status: ResultStatus.failure,
        })
      )
    }
  )

  it.each([
    [
      "1 selection",
      {
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
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
    [
      "1 district representative selected",
      {
        parties: [notSelected, notSelected, notSelected, notSelected],
        districtRepresentative: [
          selected,
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
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
    [
      "2 district senator selected",
      {
        parties: [notSelected, notSelected, notSelected, notSelected],
        districtRepresentative: [
          notSelected,
          notSelected,
          notSelected,
          notSelected,
        ],
        districtSenator: [
          [notSelected, selected, notSelected, notSelected],
          [notSelected, notSelected, selected, notSelected],
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
      },
    ],
    [
      "1 at large representative selected",
      {
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
          [notSelected, selected, notSelected, notSelected],
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
      },
    ],
    [
      "1 at large senator",
      {
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
          [notSelected, selected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
    [
      "1 party & 1 district representative selected",
      {
        parties: [selected, notSelected, notSelected, notSelected],
        districtRepresentative: [
          notSelected,
          selected,
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
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
    [
      "1 party & 2 district senator selected",
      {
        parties: [selected, notSelected, notSelected, notSelected],
        districtRepresentative: [
          notSelected,
          notSelected,
          notSelected,
          notSelected,
        ],
        districtSenator: [
          [notSelected, selected, notSelected, notSelected],
          [notSelected, notSelected, selected, notSelected],
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
      },
    ],
    [
      "1 party & 1 at large representative selected",
      {
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
      },
    ],
    [
      "1 party & 1 at large senator selected",
      {
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
          [notSelected, notSelected, notSelected, selected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
        ],
      },
    ],
    [
      "1 party & 1 district representative selected & 2 district senator",
      {
        parties: [selected, notSelected, notSelected, notSelected],
        districtRepresentative: [
          notSelected,
          selected,
          notSelected,
          notSelected,
        ],
        districtSenator: [
          [notSelected, selected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, selected],
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
      },
    ],
    [
      "1 party & 1 district representative selected & 2 district senator & 1 at large representative",
      {
        parties: [selected, notSelected, notSelected, notSelected],
        districtRepresentative: [
          notSelected,
          selected,
          notSelected,
          notSelected,
        ],
        districtSenator: [
          [notSelected, selected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, selected],
        ],
        atLargeRepresentative: [
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected, notSelected],
          [notSelected, notSelected, selected, notSelected],
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
      },
    ],
  ])(
    "should not error on %s",
    (_: string, legislativeBallot: LegislativeBallot) => {
      expect(
        ballotValidator(legislativeBallot, BallotType.legislative)
      ).toEqual(
        expect.objectContaining({
          status: ResultStatus.success,
        })
      )
    }
  )
})
