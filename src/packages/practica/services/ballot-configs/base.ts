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
  esRules =
    "En esta columna puede votar por otra(s) persona(s) distinta(s) a las que  aparecen como candidatos(as) en columnas anteriores de esta  papeleta. Para votar por la(s) persona(s) de su preferencia, escriba su  nombre completo en el encasillado de la columna de nominación directa  que corresponda a la candidatura y también debe hacer una Marca  Válida dentro del rectángulo en blanco al lado de cada nombre escrito."
  enRules =
    "In this column you can vote for another person(s) different from those  listed as candidates in the previous columns of this ballot. To vote for the  person(s) of choice, write their full name on the box of the write-in  column that corresponds to the candidacy, and you must also make a  valid mark with the blank rectangle next to each written name."
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
  accumulationNumber

  constructor(name: string, accumulationNumber?: number, img?: string) {
    super()

    const regex = /\d\.?\r?\n?/g
    const cleanedName = name.replace(regex, "").trim()

    this.img = img ? img : undefined
    this.name = cleanedName
    this.accumulationNumber = accumulationNumber ? `${accumulationNumber}.` : ""
  }
}

export class WriteInCandidate extends BallotSection {
  accumulationNumber

  constructor(accumulationNumber?: number) {
    super()

    this.accumulationNumber = accumulationNumber ? `${accumulationNumber}.` : ""
  }
}

export class EmptyCandidacy extends BallotSection {}
