import React, { useState } from "react"

import Checkbox from "./checkbox"

type CandidateProps = {
  name: string
  accumulationNumber: string
  hasVote: boolean
  isPartyHighlighted: boolean
  img?: string
  toggleVote?: () => void
}

export default function Candidate(props: CandidateProps) {
  const [isHighlighted, setIsHighlighted] = useState(false)

  return (
    <div className="border">
      <div className="flex items-center mx-auto py-1 px-3">
        {!props.accumulationNumber ? (
          <div className="h-5 w-4"></div>
        ) : (
          <p className="h-5 w-4">{props.accumulationNumber}</p>
        )}
        <Checkbox
          type="candidate"
          id={props.name.replace(" ", "-").toLowerCase()}
          checked={props.hasVote}
          isHighlighted={props.isPartyHighlighted || isHighlighted}
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
        <p className="whitespace-pre-wrap ml-1 text-left">{props.name}</p>
      </div>
    </div>
  )
}
