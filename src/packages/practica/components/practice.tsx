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
import { Button } from "../../../components/index"

const getBallotsByVoterId = async (_, { voterId }) => {
  const res = await fetch(
    `https://api.paravotar.org/consulta?voterId=${voterId}`
  )
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
  const [currBallot, setCurrBallot] = useState(null)
  const fetchBallotData = async url => {
    const res = await fetch(url)
    const json = await res.json()

    console.log(json)

    setCurrBallot(json)
  }

  console.log({ state })

  return (
    <Switch state={state}>
      <Case value="enterVoterId">
        <form
          onSubmit={() =>
            send("FIND_VOTER_ID", {
              voterId: inputRef.current ? inputRef.current.value : "",
            })
          }
        >
          <input type="text" ref={inputRef} />
        </form>
      </Case>
      <Case value="findingVoterId">
        <div>Loading...</div>
      </Case>
      <Case value="selectBallot">
        <div className="w-1/2">
          <Button
            className="w-full block my-2"
            onClick={() => {
              console.log("test")
              send("SELECTED_GOVERNMENTAL")
            }}
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
        <GovernmentalBallot
          path="/papeletas/2016/gobernador-y-comisionado-residente"
          structure={currBallot}
          votes={[]}
        />
      </Case>
      <Case value="legislative">
        <LegislativeBallot
          path="/papeletas/2016/gobernador-y-comisionado-residente"
          structure={currBallot}
          votes={[]}
        />
      </Case>
      <Case value="municipal">
        <MunicipalBallot
          path="/papeletas/2016/gobernador-y-comisionado-residente"
          structure={currBallot}
          votes={[]}
        />
      </Case>
      <Default>Shit</Default>
    </Switch>
  )
}
