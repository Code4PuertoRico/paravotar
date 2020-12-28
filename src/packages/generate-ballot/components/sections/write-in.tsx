import React, { useState } from "react"

import Checkbox from "./checkbox"

type WriteInProps = {
  img?: string
  hasVote: boolean
  accumulationNumber: string
  voteOpacity: string
  toggleVote?: () => void
  initialTextValue?: string
  updateName: (name: string) => void
  voteType: "explicit-vote" | "implicit-vote" | "no-vote"
}

export default function WriteIn(props: WriteInProps) {
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
          id={"id2121"}
          checked={props.hasVote}
          isHighlighted={isHighlighted}
          voteOpacity={props.voteOpacity}
          onClick={props.toggleVote}
          onMouseEnter={() => setIsHighlighted(true)}
          onMouseLeave={() => setIsHighlighted(false)}
        />
        <input
          className="border border-black border-t-0 border-r-0 border-l-0 bg-transparent h-8 pl-2"
          type="text"
          disabled={!props.hasVote}
          defaultValue={props.initialTextValue}
          onChange={e => {
            props.updateName(e.target.value)
          }}
        />
      </div>
    </div>
  )
}
