import { CDN_URL } from "../constants"
import {
  CandidatesRow,
  LegislativeBallotStructure,
  MunicipalBallotStructure,
  PartyRow,
  StateBallotStructure,
} from "./types"
import { OcrResult } from "../types"
import {
  Candidate,
  EmptyCandidacy,
  Header,
  Party,
  Rule,
  WriteInCandidate,
  WriteInRules,
} from "./base"
import {
  MunicipalBallot,
  Selection,
  StateBallot,
  LegislativeBallot,
  BallotType,
} from "../../../../ballot-validator/types"
import { BallotPositions, ValidMarkLimits } from "./constants"

function generateCandidates(
  section: OcrResult[],
  receivesImplicitVote: boolean,
  accumulationNumber?: number,
  url?: string,
  hasWriteInColumn = true
): CandidatesRow {
  return section.map((ocrResult: OcrResult, index) => {
    if (section.length - 1 === index && hasWriteInColumn) {
      return new WriteInCandidate(accumulationNumber)
    } else if (ocrResult.ocrResult) {
      return new Candidate(
        ocrResult.ocrResult,
        receivesImplicitVote,
        accumulationNumber,
        url ? `${url}${ocrResult.logoImg}` : undefined
      )
    }

    return new EmptyCandidacy()
  })
}

type StateVotesCount = {
  governor: string
  commissionerResident: string
}

function generateHeaders(section: OcrResult[], url: string) {
  return section.map((ocrResult: OcrResult, index) => {
    if (ocrResult.logoImg) {
      return new Party(ocrResult.ocrResult, `${url}${ocrResult.logoImg}`)
    }

    if (index + 1 === section.length) {
      return new WriteInRules()
    }

    return new Rule(ocrResult.ocrResult)
  })
}

function countVotesForSection(section: Selection[]) {
  return section.reduce((count, selection) => {
    if (
      selection === Selection.selected ||
      selection === Selection.selectedImplicitly
    ) {
      return count + 1
    }

    return count
  }, 0)
}

export class StateBallotConfig {
  structure: StateBallotStructure
  cols: number

  constructor(ballot: OcrResult[][], path: string) {
    const url = `${CDN_URL}/${path}`

    const parties: PartyRow = generateHeaders(ballot[0], url)
    const governorHeader: Header[] = ballot[1].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const candidatesForGorvernor = generateCandidates(
      ballot[BallotPositions.state.governor.start],
      true,
      1,
      url
    )
    const commissionerResidentHeader: Header[] = ballot[3].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const candidatesForComissionerResident = generateCandidates(
      ballot[BallotPositions.state.commissionerResident.start],
      true,
      2,
      url
    )

    this.cols = parties.length
    this.structure = [
      parties,
      governorHeader,
      candidatesForGorvernor,
      commissionerResidentHeader,
      candidatesForComissionerResident,
    ]
  }

  countVotes(votes: StateBallot): StateVotesCount {
    const governor = countVotesForSection(votes.governor)
    const commissionerResident = countVotesForSection(
      votes.residentCommissioner
    )

    return {
      governor: `${governor}/${ValidMarkLimits.state.governor}`,
      commissionerResident: `${commissionerResident}/${ValidMarkLimits.state.commissionerResident}`,
    }
  }
}

type MunicipalVotesCount = {
  mayor: string
  municipalLegislators: string
}

export class MunicipalBallotConfig {
  structure: MunicipalBallotStructure
  cols: number
  amountOfMunicipalLegislators: number

  constructor(ballot: OcrResult[][], path: string) {
    const url = `${CDN_URL}/${path}`

    const parties: PartyRow = generateHeaders(ballot[0], url)
    const mayorHeader: Header[] = ballot[1].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const candidatesForMayor = generateCandidates(
      ballot[BallotPositions.municipality.mayor.start],
      true,
      undefined,
      url
    )
    const municipalLegislatorHeader: Header[] = ballot[3].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )

    const municipalLegislators = ballot.slice(
      BallotPositions[BallotType.municipality].municipalLegislators.start
    )
    const candidatesForMunicipalLegislator = municipalLegislators.map(
      (ocrResult: OcrResult[], index: number) =>
        generateCandidates(ocrResult, true, index + 1)
    )

    this.cols = parties.length
    this.amountOfMunicipalLegislators = candidatesForMunicipalLegislator.length
    this.structure = [
      parties,
      mayorHeader,
      candidatesForMayor,
      municipalLegislatorHeader,
      ...candidatesForMunicipalLegislator,
    ]
  }

  countVotes(votes: MunicipalBallot): MunicipalVotesCount {
    const mayor = countVotesForSection(votes.mayor)
    const municipalLegislators = votes.municipalLegislator.reduce(
      (accum, candidates) => {
        const votes = countVotesForSection(candidates)

        return accum + votes
      },
      0
    )

    return {
      mayor: `${mayor}/${ValidMarkLimits[BallotType.municipality].mayor}`,
      municipalLegislators: `${municipalLegislators}/${this.amountOfMunicipalLegislators}`,
    }
  }
}

type LegislativeVotesCount = {
  districtRepresentative: string
  districtSenators: string
  atLargeRepresentative: string
  atLargeSenator: string
}

export class LegislativeBallotConfig {
  structure: LegislativeBallotStructure
  cols: number

  constructor(ballot: OcrResult[][], path: string) {
    const url = `${CDN_URL}/${path}`

    // HACK: Add one item to every ocr result to we can generate the correct amount of columns
    const fixedBallots: OcrResult[][] = ballot.map((result: OcrResult[]) => {
      result.push({ ocrResult: "" })

      return result
    })

    const parties: PartyRow = generateHeaders(fixedBallots[0], url)
    const districtRepresentativeHeader: Header[] = fixedBallots[1].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const candidatesForDistrictRepresentative = generateCandidates(
      fixedBallots[BallotPositions.legislative.districtRepresentative.start],
      true,
      1,
      url
    )

    const districtSenatorHeader: Header[] = fixedBallots[3].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const districtSenators = fixedBallots.slice(
      BallotPositions.legislative.districtSenators.start,
      BallotPositions.legislative.districtSenators.end
    )
    const candidatesForDistrictSenators = districtSenators.map(
      (ocrResult: OcrResult[], index: number) => {
        const hasWriteColumn =
          index + 1 <= ValidMarkLimits.legislative.districtSenators

        return generateCandidates(
          ocrResult,
          true,
          index + 2,
          url,
          hasWriteColumn
        )
      }
    )

    const atLargeRepresentativeHeader: Header[] = fixedBallots[6].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const atLargeRepresentatives = fixedBallots.slice(
      BallotPositions.legislative.atLargeRepresentative.start,
      BallotPositions.legislative.atLargeRepresentative.end
    )
    const candidatesForAtLargeRepresentatives = atLargeRepresentatives.map(
      (ocrResult: OcrResult[], index: number) => {
        const hasWriteColumn =
          index + 1 <= ValidMarkLimits.legislative.atLargeRepresentative

        return generateCandidates(
          ocrResult,
          index === 0,
          index + 4,
          url,
          hasWriteColumn
        )
      }
    )

    const atLargeSenatorHeader: Header[] = fixedBallots[13].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const atLargeSenators = fixedBallots.slice(
      BallotPositions.legislative.atLargeSenator.start
    )
    const candidatesForAtLargeSenators = atLargeSenators.map(
      (ocrResult: OcrResult[], index: number) => {
        const hasWriteColumn =
          index + 1 <= ValidMarkLimits.legislative.districtSenators

        return generateCandidates(
          ocrResult,
          index === 0,
          index + 10,
          url,
          hasWriteColumn
        )
      }
    )

    this.cols = parties.length
    this.structure = [
      parties,
      districtRepresentativeHeader,
      candidatesForDistrictRepresentative,
      districtSenatorHeader,
      ...candidatesForDistrictSenators,
      atLargeRepresentativeHeader,
      ...candidatesForAtLargeRepresentatives,
      atLargeSenatorHeader,
      ...candidatesForAtLargeSenators,
    ]
  }

  countVotes(votes: LegislativeBallot): LegislativeVotesCount {
    const districtRepresentative = countVotesForSection(
      votes.districtRepresentative
    )
    const districtSenators = votes.districtSenator.reduce(
      (accum, candidates) => {
        const votes = countVotesForSection(candidates)

        return accum + votes
      },
      0
    )
    const atLargeRepresentative = votes.atLargeRepresentative.reduce(
      (accum, candidates) => {
        const votes = countVotesForSection(candidates)

        return accum + votes
      },
      0
    )
    const atLargeSenator = votes.atLargeSenator.reduce((accum, candidates) => {
      const votes = countVotesForSection(candidates)

      return accum + votes
    }, 0)

    return {
      districtRepresentative: `${districtRepresentative}/${ValidMarkLimits.legislative.districtRepresentative}`,
      districtSenators: `${districtSenators}/${ValidMarkLimits.legislative.districtSenators}`,
      atLargeRepresentative: `${atLargeRepresentative}/${ValidMarkLimits.legislative.atLargeRepresentative}`,
      atLargeSenator: `${atLargeSenator}/${ValidMarkLimits.legislative.atLargeSenator}`,
    }
  }
}

export type VoteCounts =
  | StateVotesCount
  | MunicipalVotesCount
  | LegislativeVotesCount

export type BallotConfigs =
  | StateBallotConfig
  | MunicipalBallotConfig
  | LegislativeBallotConfig
