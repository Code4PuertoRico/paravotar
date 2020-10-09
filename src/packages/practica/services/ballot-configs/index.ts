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
import VotesDetector from "../../../../ballot-validator/detector/index"
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
  structure: StateBallotStructure
  cols: number

  constructor(ballot: OcrResult[][], path: string) {
    const url = `${CDN_URL}/${path}`

    const parties: PartyRow = generateHeaders(ballot[0], url)
    const governorHeader: Header[] = ballot[1].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const candidatesForGorvernor = generateCandidates(
      ballot[BallotPositions.state.governors.start],
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
    const voteType = VotesDetector(votes, BallotType.state)

    if (voteType === "integro") {
      const parties = votes.parties.reduce(countSelected, 0)

      return {
        governor: `${this.votesForGovernor * parties}/${this.votesForGovernor}`,
        commissionerResident: `${this.votesForCommissionerResident * parties}/${
          this.votesForCommissionerResident
        }`,
      }
    } else if (voteType === "candidatura") {
      const governor = votes.governor.reduce(countSelected, 0)
      const commissionerResident = votes.residentCommissioner.reduce(
        countSelected,
        0
      )

      return {
        governor: `${governor}/${this.votesForGovernor}`,
        commissionerResident: `${commissionerResident}/${this.votesForCommissionerResident}`,
      }
    } else if (voteType === "empty") {
      return {
        governor: `0/${this.votesForGovernor}`,
        commissionerResident: `0/${this.votesForCommissionerResident}`,
      }
    }

    // Mixed vote
    const selectedParties: number[] = votes.parties.reduce(
      (accum: number[], vote: Selection, index: number) => {
        if (vote === Selection.selected) {
          return [...accum, index]
        }

        return accum
      },
      []
    )

    // Assume that the user has selected every candidate with it's party vote.
    const votesWithoutParties: StateBallot = {
      governor: votes.governor.reduce(
        (accum: Selection[], vote: Selection, index: number) => {
          if (selectedParties.includes(index)) {
            return accum
          }

          return [...accum, vote]
        },
        []
      ),
      residentCommissioner: votes.residentCommissioner.reduce(
        (accum: Selection[], vote: Selection, index: number) => {
          if (selectedParties.includes(index)) {
            return accum
          }

          return [...accum, vote]
        },
        []
      ),
    }
    const governor = votesWithoutParties.governor.reduce(countSelected, 0)
    const residentCommissioner = votesWithoutParties.residentCommissioner.reduce(
      countSelected,
      0
    )

    return {
      governor: `${governor || ValidMarkLimits.state.governors}/${
        ValidMarkLimits.state.governors
      }`,
      commissionerResident: `${residentCommissioner ||
        ValidMarkLimits.state.commissionerResident}/${
        ValidMarkLimits.state.commissionerResident
      }`,
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
      ballot[BallotPositions.municipal.mayors.start],
      true,
      undefined,
      url
    )
    const municipalLegislatorHeader: Header[] = ballot[3].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )

    const municipalLegislators = ballot.slice(
      BallotPositions.municipal.municipalLegislators.start
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
    const voteType = VotesDetector(votes, BallotType.municipality)

    if (voteType === "integro") {
      const parties = votes.parties.reduce(countSelected, 0)

      return {
        mayor: `${this.votesForMayor * parties}/${this.votesForMayor}`,
        municipalLegislators: `${this.legislators * parties}/${
          this.legislators
        }`,
      }
    } else if (voteType === "candidatura") {
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
    } else if (voteType === "empty") {
      return {
        mayor: `0/${this.votesForMayor}`,
        municipalLegislators: `0/${this.legislators}`,
      }
    }

    // Mixed vote
    const selectedParties: number[] = votes.parties.reduce(
      (accum: number[], vote: Selection, index: number) => {
        if (vote === Selection.selected) {
          return [...accum, index]
        }

        return accum
      },
      []
    )

    // Assume that the user has selected every candidate with it's party vote.
    const votesWithoutParties: MunicipalBallot = {
      mayor: votes.mayor.reduce(
        (accum: Selection[], vote: Selection, index: number) => {
          if (selectedParties.includes(index)) {
            return accum
          }

          return [...accum, vote]
        },
        []
      ),
      municipalLegislator: votes.municipalLegislator.reduce(
        (rows: Selection[][], votes: Selection[]) => {
          const result = votes.reduce(
            (accum: Selection[], vote: Selection, index: number) => {
              if (selectedParties.includes(index)) {
                return accum
              }

              return [...accum, vote]
            },
            []
          )

          return [...rows, result]
        },
        []
      ),
    }
    const mayor = votesWithoutParties.mayor.reduce(countSelected, 0)
    const municipalLegislators = votesWithoutParties.municipalLegislator.reduce(
      (accum, curr) => {
        const rowResults = curr.reduce(countSelected, 0)

        return accum + rowResults
      },
      0
    )

    return {
      mayor: `${mayor || ValidMarkLimits.municipal.mayors}/${
        ValidMarkLimits.municipal.mayors
      }`,
      municipalLegislators: `${
        this.amountOfMunicipalLegislators - 1 - municipalLegislators >= 0
          ? this.amountOfMunicipalLegislators
          : municipalLegislators
      }/${this.amountOfMunicipalLegislators}`,
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
      console.log(result)

      return result
    })

    const parties: PartyRow = generateHeaders(fixedBallots[0], url)
    const districtRepresentativeHeader: Header[] = fixedBallots[1].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const candidatesForDistrictRepresentative = generateCandidates(
      fixedBallots[BallotPositions.legislative.districtRepresentatives.start],
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
      BallotPositions.legislative.atLargeRepresentatives.start,
      BallotPositions.legislative.atLargeRepresentatives.end
    )
    const candidatesForAtLargeRepresentatives = atLargeRepresentatives.map(
      (ocrResult: OcrResult[], index: number) => {
        const hasWriteColumn =
          index + 1 <= ValidMarkLimits.legislative.atLargeRepresentatives

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
      BallotPositions.legislative.atLargeSenators.start
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
    const voteType = VotesDetector(votes, BallotType.legislative)

    if (voteType === "integro") {
      const parties = votes.parties.reduce(countSelected, 0)

      return {
        districtRepresentative: `${this.votesForDistrictRepresentatives *
          parties}/${this.votesForDistrictRepresentatives}`,
        districtSenators: `${this.votesForDistrictSenators * parties}/${
          this.votesForDistrictSenators
        }`,
        atLargeRepresentative: `${this.votesForAtLargeRepresentatives *
          parties}/${this.votesForAtLargeRepresentatives}`,
        atLargeSenator: `${this.votesForAtLargeSenators * parties}/${
          this.votesForAtLargeSenators
        }`,
      }
    } else if (voteType === "candidatura") {
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
    } else if (voteType === "empty") {
      return {
        districtRepresentative: `0/${this.votesForDistrictRepresentatives}`,
        districtSenators: `0/${this.votesForDistrictSenators}`,
        atLargeRepresentative: `0/${this.votesForAtLargeRepresentatives}`,
        atLargeSenator: `0/${this.votesForAtLargeSenators}`,
      }
    }

    // Mixed vote
    const selectedParties: number[] = votes.parties.reduce(
      (accum: number[], vote: Selection, index: number) => {
        if (vote === Selection.selected) {
          return [...accum, index]
        }

        return accum
      },
      []
    )

    // Assume that the user has selected every candidate with it's party vote.
    const votesWithoutParties: LegislativeBallot = {
      districtRepresentative: votes.districtRepresentative.reduce(
        (accum: Selection[], vote: Selection, index: number) => {
          if (selectedParties.includes(index)) {
            return accum
          }

          return [...accum, vote]
        },
        []
      ),
      districtSenator: votes.districtSenator.reduce(
        (rows: Selection[][], votes: Selection[]) => {
          const result = votes.reduce(
            (accum: Selection[], vote: Selection, index: number) => {
              if (selectedParties.includes(index)) {
                return accum
              }

              return [...accum, vote]
            },
            []
          )

          return [...rows, result]
        },
        []
      ),
      atLargeRepresentative: votes.atLargeRepresentative.reduce(
        (rows: Selection[][], votes: Selection[]) => {
          const result = votes.reduce(
            (accum: Selection[], vote: Selection, index: number) => {
              if (selectedParties.includes(index)) {
                return accum
              }

              return [...accum, vote]
            },
            []
          )

          return [...rows, result]
        },
        []
      ),
      atLargeSenator: votes.atLargeSenator.reduce(
        (rows: Selection[][], votes: Selection[]) => {
          const result = votes.reduce(
            (accum: Selection[], vote: Selection, index: number) => {
              if (selectedParties.includes(index)) {
                return accum
              }

              return [...accum, vote]
            },
            []
          )

          return [...rows, result]
        },
        []
      ),
    }
    const districtRepresentative = votesWithoutParties.districtRepresentative.reduce(
      countSelected,
      0
    )
    const districtSenators = votesWithoutParties.districtSenator.reduce(
      (accum, curr) => {
        const rowResults = curr.reduce(countSelected, 0)

        return accum + rowResults
      },
      0
    )
    const atLargeRepresentative = votesWithoutParties.atLargeRepresentative.reduce(
      (accum, curr) => {
        const rowResults = curr.reduce(countSelected, 0)

        return accum + rowResults
      },
      0
    )
    const atLargeSenator = votesWithoutParties.atLargeSenator.reduce(
      (accum, curr) => {
        const rowResults = curr.reduce(countSelected, 0)

        return accum + rowResults
      },
      0
    )

    return {
      districtRepresentative: `${districtRepresentative ||
        ValidMarkLimits.legislative.districtRepresentatives}/${
        ValidMarkLimits.legislative.districtRepresentatives
      }`,
      districtSenators: `${districtSenators ||
        ValidMarkLimits.legislative.districtSenators}/${
        ValidMarkLimits.legislative.districtSenators
      }`,
      atLargeRepresentative: `${atLargeRepresentative ||
        ValidMarkLimits.legislative.atLargeRepresentatives}/${
        ValidMarkLimits.legislative.atLargeRepresentatives
      }`,
      atLargeSenator: `${atLargeSenator ||
        ValidMarkLimits.legislative.atLargeSenators}/${
        ValidMarkLimits.legislative.atLargeSenators
      }`,
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
