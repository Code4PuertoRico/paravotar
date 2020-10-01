import validator from "../../index"
import {
  BallotType,
  ResultStatus,
  RuleOutcomeType,
  StateBallot,
} from "../../types"

describe("Ballot Validator", () => {
  it("should error on empty selections", () => {
    const stateBallot: StateBallot = {
      parties: [0, 0, 0, 0],
      governor: [0, 0, 0, 0],
      residentComisioner: [0, 0, 0, 0],
    }

    expect(validator(stateBallot, BallotType.state)).toEqual({
      status: ResultStatus.failure,
      outcomes: [
        {
          outcome: RuleOutcomeType.deny,
          ruleName: "NoEmptyBallotRule",
        },
      ],
    })
  })

  it("should not error on 1 selection", () => {
    const stateBallot: StateBallot = {
      parties: [1, 0, 0, 0],
      governor: [0, 0, 0, 0],
      residentComisioner: [0, 0, 0, 0],
    }

    expect(validator(stateBallot, BallotType.state)).toEqual({
      status: ResultStatus.success,
      outcomes: [
        {
          outcome: RuleOutcomeType.allow,
          ruleName: "NoEmptyBallotRule",
        },
      ],
    })
  })
})
