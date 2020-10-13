import { Machine, assign, AnyEventObject } from "xstate"
import { BallotService } from "../services/ballot-service"

const SIGNED_URL_EXPIRY_TIME = 1000 * 60 * 3 // 3 minutes

export const generatePdfMachine = Machine<{
  uuid?: string
  pdfUrl?: string
  pollingCount: number
}>(
  {
    id: "generatePdfMachine",
    initial: "idle",
    context: {
      pollingCount: 0,
    },
    states: {
      idle: {
        on: {
          generate: "creatingTask",
        },
      },
      creatingTask: {
        invoke: {
          id: "generatePdf",
          src: (_, { votes, ballotType, ballotPath }: AnyEventObject) =>
            BallotService.generatePdf(
              { votes } as any,
              { ballotType, ballotPath } as any
            ),
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
              src: ({ uuid }) => BallotService.getPdfUrl({ uuid } as any),
              onDone: {
                target: "#generatePdfMachine.generatedPdf",
                actions: [
                  assign({ pdfUrl: (_, event) => event.data.url }),
                  assign({
                    pollingCount: ({ pollingCount }) => pollingCount + 1,
                  }),
                ],
              },
              onError: "delay",
            },
          },
          checkingPoll: {
            always: [
              {
                target: "delay",
                cond: "hasNotReachedLimit",
              },
              {
                target: "#generatePdfMachine.errorGeneratingPdf",
              },
            ],
          },
          delay: {
            after: {
              3000: "loading",
            },
          },
        },
      },
      generatedPdf: {
        after: {
          [SIGNED_URL_EXPIRY_TIME]: "linkExpired",
        },
      },
      linkExpired: {
        type: "final",
      },
      errorGeneratingPdf: {
        type: "final",
      },
    },
  },
  {
    guards: {
      hasNotReachedLimit: ({ pollingCount }) => pollingCount <= 10,
    },
  }
)
