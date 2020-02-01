import React from "react"
import { useService } from "@xstate/react"
import { PartyHeader } from "../../Party/components/Header"
import { Section } from "../../Section/components/section"
import { PartyActor } from "../../Party/types"
import { SectionActor } from "../../Section/types"
import { Interpreter } from "xstate"
import { BallotMachineContext, BallotMachineEvent } from "../types"

interface BallotProps {
  ballotRef: Interpreter<BallotMachineContext, any, BallotMachineEvent>
}

export const Ballot: React.FunctionComponent<BallotProps> = ({ ballotRef }) => {
  const [current] = useService(ballotRef)

  const { actors } = current.context
  const sections = Object.keys(actors).filter(a => a.startsWith("section"))

  return (
    <>
      <p>Current: {current.value}</p>
      <table>
        <PartyHeader partiesRef={actors.parties as PartyActor} />
        <tbody>
          {sections.map(s => (
            <Section key={s} sectionRef={actors[s] as SectionActor} />
          ))}
        </tbody>
      </table>
    </>
  )
}
