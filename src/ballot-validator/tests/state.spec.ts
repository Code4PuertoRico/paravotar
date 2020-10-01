import { StateBallot, Selection, BallotType, ResultStatus } from "../types"
import ballotValidator from "../index"

const { selected, notSelected } = Selection

describe("State Ballot", () => {
  it.each([
    [
      "empty selections",
      {
        parties: [notSelected, notSelected, notSelected, notSelected],
        governor: [notSelected, notSelected, notSelected, notSelected],
        residentCommissioner: [
          notSelected,
          notSelected,
          notSelected,
          notSelected,
        ],
      },
    ],
    [
      "all selections",
      {
        parties: [selected, selected, selected, selected],
        governor: [selected, selected, selected, selected],
        residentCommissioner: [selected, selected, selected, selected],
      },
    ],
    [
      "more than 1 governor",
      {
        parties: [notSelected, notSelected, notSelected, notSelected],
        governor: [selected, selected, notSelected, notSelected],
        residentCommissioner: [
          notSelected,
          notSelected,
          notSelected,
          notSelected,
        ],
      },
    ],
    [
      "more than 1 resident commissioner",
      {
        parties: [notSelected, notSelected, notSelected, notSelected],
        governor: [selected, selected, notSelected, notSelected],
        residentCommissioner: [
          notSelected,
          notSelected,
          notSelected,
          notSelected,
        ],
      },
    ],
    [
      "mixt vote with same column governor selected",
      {
        parties: [selected, notSelected, notSelected, notSelected],
        governor: [selected, notSelected, notSelected, notSelected],
        residentCommissioner: [
          notSelected,
          notSelected,
          notSelected,
          notSelected,
        ],
      },
    ],
    [
      "mixt vote with same column candidate selected",
      {
        parties: [selected, notSelected, notSelected, notSelected],
        governor: [notSelected, notSelected, notSelected, notSelected],
        residentCommissioner: [selected, notSelected, notSelected, notSelected],
      },
    ],
    [
      "mixt vote with different column candidates selected",
      {
        parties: [selected, notSelected, notSelected, notSelected],
        governor: [notSelected, notSelected, selected, notSelected],
        residentCommissioner: [notSelected, selected, notSelected, notSelected],
      },
    ],
  ])("should error on %s", (_: string, stateBallot: StateBallot) => {
    expect(ballotValidator(stateBallot, BallotType.state)).toEqual(
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
        governor: [notSelected, notSelected, notSelected, notSelected],
        residentCommissioner: [
          notSelected,
          notSelected,
          notSelected,
          notSelected,
        ],
      },
    ],
    [
      "1 governor selected",
      {
        parties: [notSelected, notSelected, notSelected, notSelected],
        governor: [notSelected, notSelected, selected, notSelected],
        residentCommissioner: [
          notSelected,
          notSelected,
          notSelected,
          notSelected,
        ],
      },
    ],
    [
      "1 resident commissioner selected",
      {
        parties: [notSelected, notSelected, notSelected, notSelected],
        governor: [notSelected, notSelected, notSelected, notSelected],
        residentCommissioner: [notSelected, notSelected, notSelected, selected],
      },
    ],
    [
      "1 governor & 1 resident commissioner selected",
      {
        parties: [notSelected, notSelected, notSelected, notSelected],
        governor: [notSelected, selected, notSelected, notSelected],
        residentCommissioner: [notSelected, notSelected, notSelected, selected],
      },
    ],
    [
      "1 party selected & 1 resident commissioner selected",
      {
        parties: [selected, notSelected, notSelected, notSelected],
        governor: [notSelected, notSelected, notSelected, notSelected],
        residentCommissioner: [notSelected, notSelected, notSelected, selected],
      },
    ],
    [
      "1 party selected & 1 governor selected",
      {
        parties: [selected, notSelected, notSelected, notSelected],
        governor: [notSelected, notSelected, notSelected, selected],
        residentCommissioner: [
          notSelected,
          notSelected,
          notSelected,
          notSelected,
        ],
      },
    ],
  ])("should not error on %s", (_: string, stateBallot: StateBallot) => {
    expect(ballotValidator(stateBallot, BallotType.state)).toEqual(
      expect.objectContaining({
        status: ResultStatus.success,
      })
    )
  })
})
