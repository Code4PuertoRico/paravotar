import { createMachine, assign } from "xstate"
import { Ballot } from "../../../papeleta/Form/components/Ballot"

type VoterIdData = {
  voterId: string
}

type OcrResult = {
  ocrResult: string
  logoImg?: string
}

type Ballots = {
  estatal?: OcrResult[]
  municipal?: OcrResult[]
  legislativa?: OcrResult[]
}

type VoterInfo = {
  estatus: string
  numeroElectoral: string
  papeletas: {
    estatal: string
    legislativa: string
    municipal: string
  }
  precinto: string
  unidad: string
}

const getBallotsByVoterId = async (_, { voterId }: VoterIdData) => {
  const voterInfoRes = await fetch(
    `https://api.paravotar.org/consulta?voterId=${voterId}`
  )
  const voterInfoJson: VoterInfo = await voterInfoRes.json()

  // Prefetch ballot data
  const ballots = Object.keys(voterInfoJson.papeletas).map(async key => {
    const ballotRes = await fetch(
      voterInfoJson.papeletas[key as "estatal" | "municipal" | "legislativa"]
    )
    const ballotJson: OcrResult[] = await ballotRes.json()

    return [key, ballotJson]
  })
  const ballotsJson = await Promise.all(ballots)
  const transformedBallots: {
    estatal?: OcrResult[]
    municipal?: OcrResult[]
    legislativa?: OcrResult[]
  } = {}

  ballotsJson.forEach(([type, data]) => {
    transformedBallots[type] = data
  })

  console.log({ transformedBallots })

  return transformedBallots
}

type PracticeContext = {
  ballots: Ballots
}

export const practiceMachine = createMachine<PracticeContext>({
  id: "practiceMachine",
  initial: "enterVoterId",
  context: {
    ballots: {},
  },
  states: {
    enterVoterId: {
      on: {
        FIND_VOTER_ID: "findingVoterId",
      },
    },
    findingVoterId: {
      invoke: {
        id: "findVoterId",
        src: getBallotsByVoterId,
        onDone: {
          target: "selectBallot",
          actions: assign({ ballots: (_, event) => event.data }),
        },
        onError: {
          target: "noVoterIdFound",
          actions: assign({ ballots: (_, event) => event.data }),
        },
      },
    },
    noVoterIdFound: {
      on: {
        RETRY: "enterVoterId",
        ENTER_VOTING_CENTER: "enterVotingCenter",
      },
    },
    enterVotingCenter: {
      on: {
        FIND_VOTING_CENTER_INFO: "findingVotingCenterInfo",
      },
    },
    findingVotingCenterInfo: {
      invoke: {
        id: "findingVotingCenterInfo",
        src: getBallotsByVoterId,
        onDone: {
          target: "selectBallot",
        },
        onError: {
          target: "noVotingCenterFound",
        },
      },
    },
    noVotingCenterFound: {
      on: {
        RETRY: "enterVotingCenter",
      },
    },
    selectBallot: {
      on: {
        SELECTED_GOVERNMENTAL: "governmental",
        SELECTED_LEGISLATIVE: "legislative",
        SELECTED_MUNICIPAL: "municipal",
      },
    },
    governmental: {
      on: {
        SUMBIT: "validate",
      },
    },
    legislative: {
      on: {
        SUMBIT: "validate",
      },
    },
    municipal: {
      on: {
        SUMBIT: "validate",
      },
    },
    validate: {
      on: {
        VALIDATION_SUCCESS: "showResults",
        VALIDATION_FAILED: "showErrors",
        NOTIFY_MISSING_VOTES: "missingVotes",
      },
    },
    missingVotes: {
      on: {
        PROCEED_WITH_SUBMISSION: "showResults",
      },
    },
    showErrors: {
      on: {
        // TODO: This should be the selected ballot.
        FIX_ERRORS: "governmental",
      },
    },
    showResults: {
      type: "final",
    },
  },
})
