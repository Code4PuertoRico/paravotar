import React from "react"

import {
  Candidate as CandidateSection,
  PartyHeader,
  SectionHeader,
} from "./sections/index"

import { VotesCoordinates } from "../types/ballot-machine"
import {
  StateBallotStructure,
  Party,
  Candidate,
  Header,
  Rule,
} from "../../practica/services/ballot-structures"

type BallotProps = {
  structure: StateBallotStructure
  votes: VotesCoordinates[]
  toggleVote: ({ row, column }: VotesCoordinates) => void
}

export default function GovernmentalBallot({
  structure,
  votes,
  toggleVote,
}: BallotProps) {
  return (
    <div className="bg-black" style={{ width: 2200 }}>
      {structure.map(
        (row: Party[] | Rule[] | Candidate[] | Header[], rowIndex: number) => {
          return (
            <div
              key={`state-ballot-${rowIndex}`}
              className={`grid grid-cols-${row.length} ${
                rowIndex !== 0 ? "bg-ballots-governmental" : ""
              }`}
            >
              {row.map(
                (col: Party | Rule | Candidate | Header, colIndex: number) => {
                  const key = `${col.name || col.info || col.rule}-${colIndex}`
                  const vote = !!votes.find(vote => {
                    return vote.row === rowIndex && vote.column === colIndex
                  })

                  if (col instanceof Party) {
                    return (
                      <PartyHeader
                        key={key}
                        logo={col.insignia}
                        ocrResult={col.name}
                        hasVote={vote}
                        toggleVote={() =>
                          toggleVote({ row: rowIndex, column: colIndex })
                        }
                      />
                    )
                  }

                  if (col instanceof Rule) {
                    return (
                      <PartyHeader
                        key={key}
                        ocrResult={col.rule}
                        hasVote={vote}
                        toggleVote={() =>
                          toggleVote({ row: rowIndex, column: colIndex })
                        }
                      />
                    )
                  }

                  if (col instanceof Candidate) {
                    return (
                      <CandidateSection
                        key={key}
                        img={col.img}
                        ocrResult={col.name}
                        hasVote={vote}
                        toggleVote={() =>
                          toggleVote({ row: rowIndex, column: colIndex })
                        }
                      />
                    )
                  }

                  return <SectionHeader key={key} ocrResult={col.info} />
                }
              )}
            </div>
          )
        }
      )}
    </div>
  )
}
