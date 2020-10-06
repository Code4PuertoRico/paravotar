import React from "react"

import * as Ballot from "./sections/index"

import { VotesCoordinates } from "../types/ballot-machine"
import {
  Party,
  Candidate,
  Header,
  Rule,
  WriteInCandidate,
  EmptyCandidacy,
  WriteInRules,
} from "../../practica/services/ballot-configs/base"
import { BallotType } from "../../../ballot-validator/types"
import {
  BallotStructure,
  CandidatesRow,
  PartyRow,
} from "../../practica/services/ballot-configs/types"

type BallotProps = {
  type: BallotType
  structure: BallotStructure
  votes: VotesCoordinates[]
  toggleVote: ({ row, column }: VotesCoordinates) => void
}

export default function BaseBallot({
  type,
  structure,
  votes,
  toggleVote,
}: BallotProps) {
  const ballotBg =
    type === BallotType.state
      ? "bg-ballots-governmental"
      : type === BallotType.municipality
      ? "bg-ballots-municipal"
      : "bg-ballots-legislative"

  return (
    <div className="bg-black" style={{ width: 2200 }}>
      {structure.map(
        (row: CandidatesRow | PartyRow | Header[], rowIndex: number) => {
          return (
            <div
              key={`state-ballot-${rowIndex}`}
              className={`grid grid-cols-${row.length} ${
                rowIndex !== 0 ? ballotBg : ""
              }`}
            >
              {row.map(
                (col: Party | Rule | Candidate | Header, colIndex: number) => {
                  const vote = !!votes.find(vote => {
                    return vote.row === rowIndex && vote.column === colIndex
                  })

                  if (col instanceof Party) {
                    return (
                      <Ballot.PartyHeader
                        key={col.id}
                        logo={col.insignia}
                        ocrResult={col.name}
                        hasVote={vote}
                        toggleVote={() =>
                          toggleVote({ row: rowIndex, column: colIndex })
                        }
                      />
                    )
                  }

                  if (col instanceof WriteInRules) {
                    return (
                      <Ballot.WriteInRules
                        key={col.id}
                        esTitle={col.esTitle}
                        esRules={col.esRules}
                        enTitle={col.enTitle}
                        enRules={col.enRules}
                      />
                    )
                  }

                  if (col instanceof Rule) {
                    return (
                      <Ballot.PartyHeader
                        key={col.id}
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
                      <Ballot.Candidate
                        key={col.id}
                        img={col.img}
                        name={col.name}
                        placement={col.placement}
                        hasVote={vote}
                        toggleVote={() =>
                          toggleVote({ row: rowIndex, column: colIndex })
                        }
                      />
                    )
                  }

                  if (col instanceof WriteInCandidate) {
                    return (
                      <Ballot.WriteIn
                        key={col.id}
                        toggleVote={() =>
                          toggleVote({ row: rowIndex, column: colIndex })
                        }
                      />
                    )
                  }

                  if (col instanceof EmptyCandidacy) {
                    return <Ballot.EmptyCandidacy key={col.id} />
                  }

                  return (
                    <Ballot.SectionHeader key={col.id} ocrResult={col.info} />
                  )
                }
              )}
            </div>
          )
        }
      )}
    </div>
  )
}
