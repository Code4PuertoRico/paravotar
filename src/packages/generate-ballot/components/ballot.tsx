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
  ElectiveField,
} from "../../practica/services/ballot-configs/base"
import { BallotType } from "../../../ballot-validator/types"
import {
  BallotStructure,
  CandidatesRow,
  PartyRow,
} from "../../practica/services/ballot-configs/types"
import { useColumnHighlight } from "../../../context/column-highlight-context"
import { Vote } from "../../practica/services/vote-service"

const COLS = [
  "grid-cols-1",
  "grid-cols-2",
  "grid-cols-3",
  "grid-cols-4",
  "grid-cols-5",
  "grid-cols-6",
  "grid-cols-7",
  "grid-cols-8",
  "grid-cols-9",
  "grid-cols-10",
  "grid-cols-11",
  "grid-cols-12",
  "grid-cols-13",
  "grid-cols-14",
]

type BallotProps = {
  type: BallotType
  structure: BallotStructure
  votes: Vote[]
  toggleVote?: (
    candidate: ElectiveField,
    { row, column }: VotesCoordinates
  ) => void
}

export default function BaseBallot(props: BallotProps) {
  const ballotBg =
    props.type === BallotType.state
      ? "bg-ballots-governmental"
      : props.type === BallotType.municipality
        ? "bg-ballots-municipal"
        : "bg-ballots-legislative"
  const { highlightedColumn } = useColumnHighlight()
  const isLegislativeBallot = props.type === BallotType.legislative
  const ballotWidth =
    props.structure && props.structure[0] && props.structure[0].length
      ? props.structure[0].length * 325
      : 2000

  return (
    <div className="bg-black" style={{ width: ballotWidth }}>
      {props.structure.map(
        (row: CandidatesRow | PartyRow | Header[], rowIndex: number) => {
          return (
            <div
              key={`state-ballot-${rowIndex}`}
              className={`grid ${COLS[row.length - 1]} ${
                rowIndex !== 0 ? ballotBg : ""
              }`}
            >
              {row.map((col, colIndex) => {
                const vote = props.votes.find((vote) => {
                  return (
                    vote.position.row === rowIndex &&
                    vote.position.column === colIndex
                  )
                })
                const hasVote = !!vote
                const isExplicitVote = hasVote
                  ? (vote as Vote).wasSelectedExplictly()
                  : false
                const isImplicitVote = hasVote
                  ? (vote as Vote).wasSelectedImplicitly()
                  : false
                const isHighlighted = colIndex === highlightedColumn
                const voteType = isExplicitVote
                  ? "explicit-vote"
                  : isImplicitVote
                    ? "implicit-vote"
                    : "no-vote"
                const voteOpacity = isExplicitVote
                  ? "opacity-100"
                  : isImplicitVote
                    ? "opacity-25"
                    : ""

                if (col instanceof Party) {
                  return (
                    <Ballot.PoliticalParty
                      key={col.id}
                      voteType={voteType}
                      logo={col.insignia}
                      ocrResult={col.name}
                      hasVote={hasVote}
                      voteOpacity={voteOpacity}
                      position={colIndex}
                      isHighlighted={isHighlighted}
                      toggleVote={() => {
                        if (props.toggleVote == null) return

                        props.toggleVote(col, {
                          row: rowIndex,
                          column: colIndex,
                        })
                      }}
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
                  return <Ballot.Rule key={col.id} ocrResult={col.rule} />
                }

                if (col instanceof Candidate) {
                  return (
                    <Ballot.Candidate
                      key={col.id}
                      img={col.img}
                      name={col.name}
                      hasVote={hasVote}
                      voteType={voteType}
                      voteOpacity={voteOpacity}
                      accumulationNumber={col.accumulationNumber}
                      isHighlighted={isHighlighted}
                      isPartyHighlighted={
                        isLegislativeBallot
                          ? col.receivesImpicitVote && isHighlighted
                          : isHighlighted
                      }
                      toggleVote={() => {
                        if (props.toggleVote == null) return

                        props.toggleVote(col, {
                          row: rowIndex,
                          column: colIndex,
                        })
                      }}
                    />
                  )
                }

                if (col instanceof WriteInCandidate) {
                  return (
                    <Ballot.WriteIn
                      key={col.id}
                      accumulationNumber={col.accumulationNumber}
                      hasVote={hasVote}
                      voteOpacity={voteOpacity}
                      voteType={voteType}
                      toggleVote={() => {
                        if (props.toggleVote == null) return

                        props.toggleVote(col, {
                          row: rowIndex,
                          column: colIndex,
                        })
                      }}
                      initialTextValue={col.name || vote?.candidate?.name}
                      updateName={(name: string) => col.setName(name)}
                    />
                  )
                }

                if (col instanceof EmptyCandidacy) {
                  return <Ballot.EmptyCandidacy key={col.id} />
                }

                return (
                  <Ballot.SectionHeader
                    key={col.id}
                    ocrResult={col.info}
                    slug={col.slug}
                  />
                )
              })}
            </div>
          )
        }
      )}
    </div>
  )
}
