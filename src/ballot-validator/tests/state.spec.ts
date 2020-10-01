import { StateBallot, Selection, BallotType, ResultStatus } from "../types"
import ballotValidator from "../index"

const { selected, notSelected } = Selection

describe("State Ballot", () => {
  it("should error on empty selections", () => {
    const stateBallot: StateBallot = {
      parties: [notSelected, notSelected, notSelected, notSelected],
      governor: [notSelected, notSelected, notSelected, notSelected],
      residentComisioner: [notSelected, notSelected, notSelected, notSelected],
    }

    expect(ballotValidator(stateBallot, BallotType.state)).toEqual(
      expect.objectContaining({
        status: ResultStatus.failure,
      })
    )
  })

  it("should not error on 1 selection", () => {
    const stateBallot: StateBallot = {
      parties: [selected, notSelected, notSelected, notSelected],
      governor: [notSelected, notSelected, notSelected, notSelected],
      residentComisioner: [notSelected, notSelected, notSelected, notSelected],
    }

    expect(ballotValidator(stateBallot, BallotType.state)).toEqual(
      expect.objectContaining({
        status: ResultStatus.success,
      })
    )
  })
})
