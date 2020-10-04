import React from "react"

import Checkbox from "./checkbox"

type CandidateProps = {
  img?: string
  ocrResult: string
  hasVote: boolean
  toggleVote?: () => void
}

export default function WriteIn({ hasVote, toggleVote }: CandidateProps) {
  return (
    <div className="border">
      <div className="flex items-center mx-auto py-1 px-3">
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
