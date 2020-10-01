import validator from "../../index"
import {
  BallotType,
  ResultStatus,
  RuleOutcomeType,
  Selections,
} from "../../types"

describe("Ballot Validator", () => {
  it("should error on empty selections", () => {
    const stateBallot: Selections = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]

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
    const stateBallot: Selections = [
      [0, 0, 0, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]

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
