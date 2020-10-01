import React, { useRef, useState } from "react"
import { Machine, assign } from "xstate"
import { useMachine } from "@xstate/react"

import {
  GovernmentalBallot,
  LegislativeBallot,
  MunicipalBallot,
} from "../../generate-ballot/components"
import Switch from "../../../components/switch"
import Case from "../../../components/case"
import Default from "../../../components/default"
import { Button, Card, Typography } from "../../../components/index"

const getBallotsByVoterId = async (_, { voterId }) => {
  const voterInfoRes = await fetch(
    `https://api.paravotar.org/consulta?voterId=${voterId}`
  )
  const voterInfoJson = await voterInfoRes.json()
  // Prefetch ballot data
  const ballots = Object.keys(voterInfoJson.papeletas).map(async key => {
    const ballotRes = await fetch(voterInfoJson.papeletas[key])
    const ballotJson = await ballotRes.json()

    return [key, ballotJson]
  })
  const ballotsJson = await Promise.all(ballots)
  const transformedBallots = {}
  ballotsJson.forEach(([type, data]) => {
    transformedBallots[type] = data
  })

  console.log({ transformedBallots })

  return transformedBallots
}

const fetchBallot = async (_, { url }) => {
  const res = await fetch(url)
  const json = await res.json()

  return json
}

const PracticeMachine = Machine({
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
      invoke: {
        id: "fetchGovernmentalBallot",
        src: fetchBallot,
      },
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

export default function Practice() {
  const [state, send] = useMachine(PracticeMachine)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Card>
      <Switch state={state}>
        <Case value="enterVoterId">
          <div className="mx-auto lg:w-1/3">
            <Typography tag="p" variant="h4">
              Entre su número electoral
            </Typography>
            <form
              className="mt-4"
              onSubmit={() =>
                send("FIND_VOTER_ID", {
                  voterId: inputRef.current ? inputRef.current.value : "",
                })
              }
            >
              <input
                className="border border-primary px-3 py-2 rounded w-full"
                type="text"
                ref={inputRef}
                placeholder="Número electoral"
              />
              <Button className="mt-2 block w-full">Continuar</Button>
            </form>
            <p className="text-xs italic mt-2">
              * La utilización de su número electoral es solo para propósitos de
              práctica, paravotar.org no guarda ninguna información personal de
              usuarios que utilicen la página web.
            </p>
          </div>
        </Case>
        <Case value="findingVoterId">
          <div>Loading...</div>
        </Case>
        <Case value="selectBallot">
          <div className="mx-auto lg:w-1/3">
            <Typography tag="p" variant="h4">
              Escoge por cuál papeleta comenzar
            </Typography>
            <Button
              className="w-full block mt-4 mb-2"
              onClick={() => send("SELECTED_GOVERNMENTAL")}
            >
              Estatal
            </Button>
            <Button
              className="w-full block my-2"
              onClick={() => send("SELECTED_LEGISLATIVA")}
            >
              Legislativa
            </Button>
            <Button
              className="w-full block my-2"
              onClick={() => send("SELECTED_MUNICIPAL")}
            >
              Municipal
            </Button>
          </div>
        </Case>
        <Case value="governmental">
          <div className="overflow-scroll">
            <GovernmentalBallot
              path="/papeletas/2016/gobernador-y-comisionado-residente"
              structure={state.context.ballots.estatal}
              votes={[]}
            />
          </div>
        </Case>
        <Case value="legislative">
          <div className="overflow-scroll">
            <LegislativeBallot
              path="/papeletas/2016/gobernador-y-comisionado-residente"
              structure={state.context.ballots.legislativa}
              votes={[]}
            />
          </div>
        </Case>
        <Case value="municipal">
          <div className="overflow-scroll">
            <MunicipalBallot
              path="/papeletas/2016/gobernador-y-comisionado-residente"
              structure={state.context.ballots.municipal}
              votes={[]}
            />
          </div>
        </Case>
        <Default>Shit</Default>
      </Switch>
    </Card>
  )
}
