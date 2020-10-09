import { isEmpty, isNil } from "lodash"
import { createMachine, assign } from "xstate"
import { Selection } from "../../../ballot-validator/types"
import { VotesCoordinates } from "../../generate-ballot/types/ballot-machine"

import {
  StateBallotConfig,
  MunicipalBallotConfig,
  LegislativeBallotConfig,
} from "../services/ballot-configs"
import { ElectiveField } from "../services/ballot-configs/base"
import BallotFinder, { FindByType } from "../services/ballot-finder-service"
import { MAX_PRECINT_LENGTH, PUBLIC_S3_BUCKET } from "../services/constants"
import { OcrResult } from "../services/types"
import { Vote } from "../services/vote-service"

type FindByEventParams = {
  userInput: string
  findBy: FindByType
}

type PracticeContext = {
  userInput: string | null
  findBy: FindByType | null
  ballots: {
    estatal?: StateBallotConfig
    municipal?: MunicipalBallotConfig
    legislativa?: LegislativeBallotConfig
  }
  votes: Vote[]
}

const fetchBallots = async (_, { userInput, findBy }: FindByEventParams) => {
  const ballots = await BallotFinder(userInput, findBy)

  // Prefetch ballot data
  const test = Object.entries(ballots).map(async ([key, value]) => {
    try {
      const ballotRes = await fetch(`${PUBLIC_S3_BUCKET}/${value}data.json`)
      const ballotJson: OcrResult[][] = await ballotRes.json()

      if (key === "estatal") {
        return {
          [key]: new StateBallotConfig(ballotJson, ballots.estatal),
        }
      } else if (key === "municipal") {
        return {
          [key]: new MunicipalBallotConfig(ballotJson, ballots.municipal),
        }
      } else {
        return {
          [key]: new LegislativeBallotConfig(ballotJson, ballots.legislativa),
        }
      }
    } catch (err) {
      console.log(err)
    }
  })

  const allBallotsJson = await Promise.all(test)

  console.log(allBallotsJson)

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

type VoteEvent = {
  candidate: ElectiveField
  position: VotesCoordinates
}

function updateVotes(
  context: PracticeContext,
  { candidate, position }: VoteEvent
) {
  const prevVotes = context.votes
  const hasVote = prevVotes.some(
    vote =>
      vote.position.row === position.row &&
      vote.position.column === position.column
  )

  if (hasVote) {
    return prevVotes.filter(vote => {
      return !(
        position.row === vote.position.row &&
        position.column === vote.position.column
      )
    })
  }

  const vote = new Vote(candidate, position, Selection.selected)

  return [...prevVotes, vote]
}

export const practiceMachine = createMachine<PracticeContext>({
  id: "practiceMachine",
  initial: "ballotFinderPicker",
  context: {
    userInput: null,
    findBy: null,
    ballots: {},
    votes: [],
  },
  states: {
    ballotFinderPicker: {
      on: {
        SELECTED_VOTER_ID: "enterVoterId",
        SELECTED_PRECINT: "enterPrecint",
      },
    },
    enterVoterId: {
      on: {
        ADDED_VOTER_ID: [
          {
            target: ".empty",
            cond: (_, event: FindByEventParams) => {
              return isEmpty(event.userInput) || isNil(event.userInput)
            },
          },
          {
            target: "fetchBallots",
          },
        ],
      },
      states: {
        empty: {},
      },
    },
    enterPrecint: {
      on: {
        ADDED_PRECINT: [
          {
            target: ".empty",
            cond: (_, event: FindByEventParams) => {
              return isEmpty(event.userInput) || isNil(event.userInput)
            },
          },
          {
            target: ".invalidLength",
            cond: (_, event: FindByEventParams) => {
              return event.userInput.length > MAX_PRECINT_LENGTH
            },
          },
          {
            target: "fetchBallots",
          },
          {},
        ],
      },
      states: {
        empty: {},
        invalidLength: {},
      },
    },
    fetchBallots: {
      invoke: {
        id: "fetchBallots",
        src: fetchBallots,
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
        src: fetchBallots,
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
        SELETED_ELECTIVE_FIELD: {
          target: "governmental",
          actions: assign({ votes: updateVotes }),
        },
        SUMBIT: "validate",
      },
    },
    legislative: {
      on: {
        SELETED_ELECTIVE_FIELD: {
          target: "legislative",
          actions: assign({ votes: updateVotes }),
        },
        SUMBIT: "validate",
      },
    },
    municipal: {
      on: {
        SELETED_ELECTIVE_FIELD: {
          target: "municipal",
          actions: assign({ votes: updateVotes }),
        },
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
