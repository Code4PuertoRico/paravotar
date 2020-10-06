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

export class WriteInRules extends BallotSection {
  esTitle = "COMO VOTAR NOMINACIÓN DIRECTA"
  enTitle = "HOW TO VOTE FOR WRITE W CANDIDATES"
  esRules: string
  enRules: string

  constructor(rule: string) {
    super()

    const esRules = rule
      .substring(this.esTitle.length, rule.indexOf(this.enTitle))
      .trim()
      .replace(/\n/g, "")
    const enRules = rule
      .substring(rule.indexOf(this.enTitle) + this.enTitle.length)
      .trim()
      .replace(/\n/g, "")

    this.esRules = esRules
    this.enRules = enRules
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
