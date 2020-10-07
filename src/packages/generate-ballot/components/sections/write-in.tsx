import React from "react"

import Checkbox from "./checkbox"

type WriteInProps = {
  img?: string
  hasVote: boolean
  accumulationNumber: string
  toggleVote?: () => void
}

export default function WriteIn({
  hasVote,
  accumulationNumber,
  toggleVote,
}: WriteInProps) {
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
          id={"id2121"}
          checked={hasVote}
          onClick={toggleVote}
        />
        <input
          className="border border-black border-t-0 border-r-0 border-l-0 bg-transparent h-8"
          type="text"
          disabled={!hasVote}
        />
      </div>
    </div>
  )
}
