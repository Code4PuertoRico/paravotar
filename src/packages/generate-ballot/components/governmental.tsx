import React from "react"

import { Candidate, PartyHeader, SectionHeader } from "./sections/index"

import { BallotContent, VotesCoordinates } from "../types/ballot-machine"
import { CDN_URL } from "../constants"

type BallotProps = {
  path: string
  structure: BallotContent[][]
  votes: VotesCoordinates[]
  toggleVote: ({ row, column }: VotesCoordinates) => void
}

export default function GovernmentalBallot({
  path,
  structure,
  votes,
  toggleVote,
}: BallotProps) {
  const url = `${CDN_URL}${path}`

  return (
    <div className="bg-black" style={{ width: 2200 }}>
      {structure.map((row: BallotContent[], rowIndex: number) => {
        return (
          <div
            key={`state-ballot-${rowIndex}`}
            className={`grid grid-cols-${row.length} ${
              rowIndex !== 0 ? "bg-ballots-governmental" : ""
            }`}
          >
            {row.map((col: BallotContent, colIndex: number) => {
              const key = `${col.ocrResult}-${colIndex}`
              const vote = !!votes.find(vote => {
                return vote.row === rowIndex && vote.column === colIndex
              })

              if (rowIndex === 0) {
                return (
                  <PartyHeader
                    key={key}
                    url={url}
                    logo={col.logoImg}
                    ocrResult={col.ocrResult}
                    hasVote={vote}
                    toggleVote={() =>
                      toggleVote({ row: rowIndex, column: colIndex })
                    }
                  />
                )
              }

              if (col.logoImg) {
                return (
                  <Candidate
                    key={key}
                    url={url}
                    img={col.logoImg}
                    ocrResult={col.ocrResult}
                    hasVote={vote}
                    toggleVote={() =>
                      toggleVote({ row: rowIndex, column: colIndex })
                    }
                  />
                )
              }

              return <SectionHeader key={key} ocrResult={col.ocrResult} />
            })}
          </div>
        )
      })}
    </div>
  )
}
