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
          BACK: "ballotFinderPicker",
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
          BACK: "ballotFinderPicker",
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
        on: {
          BACK: "ballotFinderPicker",
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
            target: "practicing",
            actions: "saveActiveBallotType",
          },
          SELECTED_LEGISLATIVE: {
            target: "practicing",
            actions: "saveActiveBallotType",
          },
          SELECTED_MUNICIPAL: {
            target: "practicing",
            actions: "saveActiveBallotType",
          },
          BACK: "ballotFinderPicker",
        },
      },
      practicing: {
        on: {
          SELECTED_ELECTIVE_FIELD: {
            actions: assign<PracticeContext>({
              votes: BallotService.updateVotes as any,
            }),
          },
          SUBMIT: "showResults",
          BACK: "selectBallot",
        },
      },
      showResults: {
        on: {
          BALLOT_SELECTION: {
            target: "practicing",
            actions: assign<PracticeContext>({
              votes: [],
              ballotType: (_, event) => event.ballotType,
            }),
          },
        },
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
