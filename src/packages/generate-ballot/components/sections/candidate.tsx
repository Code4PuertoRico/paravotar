import { useState } from "react"

import Checkbox from "./checkbox"

type CandidateProps = {
  name: string
  accumulationNumber: string
  isHighlighted: boolean
  hasVote: boolean
  isPartyHighlighted: boolean
  voteOpacity: string
  img?: string
  toggleVote?: () => void
  voteType: "explicit-vote" | "implicit-vote" | "no-vote"
}

export default function Candidate(props: CandidateProps) {
  const [isHighlighted, setIsHighlighted] = useState(false)

  return (
    <div className="border">
      <div
        className="flex items-center mx-auto py-1 px-3"
        data-vote-type={props.voteType}
      >
        {!props.accumulationNumber ? (
          <div className="h-5 w-4"></div>
        ) : (
          <p className="h-5 w-4 text-sm">{props.accumulationNumber}</p>
        )}
        <Checkbox
          type="candidate"
          id={props.name.trim().replace(/\s/gi, "-").toLowerCase()}
          checked={props.hasVote}
          isHighlighted={props.isPartyHighlighted || isHighlighted}
          voteOpacity={props.voteOpacity}
          onMouseEnter={() => setIsHighlighted(true)}
          onMouseLeave={() => setIsHighlighted(false)}
          onClick={props.toggleVote}
        />
        {props.img ? (
          <img
            className="h-10 w-10"
            src={props.img}
            alt={`Foto de ${props.name}`}
          />
        ) : (
          <div className="h-10 w-10"></div>
        )}
        <p className="whitespace-pre-wrap ml-1 text-left text-sm">
          {props.name}
        </p>
      </div>
    </div>
  )
}
