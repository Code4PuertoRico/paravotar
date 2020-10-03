import {
  Selection,
  StateBallot as IStateBallot,
  MunicipalBallot as IMunicipalBallot,
  LegislativeBallot as ILegislativeBallot,, BallotType
} from "../../../ballot-validator/types"
import { CDN_URL } from "./constants"
import { OcrResult } from "./types"
import { VotesCoordinates } from "../../generate-ballot/types/ballot-machine"

export class Party {
  insignia
  name

  constructor(name: string, insignia: string) {
    this.insignia = insignia
    this.name = name
  }
}

export class Rule {
  rule

  constructor(rule: string) {
    this.rule = rule
  }
}

export class Header {
  info

  constructor(info: string) {
    this.info = info
  }
}

export class Candidate {
  img
  name

  constructor(name: string, img?: string) {
    this.img = img ? img : undefined
    this.name = name
  }
}

type MarkAsSelectedArgs = {
  votes: Selection[]
  position: number
}

function markAsSelected({ votes, position }: MarkAsSelectedArgs) {
  return [
    ...votes.slice(0, position),
    Selection.selected,
    ...votes.slice(position + 1),
  ]
}

export type BallotStructure = [
  (Party | Rule)[],
  Header[],
  Candidate[],
  Header[],
  Candidate[]
]

export class StateBallotStructure {
  structure: BallotStructure
  numberOfCols: number

  constructor(ballot: OcrResult[][], path: string) {
    const url = `${CDN_URL}${path}`

    const parties: (Party | Rule)[] = ballot[0].map((ocrResult: OcrResult) => {
      if (ocrResult.logoImg) {
        return new Party(ocrResult.ocrResult, `${url}/${ocrResult.logoImg}`)
      }

      return new Rule(ocrResult.ocrResult)
    })
    const governorHeader: Header[] = ballot[1].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const candidatesForGorvernor: Candidate[] = ballot[2].map(
      (ocrResult: OcrResult) =>
        new Candidate(ocrResult.ocrResult, `${url}/${ocrResult.logoImg}`)
    )
    const commissionerResidentHeader: Header[] = ballot[3].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const candidatesForComissionerResident: Candidate[] = ballot[4].map(
      (ocrResult: OcrResult) =>
        new Candidate(ocrResult.ocrResult, `${url}/${ocrResult.logoImg}`)
    )

    this.numberOfCols = parties.length
    this.structure = [
      parties,
      governorHeader,
      candidatesForGorvernor,
      commissionerResidentHeader,
      candidatesForComissionerResident,
    ]
  }

  convertVotes(votes: VotesCoordinates[]): IStateBallot {
    const parties = new Array(this.numberOfCols).fill(Selection.notSelected)
    const governor = new Array(this.numberOfCols).fill(Selection.notSelected)
    const residentCommissioner = Array(this.numberOfCols).fill(
      Selection.notSelected
    )
    const initialValue: IStateBallot = {
      parties,
      governor,
      residentCommissioner,
    }

    return votes.reduce((prev, curr): IStateBallot => {
      if (curr.row === 0) {
        return {
          ...prev,
          parties: markAsSelected({
            votes: prev.parties,
            position: curr.column,
          }),
        }
      } else if (curr.row === 2) {
        return {
          ...prev,
          governor: markAsSelected({
            votes: prev.governor,
            position: curr.column,
          }),
        }
      } else if (curr.row === 4) {
        return {
          ...prev,
          residentCommissioner: markAsSelected({
            votes: prev.residentCommissioner,
            position: curr.column,
          }),
        }
      }

      return prev
    }, initialValue)
  }
}

export class MunicipalBallotStructure {
  structure: BallotStructure
  numberOfCols: number
  numberOfMunicipalLegislators: number

  constructor(ballot: OcrResult[][], path: string) {
    const url = `${CDN_URL}${path}`

    const parties: (Party | Rule)[] = ballot[0].map((ocrResult: OcrResult) => {
      if (ocrResult.logoImg) {
        return new Party(ocrResult.ocrResult, `${url}/${ocrResult.logoImg}`)
      }

      return new Rule(ocrResult.ocrResult)
    })
    const mayorHeader: Header[] = ballot[1].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const candidatesForMayor: Candidate[] = ballot[2].map(
      (ocrResult: OcrResult) =>
        new Candidate(ocrResult.ocrResult, `${url}/${ocrResult.logoImg}`)
    )
    const municipalLegislatorHeader: Header[] = ballot[3].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )

    const municipalLegislators = ballot.slice(4)
    const candidatesForMunicipalLegislator: Candidate[][] = municipalLegislators.map(
      (ocrResult: OcrResult[]) =>
        ocrResult.map((result: OcrResult) => new Candidate(result.ocrResult))
    )

    this.numberOfCols = parties.length
    this.numberOfMunicipalLegislators = candidatesForMunicipalLegislator.length
    this.structure = [
      parties,
      mayorHeader,
      candidatesForMayor,
      municipalLegislatorHeader,
      ...candidatesForMunicipalLegislator,
    ]
  }

  convertVotes(votes: VotesCoordinates[]): IMunicipalBallot {
    // TODO: The columns in a municipal ballot can change depending on the town.
    const parties = new Array(this.numberOfCols).fill(Selection.notSelected)
    const mayor = new Array(this.numberOfCols).fill(Selection.notSelected)
    // TODO: We need to specify the amount of municipal legislators that a town can select.
    const municipalLegislator = new Array(this.numberOfMunicipalLegislators).fill(null)

    municipalLegislator.forEach((_, index) => {
      municipalLegislator[index] = new Array(this.numberOfCols).fill(Selection.notSelected)
    })

    const initialValue: IMunicipalBallot = {
      parties,
      mayor,
      municipalLegislator,
    }

    return votes.reduce((prev, curr): IMunicipalBallot => {
      if (curr.row === 0) {
        return {
          ...prev,
          parties: markAsSelected({
            votes: prev.parties,
            position: curr.column,
          }),
        }
      } else if (curr.row === 2) {
        return {
          ...prev,
          mayor: markAsSelected({
            votes: prev.mayor,
            position: curr.column,
          }),
        }
      }

      // Municipal legislators come after row 3.
      // If my coordinate is on row 4 I have to subtract 4 - (3 + 1) to target the first row of the municipal legislator array.
      return {
        ...prev,
        municipalLegislator: prev.municipalLegislator.map(row => {
          if (curr.row - 4) {
            return markAsSelected({
              votes: row,
              position: curr.column,
            })
          }

          return row
        }),
      }
    }, initialValue)
  }
}

export class LegislativeBallotStructure {
  structure: BallotStructure
  numberOfCols: number

  constructor(ballot: OcrResult[][], path: string) {
    const url = `${CDN_URL}${path}`

    const parties: (Party | Rule)[] = ballot[0].map((ocrResult: OcrResult) => {
      if (ocrResult.logoImg) {
        return new Party(ocrResult.ocrResult, `${url}/${ocrResult.logoImg}`)
      }

      return new Rule(ocrResult.ocrResult)
    })

    const districtRepresentativeHeader: Header[] = ballot[1].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const candidatesForDistrictRepresentative: Candidate[] = ballot[2].map(
      (ocrResult: OcrResult) =>
        new Candidate(ocrResult.ocrResult, `${url}/${ocrResult.logoImg}`)
    )

    const districtSenatorHeader: Header[] = ballot[3].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const districtSenators = ballot.slice(4, 6)
    const candidatesForDistrictSenators: Candidate[][] = districtSenators.map(
      (ocrResult: OcrResult[]) =>
        ocrResult.map((result: OcrResult) => new Candidate(result.ocrResult))
    )

    const atLargeRepresentativeHeader: Header[] = ballot[6].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const atLargeRepresentatives = ballot.slice(7, 14)
    const candidatesForAtLargeRepresentatives: Candidate[][] = atLargeRepresentatives.map(
      (ocrResult: OcrResult[]) =>
        ocrResult.map((result: OcrResult) => new Candidate(result.ocrResult))
    )

    // TODO: Uncomment, legislative is incomplete

    // const atLargeSenatorHeader: Header[] = ballot[14].map(
    //   (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    // )
    // const atLargeSenators = ballot.slice(15)
    // const candidatesForAtLargeSenators: Candidate[][] = atLargeSenators.map(
    //   (ocrResult: OcrResult[]) =>
    //     ocrResult.map((result: OcrResult) => new Candidate(result.ocrResult))
    // )

    this.numberOfCols = parties.length
    this.structure = [
      parties,
      districtRepresentativeHeader,
      candidatesForDistrictRepresentative,
      districtSenatorHeader,
      ...candidatesForDistrictSenators,
      atLargeRepresentativeHeader,
      ...candidatesForAtLargeRepresentatives,
      // atLargeSenatorHeader,
      // ...candidatesForAtLargeSenators,
    ]
  }

  convertVotes(votes: VotesCoordinates[]): IMunicipalBallot {
    // TODO: The columns in a municipal ballot can change depending on the town.
    const parties = new Array(this.numberOfCols).fill(Selection.notSelected)
    const mayor = new Array(this.numberOfCols).fill(Selection.notSelected)
    // TODO: We need to specify the amount of municipal legislators that a town can select.
    const municipalLegislator = new Array(5).fill(null)

    municipalLegislator.forEach((_, index) => {
      municipalLegislator[index] = new Array(this.numberOfCols).fill(Selection.notSelected)
    })

    const initialValue: IMunicipalBallot = {
      parties,
      mayor,
      municipalLegislator,
    }

    return votes.reduce((prev, curr): IMunicipalBallot => {
      if (curr.row === 0) {
        return {
          ...prev,
          parties: markAsSelected({
            votes: prev.parties,
            position: curr.column,
          }),
        }
      } else if (curr.row === 2) {
        return {
          ...prev,
          mayor: markAsSelected({
            votes: prev.mayor,
            position: curr.column,
          }),
        }
      }

      // Municipal legislators come after row 3.
      // If my coordinate is on row 4 I have to subtract 4 - (3 + 1) to target the first row of the municipal legislator array.
      return {
        ...prev,
        municipalLegislator: prev.municipalLegislator.map(row => {
          if (curr.row - 4) {
            return markAsSelected({
              votes: row,
              position: curr.column,
            })
          }

          return row
        }),
      }
    }, initialValue)
  }
}
