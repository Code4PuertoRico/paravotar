import React from "react"

import Checkbox from "./checkbox"

type CandidateProps = {
  name: string
  accumulationNumber: string
  hasVote: boolean
  img?: string
  toggleVote?: () => void
}

export default function Candidate({
  img,
  name,
  accumulationNumber,
  hasVote,
  toggleVote,
}: CandidateProps) {
  return (
    <div className="border">
      <div className="flex items-center mx-auto py-1 px-3">
        {!accumulationNumber ? (
          <div className="h-5 w-4"></div>
        ) : (
          <p className="h-5 w-4">{accumulationNumber}</p>
        )}
        <Checkbox
          type="candidate"
          id={name.replace(" ", "-").toLowerCase()}
          checked={hasVote}
          onClick={toggleVote}
        />
        {img ? (
          <img className="h-10 w-10" src={img} alt={`Foto de ${name}`} />
        ) : (
          <div className="h-10 w-10"></div>
        )}
        <p className="whitespace-pre-wrap ml-1 text-left">{name}</p>
      </div>
    </div>
  )
}
