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
} from "../../../../ballot-validator/types"

function generateCandidates(
  section: OcrResult[],
  url?: string,
  votes = 1
): CandidatesRow {
  let writeInVotes = 0

  return section.map((ocrResult: OcrResult, index) => {
    if (section.length - 1 === index && writeInVotes < votes) {
      writeInVotes++

      return new WriteInCandidate()
    } else if (ocrResult.ocrResult) {
      return new Candidate(
        ocrResult.ocrResult,
        url ? `${url}${ocrResult.logoImg}` : undefined
      )
    }

    return new EmptyCandidacy()
  })
}

function countSelected(accum: number, curr: Selection) {
  if (curr === Selection.selected) {
    return accum + 1
  }

  return accum
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

export class StateBallotConfig {
  private totalVotesForGovernor = 1
  private totalVotesForCommissionerResident = 1

  structure: StateBallotStructure
  cols: number

  constructor(ballot: OcrResult[][], path: string) {
    const url = `${CDN_URL}/${path}`

    const parties: PartyRow = generateHeaders(ballot[0], url)
    const governorHeader: Header[] = ballot[1].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const candidatesForGorvernor = generateCandidates(ballot[2], url)
    const commissionerResidentHeader: Header[] = ballot[3].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const candidatesForComissionerResident = generateCandidates(ballot[4], url)

    this.cols = parties.length
    this.structure = [
      parties,
      governorHeader,
      candidatesForGorvernor,
      commissionerResidentHeader,
      candidatesForComissionerResident,
    ]
  }

  get votesForGovernor() {
    return this.totalVotesForGovernor
  }

  get votesForCommissionerResident() {
    return this.totalVotesForCommissionerResident
  }

  countVotes(votes: StateBallot): StateVotesCount {
    const governor = votes.governor.reduce(countSelected, 0)
    const commissionerResident = votes.residentCommissioner.reduce(
      countSelected,
      0
    )

    return {
      governor: `${governor}/${this.votesForGovernor}`,
      commissionerResident: `${commissionerResident}/${this.votesForCommissionerResident}`,
    }
  }
}

type MunicipalVotesCount = {
  mayor: string
  municipalLegislators: string
}

export class MunicipalBallotConfig {
  private totalVotesForMayor = 1
  private totalVotesForLegislators

  structure: MunicipalBallotStructure
  cols: number

  constructor(ballot: OcrResult[][], path: string) {
    const url = `${CDN_URL}/${path}`

    const parties: PartyRow = generateHeaders(ballot[0], url)
    const mayorHeader: Header[] = ballot[1].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const candidatesForMayor = generateCandidates(ballot[2], url)
    const municipalLegislatorHeader: Header[] = ballot[3].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )

    const municipalLegislators = ballot.slice(4)
    const candidatesForMunicipalLegislator = municipalLegislators.map(
      (ocrResult: OcrResult[]) => generateCandidates(ocrResult)
    )

    this.cols = parties.length
    this.totalVotesForLegislators = candidatesForMunicipalLegislator.length
    this.structure = [
      parties,
      mayorHeader,
      candidatesForMayor,
      municipalLegislatorHeader,
      ...candidatesForMunicipalLegislator,
    ]
  }

  get votesForMayor() {
    return this.totalVotesForMayor
  }

  get legislators() {
    return this.totalVotesForLegislators
  }

  countVotes(votes: MunicipalBallot): MunicipalVotesCount {
    const mayor = votes.mayor.reduce(countSelected, 0)
    const municipalLegislators = votes.municipalLegislator.reduce(
      (accum, curr) => {
        const rowResults = curr.reduce(countSelected, 0)

        return accum + rowResults
      },
      0
    )

    return {
      mayor: `${mayor}/${this.votesForMayor}`,
      municipalLegislators: `${municipalLegislators}/${this.legislators}`,
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
  private totalVotesForDistrictRepresentative = 1
  private totalVotesForDistrictSenators = 2
  private totalVotesForAtLargeRepresentatives = 1
  private totalVotesForAtLargeSenators = 1

  structure: LegislativeBallotStructure
  cols: number

  constructor(ballot: OcrResult[][], path: string) {
    const url = `${CDN_URL}/${path}`

    const parties: PartyRow = generateHeaders(ballot[0], url)
    const districtRepresentativeHeader: Header[] = ballot[1].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const candidatesForDistrictRepresentative = generateCandidates(
      ballot[2],
      url
    )

    const districtSenatorHeader: Header[] = ballot[3].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const districtSenators = ballot.slice(4, 6)
    const candidatesForDistrictSenators = districtSenators.map(
      (ocrResult: OcrResult[]) => generateCandidates(ocrResult, url)
    )

    const atLargeRepresentativeHeader: Header[] = ballot[6].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const atLargeRepresentatives = ballot.slice(7, 13)
    const candidatesForAtLargeRepresentatives = atLargeRepresentatives.map(
      (ocrResult: OcrResult[]) => generateCandidates(ocrResult, url, 1)
    )

    // TODO: Uncomment, legislative is incomplete
    const atLargeSenatorHeader: Header[] = ballot[13].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )

    console.log({ atLargeSenatorHeader })

    const atLargeSenators = ballot.slice(15)

    console.log({ atLargeSenators })

    const candidatesForAtLargeSenators = atLargeSenators.map(
      (ocrResult: OcrResult[]) => generateCandidates(ocrResult, url, 1)
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

  get votesForDistrictRepresentatives() {
    return this.totalVotesForDistrictRepresentative
  }

  get votesForDistrictSenators() {
    return this.totalVotesForDistrictSenators
  }

  get votesForAtLargeRepresentatives() {
    return this.totalVotesForAtLargeRepresentatives
  }

  get votesForAtLargeSenators() {
    return this.totalVotesForAtLargeSenators
  }

  countVotes(votes: LegislativeBallot): LegislativeVotesCount {
    const districtRepresentative = votes.districtRepresentative.reduce(
      countSelected,
      0
    )
    const districtSenators = votes.districtSenator.reduce((accum, curr) => {
      const rowResults = curr.reduce(countSelected, 0)

      return accum + rowResults
    }, 0)
    const atLargeRepresentative = votes.atLargeRepresentative.reduce(
      (accum, curr) => {
        const rowResults = curr.reduce(countSelected, 0)

        console.log({ votes, rowResults })

        return accum + rowResults
      },
      0
    )
    const atLargeSenator = votes.atLargeSenator.reduce((accum, curr) => {
      const rowResults = curr.reduce(countSelected, 0)

      return accum + rowResults
    }, 0)

    return {
      districtRepresentative: `${districtRepresentative}/${this.votesForDistrictRepresentatives}`,
      districtSenators: `${districtSenators}/${this.votesForDistrictSenators}`,
      atLargeRepresentative: `${atLargeRepresentative}/${this.votesForAtLargeRepresentatives}`,
      atLargeSenator: `${atLargeSenator}/${this.votesForAtLargeSenators}`,
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
