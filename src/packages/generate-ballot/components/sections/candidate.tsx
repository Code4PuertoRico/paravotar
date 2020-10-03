import React from "react"

import Checkbox from "./checkbox"

type CandidateProps = {
  img?: string
  ocrResult: string
  hasVote: boolean
  toggleVote?: () => void
}

export default function Candidate({
  img,
  ocrResult,
  hasVote,
  toggleVote,
}: CandidateProps) {
  const splitOcrResult = ocrResult
    .trim()
    .replace(/\n/g, " ")
    .split(".")
  const number = splitOcrResult[0]
  const name = splitOcrResult[splitOcrResult.length - 1]

  if (name) {
    return (
      <div className="border" key={ocrResult}>
        <div className="flex items-center mx-auto py-1 px-3">
          {isNaN(Number(number)) ? (
            <div className="h-5 w-4"></div>
          ) : (
            <p className="h-5 w-4">{number}.</p>
          )}
          <Checkbox
            type="candidate"
            id={name.replace(" ", "-").toLowerCase()}
            checked={hasVote}
            onClick={toggleVote}
          />
          <img className="h-10 w-10" src={img} alt={`Foto de ${name}`} />
          <p className="whitespace-pre-wrap ml-1">{name}</p>
        </div>
      </div>
    )
  }

  return null
}
