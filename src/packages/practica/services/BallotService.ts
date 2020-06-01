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
    [key: string]: { row: number; column: number }[]
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

  public setParty(column: number) {
    if (column === -1) {
      this.selectedParty = undefined
    } else {
      this.selectedParty = column
    }
  }

  public getSelectedParty() {
    if (this.selectedParty !== undefined) {
      return this.getParties()[this.selectedParty]
    }
    return undefined
  }

  public getPreferredCandidatesByParty() {
    if (this.selectedParty === undefined) {
      return []
    }

    return this.getSections().reduce(
      (acum, s) => {
        const limit = s.metadata.limit
        const section: any = {
          title: s.title,
          candidates: [],
        }
        let rowIdx = 0

        while (section.candidates.length < limit) {
          section.candidates.push({
            candidate: s.rows[rowIdx][this.selectedParty!],
            coords: {
              row: acum.rowIdx + 1 + rowIdx,
              column: this.selectedParty!,
            },
          })

          rowIdx += 1
        }

        acum.selections.push(section)

        return {
          rowIdx: acum.rowIdx + 1 + s.rows.length,
          selections: acum.selections,
        }
      },
      { rowIdx: 1, selections: [] } as {
        rowIdx: number
        selections: {
          title: string
          candidates: [
            {
              candidate: { ocrResult: string; logoImg?: string }
              coords: { row: number; column: number }
            }
          ]
        }[]
      }
    ).selections
  }

  public selectCandidate(
    sectionName: string,
    candidateRow: number,
    candidateColumn: number
  ) {
    const section = this.getSections().find(s => s.title === sectionName)

    if (!this.selectedCandidatesPerSection[sectionName]) {
      this.selectedCandidatesPerSection[sectionName] = []
    }

    const selections = this.selectedCandidatesPerSection[sectionName]

    const idx = selections.findIndex(
      ({ row, column }) => row === candidateRow && column === candidateColumn
    )

    if (idx > -1) {
      selections.splice(idx, 1)
      return
    }

    if (!section) {
      return
    }

    if (selections.length >= section.metadata.limit) {
      throw Error("Can not select more candidates for this section")
    }

    selections.push({ row: candidateRow, column: candidateColumn })

    this.selectedCandidatesPerSection[sectionName] = selections
  }

  public getCandidatesByPositionAndParty(
    sectionTitle: string,
    party: string,
    isIndependent?: boolean
  ) {
    const section = this.getSections().find(s => s.title === sectionTitle)

    if (isIndependent) {
      const partiesLength = this.getParties().filter(p => !p.isIndependent)
        .length

      const independentIndexes = []

      let idx = partiesLength

      while (idx < this.getParties().length) {
        independentIndexes.push(idx)
        idx += 1
      }

      return independentIndexes
        .map(i => section?.rows.map(r => r[i]))
        .flat()
        .filter(c => c.ocrResult !== "")
    }

    const partyIndex = this.getParties().findIndex(p => p.text === party)

    return section?.rows.map(r => r[partyIndex])
  }
}
