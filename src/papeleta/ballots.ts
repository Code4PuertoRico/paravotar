import { createBallotMachine } from "./Form/machine"
import {
  stateParties,
  stateSections,
  legislativeParties,
  legislativeSections,
} from "./data"
import { interpret } from "xstate"

const stateBallotMachine = createBallotMachine(stateParties, stateSections)
const legislativeBallotMachine = createBallotMachine(
  legislativeParties,
  legislativeSections
)

class Ballot {
  protected service

  constructor(machine: typeof stateBallotMachine) {
    this.service = interpret(machine, { devTools: true }).start()
  }

  getService() {
    return this.service
  }
}

export class StateBallot extends Ballot {
  constructor() {
    super(stateBallotMachine)
  }
}

export class LegislativeBallot extends Ballot {
  constructor() {
    super(legislativeBallotMachine)
  }
}
