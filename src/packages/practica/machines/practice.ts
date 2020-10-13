import { isEmpty, isNil } from "lodash"
import { createMachine, assign, AnyEventObject } from "xstate"
import { BallotService } from "../services/ballot-service"

import { MAX_PRECINT_LENGTH } from "../services/constants"
import { FindByEventParams, PracticeContext } from "../services/types"

export const practiceMachine = createMachine<PracticeContext>(
  {
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
          SELECTED_GOVERNMENTAL: {
            target: "governmental",
            actions: "saveActiveBallotType",
          },
          SELECTED_LEGISLATIVE: {
            target: "legislative",
            actions: "saveActiveBallotType",
          },
          SELECTED_MUNICIPAL: {
            target: "municipal",
            actions: "saveActiveBallotType",
          },
        },
      },
      governmental: {
        on: {
          SELETED_ELECTIVE_FIELD: {
            target: "governmental",
            actions: assign<PracticeContext>({
              votes: BallotService.updateVotes as any,
            }),
          },
          SUBMIT: "showResults",
        },
      },
      legislative: {
        on: {
          SELETED_ELECTIVE_FIELD: {
            target: "legislative",
            actions: assign<PracticeContext>({
              votes: BallotService.updateVotes as any,
            }),
          },
          SUBMIT: "showResults",
        },
      },
      municipal: {
        on: {
          SELETED_ELECTIVE_FIELD: {
            target: "municipal",
            actions: assign<PracticeContext>({
              votes: BallotService.updateVotes as any,
            }),
          },
          SUBMIT: "showResults",
        },
      },
      showResults: {
        on: {
          EXPORTED_VOTES: "generatePdf",
        },
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
        initial: "loading",
        states: {
          loading: {
            invoke: {
              id: "getPdfUrl",
              src: BallotService.getPdfUrl,
              onDone: {
                target: "#practiceMachine.generatedPdf",
                actions: assign({ pdfUrl: (_, event) => event.data }),
              },
              onError: "delay",
            },
          },
          delay: {
            after: {
              3000: "loading",
            },
          },
        },
      },
      generatedPdf: {
        type: "final",
      },
      errorGeneratingPdf: {
        type: "final",
      },
    },
  },
  {
    actions: {
      saveActiveBallotType: assign((_, { ballotType }: AnyEventObject) => ({
        ballotType,
      })),
    },
  }
)
