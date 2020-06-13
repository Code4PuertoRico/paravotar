import React from "react"

import { Candidate, PartyHeader, SectionHeader } from "./sections/index"

import { PUBLIC_S3_BUCKET } from "../../packages/practica/services/constants"

type BallotContent = {
  ocrResult: string
  logoImg?: string
}

type BallotProps = {
  ballotPath: string
  votes: BallotContent[][]
}

export default function LegislativeBallot({ ballotPath, votes }: BallotProps) {
  const url = `${PUBLIC_S3_BUCKET}${ballotPath}`

  return (
    <div className="bg-black" style={{ width: 2200 }}>
      {votes.map((row: BallotContent[], rowIndex: number) => {
        return (
          <div
            key={`state-ballot-${rowIndex}`}
            className={`grid grid-cols-${row.length} ${
              rowIndex !== 0 ? "bg-ballots-legislative" : ""
            }`}
          >
            {row.map((col: BallotContent, colIndex: number) => {
              const key = `${col.ocrResult}-${colIndex}`

              if (rowIndex === 0) {
                return (
                  <PartyHeader
                    key={key}
                    url={url}
                    logo={col.logoImg}
                    ocrResult={col.ocrResult}
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
