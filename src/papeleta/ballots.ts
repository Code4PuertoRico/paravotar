import { createBallotMachine } from "./Form/machine"
import {
  stateParties,
  stateSections,
  legislativeParties,
  legislativeSections,
} from "./data"
import { interpret, StateMachine, Interpreter } from "xstate"

const stateBallotMachine = createBallotMachine(stateParties, stateSections)
const legislativeBallotMachine = createBallotMachine(
  legislativeParties,
  legislativeSections
)

class Ballot {
  protected service: Interpreter<any, any, any>

  constructor(machine: StateMachine<any, any, any>) {
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
