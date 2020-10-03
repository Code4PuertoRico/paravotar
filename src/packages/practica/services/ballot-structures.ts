import { CDN_URL } from "./constants"
import { OcrResult } from "./types"

export class Party {
  insignia
  name

  constructor(name: string, insignia: string) {
    this.insignia = `${CDN_URL}/papeletas/2016/gobernador-y-comisionado-residente/${insignia}`
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
    this.img = img
      ? `${CDN_URL}/papeletas/2016/gobernador-y-comisionado-residente/${img}`
      : undefined
    this.name = name
  }
}

export type StateBallotStructure = [
  (Party | Rule)[],
  Header[],
  Candidate[],
  Header[],
  Candidate[]
]

export class StateBallot {
  structure: StateBallotStructure

  constructor(ballot: OcrResult[][]) {
    const parties: (Party | Rule)[] = ballot[0].map((ocrResult: OcrResult) => {
      if (ocrResult.logoImg) {
        return new Party(ocrResult.ocrResult, ocrResult.logoImg || "")
      }

      return new Rule(ocrResult.ocrResult)
    })
    const governorHeader: Header[] = ballot[1].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const candidatesForGorvernor: Candidate[] = ballot[2].map(
      (ocrResult: OcrResult) =>
        new Candidate(ocrResult.ocrResult, ocrResult.logoImg)
    )
    const commissionerResidentHeader: Header[] = ballot[3].map(
      (ocrResult: OcrResult) => new Header(ocrResult.ocrResult)
    )
    const candidatesForComissionerResident: Candidate[] = ballot[4].map(
      (ocrResult: OcrResult) =>
        new Candidate(ocrResult.ocrResult, ocrResult.logoImg)
    )

    this.structure = [
      parties,
      governorHeader,
      candidatesForGorvernor,
      commissionerResidentHeader,
      candidatesForComissionerResident,
    ]
  }
}
