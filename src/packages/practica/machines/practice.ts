import { createMachine, assign } from "xstate"

import { PUBLIC_S3_BUCKET } from "../services/constants"
import { OcrResult } from "../services/types"
import {
  StateBallotConfig,
  MunicipalBallotConfig,
  LegislativeBallotConfig,
} from "../services/ballot-configs"

type VoterIdData = {
  voterId: string
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

const API_URL = "https://api.paravotar.org"

/**
 *
 * /ballots/all

  /ballots/ByTown?townId=

  /ballots/ByPrecint?precintId=

  /consulta ya no devuelve las papeletas
 */

const getBallotsByVoterId = async (_, { voterId }: VoterIdData) => {
  const voterInfoRes = await fetch(`${API_URL}/consulta?voterId=${voterId}`)
  const voterInfoJson: VoterInfo = await voterInfoRes.json()
  const ballotsRes = await fetch(
    `${API_URL}/ballots/ByPrecint?precintId=${voterInfoJson.precinto}`
  )
  const ballotsJson = await ballotsRes.json()

  // Prefetch ballot data
  const ballots = Object.entries(ballotsJson).map(async ([key, value]) => {
    try {
      const ballotRes = await fetch(`${PUBLIC_S3_BUCKET}/${value}data.json`)
      const ballotJson: OcrResult[][] = await ballotRes.json()

      if (key === "estatal") {
        return {
          [key]: new StateBallotConfig(ballotJson, ballotsJson.estatal),
        }
      } else if (key === "municipal") {
        return {
          [key]: new MunicipalBallotConfig(ballotJson, ballotsJson.municipal),
        }
      } else {
        return {
          [key]: new LegislativeBallotConfig(
            ballotJson,
            ballotsJson.legislativa
          ),
        }
      }
    } catch (err) {
      console.log(err)
    }
  })

  const allBallotsJson = await Promise.all(ballots)
  const initialValue: {
    estatal?: StateBallotConfig
    municipal?: MunicipalBallotConfig
    legislativa?: LegislativeBallotConfig
  } = {
    estatal: undefined,
    municipal: undefined,
    legislativa: undefined,
  }

  return allBallotsJson.reduce((prev, curr) => {
    return {
      ...prev,
      ...curr,
    }
  }, initialValue)
}

type PracticeContext = {
  ballots: {
    estatal?: StateBallotConfig
    municipal?: MunicipalBallotConfig
    legislativa?: LegislativeBallotConfig
  }
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
