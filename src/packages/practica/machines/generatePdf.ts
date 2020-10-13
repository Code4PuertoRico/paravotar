import { Machine, assign, AnyEventObject } from "xstate"
import { BallotService } from "../services/ballot-service"

export const generatePdfMachine = Machine<{ uuid?: string; pdfUrl?: string }>({
  id: "generatePdfMachine",
  initial: "idle",
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
              actions: assign({ pdfUrl: (_, event) => event.data.url }),
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
})
