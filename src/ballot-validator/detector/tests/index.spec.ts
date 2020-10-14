import detector from ".."
import {
  StateBallot,
  BallotType,
  Selection,
  MunicipalBallot,
  LegislativeBallot,
} from "../../types"

const { selected, notSelected } = Selection

describe("Ballot Type Detector", () => {
  describe("State Ballot", () => {
    it("should be of type empty", () => {
      const stateBallot: StateBallot = {
        parties: [notSelected, notSelected, notSelected],
        governor: [notSelected, notSelected, notSelected],
        residentCommissioner: [notSelected, notSelected, notSelected],
      }

      expect(detector(stateBallot, BallotType.state)).toEqual("empty")
    })

    it.each([
      {
        parties: [notSelected, notSelected, selected],
        governor: [notSelected, notSelected, notSelected],
        residentCommissioner: [notSelected, notSelected, notSelected],
      },
    ])("should be of type integro", (stateBallot: StateBallot) => {
      expect(detector(stateBallot, BallotType.state)).toEqual("integro")
    })

    it.each([
      {
        parties: [notSelected, notSelected, notSelected],
        governor: [selected, notSelected, notSelected],
        residentCommissioner: [notSelected, notSelected, notSelected],
      },
      {
        parties: [notSelected, notSelected, notSelected],
        governor: [selected, notSelected, notSelected],
        residentCommissioner: [selected, notSelected, notSelected],
      },
      {
        parties: [notSelected, notSelected, notSelected],
        governor: [notSelected, notSelected, selected],
        residentCommissioner: [selected, notSelected, notSelected],
      },
    ])("should be of type candidatura", (stateBallot: StateBallot) => {
      expect(detector(stateBallot, BallotType.state)).toEqual("candidatura")
    })

    it.each([
      {
        parties: [selected, notSelected, notSelected],
        governor: [selected, notSelected, notSelected],
        residentCommissioner: [notSelected, selected, notSelected],
      },
      {
        parties: [selected, notSelected, notSelected],
        governor: [notSelected, notSelected, notSelected],
        residentCommissioner: [notSelected, selected, notSelected],
      },
      {
        parties: [selected, notSelected, notSelected],
        governor: [notSelected, selected, notSelected],
        residentCommissioner: [notSelected, notSelected, notSelected],
      },
    ])("should be of type mixto", (stateBallot: StateBallot) => {
      expect(detector(stateBallot, BallotType.state)).toEqual("mixto")
    })
  })

  describe("Municipal Ballot", () => {
    it("should be of type empty", () => {
      const municipalBallot: MunicipalBallot = {
        parties: [notSelected, notSelected, notSelected],
        mayor: [notSelected, notSelected, notSelected],
        municipalLegislator: [
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
        ],
      }

      expect(detector(municipalBallot, BallotType.municipality)).toEqual(
        "empty"
      )
    })

    it.each([
      {
        parties: [selected, notSelected, notSelected],
        mayor: [notSelected, notSelected, notSelected],
        municipalLegislator: [
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
        ],
      },
    ])("should be of type integro", (municipalBallot: MunicipalBallot) => {
      expect(detector(municipalBallot, BallotType.municipality)).toEqual(
        "integro"
      )
    })

    it.each([
      {
        parties: [notSelected, notSelected, notSelected],
        mayor: [notSelected, notSelected, notSelected],
        municipalLegislator: [
          [selected, notSelected, notSelected],
          [selected, notSelected, notSelected],
          [selected, notSelected, notSelected],
        ],
      },
      {
        parties: [notSelected, notSelected, notSelected],
        mayor: [notSelected, selected, notSelected],
        municipalLegislator: [
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
        ],
      },
      {
        parties: [notSelected, notSelected, notSelected],
        mayor: [notSelected, selected, notSelected],
        municipalLegislator: [
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, selected],
          [notSelected, notSelected, notSelected],
        ],
      },
    ])("should be of type candidatura", (municipalBallot: MunicipalBallot) => {
      expect(detector(municipalBallot, BallotType.municipality)).toEqual(
        "candidatura"
      )
    })

    it.each([
      {
        parties: [selected, notSelected, notSelected],
        mayor: [notSelected, selected, notSelected],
        municipalLegislator: [
          [selected, notSelected, notSelected],
          [notSelected, notSelected, selected],
          [notSelected, notSelected, notSelected],
        ],
      },
      {
        parties: [selected, notSelected, notSelected],
        mayor: [notSelected, selected, notSelected],
        municipalLegislator: [
          [notSelected, selected, notSelected],
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
        ],
      },
      {
        parties: [selected, notSelected, notSelected],
        mayor: [notSelected, notSelected, selected],
        municipalLegislator: [
          [notSelected, notSelected, notSelected],
          [notSelected, selected, notSelected],
          [notSelected, notSelected, selected],
        ],
      },
    ])("should be of type mixto", (municipalBallot: MunicipalBallot) => {
      expect(detector(municipalBallot, BallotType.municipality)).toEqual(
        "mixto"
      )
    })
  })

  describe("Legislative Ballot", () => {
    it("should be of type empty", () => {
      const legislativeBallot: LegislativeBallot = {
        parties: [notSelected, notSelected, notSelected],
        districtRepresentative: [notSelected, notSelected, notSelected],
        districtSenator: [
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
        ],
        atLargeRepresentative: [
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
        ],
        atLargeSenator: [
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
        ],
      }

      expect(detector(legislativeBallot, BallotType.legislative)).toEqual(
        "empty"
      )
    })

    it.each([
      {
        parties: [selected, notSelected, notSelected],
        districtRepresentative: [notSelected, notSelected, notSelected],
        districtSenator: [
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
        ],
        atLargeRepresentative: [
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
        ],
        atLargeSenator: [
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
        ],
      },
    ])("should be of type integro", (legislativeBallot: LegislativeBallot) => {
      expect(detector(legislativeBallot, BallotType.legislative)).toEqual(
        "integro"
      )
    })

    it.each([
      {
        parties: [notSelected, notSelected, notSelected],
        districtRepresentative: [notSelected, notSelected, notSelected],
        districtSenator: [
          [notSelected, notSelected, notSelected],
          [notSelected, selected, notSelected],
        ],
        atLargeRepresentative: [
          [selected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
        ],
        atLargeSenator: [
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
        ],
      },
      {
        parties: [notSelected, notSelected, notSelected],
        districtRepresentative: [notSelected, notSelected, notSelected],
        districtSenator: [
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
        ],
        atLargeRepresentative: [
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
        ],
        atLargeSenator: [
          [selected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
        ],
      },
    ])(
      "should be of type candidatura",
      (legislativeBallot: LegislativeBallot) => {
        expect(detector(legislativeBallot, BallotType.legislative)).toEqual(
          "candidatura"
        )
      }
    )

    it.each([
      {
        parties: [selected, notSelected, notSelected],
        districtRepresentative: [notSelected, notSelected, notSelected],
        districtSenator: [
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
        ],
        atLargeRepresentative: [
          [notSelected, selected, notSelected],
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
        ],
        atLargeSenator: [
          [selected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
        ],
      },
      {
        parties: [selected, notSelected, notSelected],
        districtRepresentative: [notSelected, notSelected, notSelected],
        districtSenator: [
          [notSelected, notSelected, notSelected],
          [notSelected, selected, notSelected],
        ],
        atLargeRepresentative: [
          [notSelected, selected, notSelected],
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
        ],
        atLargeSenator: [
          [selected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
          [notSelected, notSelected, notSelected],
        ],
      },
    ])("should be of type mixto", (legislativeBallot: LegislativeBallot) => {
      expect(detector(legislativeBallot, BallotType.legislative)).toEqual(
        "mixto"
      )
    })
  })
})
