import React, { useState } from "react"

import Checkbox from "./checkbox"

type WriteInProps = {
  img?: string
  hasVote: boolean
  accumulationNumber: string
  toggleVote?: () => void
}

export default function WriteIn(props: WriteInProps) {
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
          id={"id2121"}
          checked={props.hasVote}
          isHighlighted={isHighlighted}
          onClick={props.toggleVote}
          onMouseEnter={() => setIsHighlighted(true)}
          onMouseLeave={() => setIsHighlighted(false)}
        />
        <input
          className="border border-black border-t-0 border-r-0 border-l-0 bg-transparent h-8"
          type="text"
          disabled={!props.hasVote}
        />
      </div>
    </div>
  )
}
