import { isEmpty, isNil } from "lodash"
import { createMachine, assign } from "xstate"
import { BallotService } from "../services/ballot-service"

import { MAX_PRECINT_LENGTH } from "../services/constants"
import { BallotsResponse, PracticeContext } from "../services/types"
import { BallotType } from "../../../ballot-validator/types"
import { BallotConfigs } from "../services/ballot-configs"

type ControlEvent =
  | { type: "start"; userInput: string }
  | { type: "BACK" }
  | { type: "RETRY" }
  | { type: "SUBMIT" }
  | { type: "CONTINUE_PRACTICE" }
  | { type: "ENTER_VOTING_CENTER" }
  | { type: "START_PRACTICE" }

type SelectionEvent =
  | { type: "SELECTED_VOTER_ID" }
  | { type: "SELECTED_PRECINT" }
  | { type: "SELECTED_GOVERNMENTAL" }
  | { type: "SELECTED_LEGISLATIVE" }
  | { type: "SELECTED_MUNICIPAL" }
  | { type: "BALLOT_SELECTION"; ballotType: BallotType }

type DataEntryEvent =
  | { type: "ADDED_VOTER_ID"; userInput: string }
  | { type: "ADDED_PRECINT"; userInput: string }
  | { type: "SELECTED_ELECTIVE_FIELD" }

type FetchBallotsEvent =
  | {
      type: "FETCH_BALLOTS"
    }
  | {
      type: "done.invoke.fetchBallots"
      data: { ballots: BallotConfigs; ballotPaths: BallotsResponse }
    }

type PracticeEvent =
  | ControlEvent
  | SelectionEvent
  | DataEntryEvent
  | FetchBallotsEvent

export const PracticeMachine = createMachine<PracticeContext, PracticeEvent>(
  {
    id: "practiceMachine",
    initial: "init",
    context: {
      userInput: null,
      findBy: null,
      votes: [],
    },
    states: {
      init: {
        on: {
          start: [
            {
              cond: (_, { userInput }) => !isEmpty(userInput),
              target: "fetchBallots",
            },
            {
              target: "mainScreen",
            },
          ],
        },
      },
      mainScreen: {
        on: {
          START_PRACTICE: "ballotFinderPicker",
        },
      },
      ballotFinderPicker: {
        on: {
          SELECTED_VOTER_ID: "enterVoterId",
          SELECTED_PRECINT: "enterPrecint",
          BACK: "mainScreen",
        },
      },
      enterVoterId: {
        initial: "idle",
        on: {
          BACK: "ballotFinderPicker",
          ADDED_VOTER_ID: [
            {
              target: ".empty",
              cond: (_, event) => {
                return isEmpty(event.userInput) || isNil(event.userInput)
              },
            },
            {
              target: "fetchBallots",
            },
          ],
        },
        states: {
          idle: {},
          empty: {},
        },
      },
      enterPrecint: {
        initial: "idle",
        on: {
          BACK: "ballotFinderPicker",
          ADDED_PRECINT: [
            {
              target: ".empty",
              cond: (_, event) => {
                return isEmpty(event.userInput) || isNil(event.userInput)
              },
            },
            {
              target: ".invalidLength",
              cond: (_, event) => {
                return event.userInput.length > MAX_PRECINT_LENGTH
              },
            },
            {
              target: "fetchBallots",
            },
          ],
        },
        states: {
          idle: {},
          empty: {},
          invalidLength: {},
        },
      },
      fetchBallots: {
        invoke: {
          id: "fetchBallots",
          src: BallotService.fetchBallots,
          onDone: [
            {
              target: "practicing",
              cond: ({ ballotType }) => !isEmpty(ballotType),
              actions: assign({
                ballots: (_, event) => event.data.ballots,
                ballotPaths: (_, event) => event.data.ballotPaths,
              }),
            },
            {
              target: "selectBallot",
              actions: assign({
                ballots: (_, event) => event.data.ballots,
                ballotPaths: (_, event) => event.data.ballotPaths,
              }),
            },
          ],
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
          ENTER_VOTING_CENTER: "enterPrecint",
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
            target: "enterPrecint",
          },
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
        entry: assign({ votes: [] }),
        on: {
          SELECTED_ELECTIVE_FIELD: {
            actions: assign({
              votes: BallotService.updateVotes as any,
            }),
          },
          SUBMIT: "showResults",
          BACK: "selectBallot",
        },
      },
      showResults: {
        on: {
          CONTINUE_PRACTICE: "continuePracticing",
        },
      },
      continuePracticing: {
        on: {
          BACK: "showResults",
          BALLOT_SELECTION: {
            target: "practicing",
            actions: assign({
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
      saveActiveBallotType: assign((_, { ballotType }) => ({
        ballotType,
      })),
    },
  }
)
