import { uniqueId } from "lodash"

class BallotSection {
  id

  constructor() {
    this.id = uniqueId()
  }
}

export class Party extends BallotSection {
  insignia
  name

  constructor(name: string, insignia: string) {
    super()

    this.insignia = insignia
    this.name = name
  }
}

export class Rule extends BallotSection {
  rule

  constructor(rule: string) {
    super()

    this.rule = rule
  }
}

export class Header extends BallotSection {
  info

  constructor(info: string) {
    super()

    this.info = info
  }
}

export class Candidate extends BallotSection {
  img
  name
  placement: string

  constructor(name: string, img?: string) {
    super()

    const regex = /\d\.?/
    const placement = name.match(regex)
    const cleanedName = name.replace(regex, "")

    this.img = img ? img : undefined
    this.name = cleanedName
    this.placement = placement ? placement[0] : ""
  }
}

export class WriteInCandidate extends BallotSection {
  name

  constructor(name?: string) {
    super()

    this.name = name
  }
}

export class EmptyCandidacy extends BallotSection {}
