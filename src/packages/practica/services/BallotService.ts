import _ from "lodash"
import levenshtein from "fast-levenshtein"
import memoize from "memoizee"
import {
  BALLOT_SECTION_TITLES_LIST,
  SECTION_METADATA,
  BALLOT_SECTION_TITLES,
} from "./constants"
import { SectionMetadata } from "../types/practica-mobile"

type BallotDetails = { ocrResult: string; logoImg?: string }[][]

export class BallotService {
  private prefix = ""
  private details: BallotDetails

  private selectedParty: undefined | number
  private selectedCandidatesPerSection: {
    [key: string]: { r: number; c: number }[]
  } = {}

  constructor(
    prefix: string,
    details: { ocrResult: string; logoImg?: string }[][]
  ) {
    this.prefix = prefix
    this.details = details
  }

  private getImgUrl(imgName: string) {
    return `${this.prefix}/${imgName}`
  }

  private isSection(text: string) {
    return BALLOT_SECTION_TITLES_LIST.some(
      s => levenshtein.get(text.slice(0, s.length + 1), s) <= 3
    )
  }

  private getSectionMetadata(text: string) {
    const sectionTitle = BALLOT_SECTION_TITLES_LIST.sort((a, b) => {
      const levenA = levenshtein.get(text, a)
      const levenB = levenshtein.get(text, b)
      if (levenA < levenB) {
        return -1
      } else if (levenA > levenB) {
        return 1
      }
      return 0
    })[0]

    return SECTION_METADATA[sectionTitle as BALLOT_SECTION_TITLES]
  }

  public getParties = memoize(() => {
    return this.details[0].slice(0, this.details[0].length - 1).map(cell => {
      let imgUrl = undefined

      if (cell.logoImg) {
        imgUrl = this.getImgUrl(cell.logoImg)
      }

      const text = cell.ocrResult.replace(/\\r\\n/g, " ")

      return {
        text,
        imgUrl,
        isIndependent:
          levenshtein.get(text.slice(0, 30), "CANDIDATOS(AS) INDEPENDIENTES") <=
          3,
      }
    })
  })

  public getSections = memoize(() => {
    const sections = []

    let s: {
      title: string
      rows: BallotDetails
      metadata: SectionMetadata
    } = {
      title: this.details[1][0].ocrResult,
      metadata: this.getSectionMetadata(this.details[1][0].ocrResult),
      rows: [],
    }

    for (let r = 2; r <= this.details.length - 1; r++) {
      const isSection = this.isSection(
        this.details[r][0].ocrResult.replace(/\\r\\n/g, " ")
      )

      if (isSection) {
        sections.push(s)

        s = {
          title: this.details[r][0].ocrResult,
          metadata: this.getSectionMetadata(this.details[r][0].ocrResult),
          rows: [],
        }

        continue
      }

      s.rows.push(this.details[r])
    }

    sections.push(s)

    return sections
  })

  public findCandidateParty(column: number) {
    return this.getParties()[column]
  }

  public selectParty(column: number) {
    if (column === -1) {
      this.selectedParty = undefined
    } else {
      this.selectedParty = column
    }
  }

  public getSelectedParty() {
    return this.selectedParty
  }

  public selectCandidate(sectionName: string, row: number, column: number) {
    const section = this.getSections().filter(s => s.title === sectionName)[0]

    if (!this.selectedCandidatesPerSection[sectionName]) {
      this.selectedCandidatesPerSection[sectionName] = []
    }

    const selections = this.selectedCandidatesPerSection[sectionName]

    const idx = selections.findIndex(({ r, c }) => r === row && c === column)

    if (idx > -1) {
      selections.splice(idx, 1)
      return
    }

    if (selections.length >= section.metadata.limit) {
      throw Error("Can not select more candidates for this section")
    }

    selections.push({ r: row, c: column })

    this.selectedCandidatesPerSection[sectionName] = selections
  }
}
