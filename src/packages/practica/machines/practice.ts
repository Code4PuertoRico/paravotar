import { isEmpty, isNil } from "lodash"
import { createMachine, assign } from "xstate"
import { BallotService } from "../services/ballot-service"

import { MAX_PRECINT_LENGTH } from "../services/constants"
import { FindByEventParams, PracticeContext } from "../services/types"

export const practiceMachine = createMachine<PracticeContext>({
  id: "practiceMachine",
  initial: "ballotFinderPicker",
  context: {
    userInput: null,
    findBy: null,
    uuid: "",
    ballotPaths: {},
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
        src: BallotService.fetchBallots,
        onDone: {
          target: "selectBallot",
          actions: assign({
            ballots: (_, event) => event.data.ballots,
            ballotPaths: (_, event) => event.data.ballotPaths,
          }),
        },
        onError: {
          target: "noVoterIdFound",
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
        src: BallotService.fetchBallots,
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
          actions: assign({ votes: BallotService.updateVotes }),
        },
        SUMBIT: "validate",
        EXPORTED_VOTES: "generatePdf",
      },
    },
    legislative: {
      on: {
        SELETED_ELECTIVE_FIELD: {
          target: "legislative",
          actions: assign({ votes: BallotService.updateVotes }),
        },
        SUMBIT: "validate",
        EXPORTED_VOTES: "generatePdf",
      },
    },
    municipal: {
      on: {
        SELETED_ELECTIVE_FIELD: {
          target: "municipal",
          actions: assign({ votes: BallotService.updateVotes }),
        },
        SUMBIT: "validate",
        EXPORTED_VOTES: "generatePdf",
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
      // TODO: Add PDF HERE
      // on: {
      //   EXPORTED_VOTES: ".generatePdf",
      // },
      // states: {
      // },
    },
    generatePdf: {
      invoke: {
        id: "generatePdf",
        src: BallotService.generatePdf,
        onDone: {
          target: "gettingPdfUrl",
          actions: assign({ uuid: (_, event) => event.data }),
        },
        onError: {
          target: "errorGeneratingPdf",
        },
      },
    },
    gettingPdfUrl: {
      invoke: {
        id: "getPdfUrl",
        src: BallotService.getPdfUrl,
        onDone: {
          target: "generatedPdf",
          actions: assign({ pdfUrl: (_, event) => event.data }),
        },
        onError: {
          target: "errorGeneratingPdf",
        },
      },
      after: {
        200: "gettingPdfUrl",
      },
    },
    generatedPdf: {
      type: "final",
    },
    errorGeneratingPdf: {
      type: "final",
    },
  },
})
