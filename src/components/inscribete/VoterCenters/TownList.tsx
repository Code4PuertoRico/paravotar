import React from "react"
import { useSpring, animated } from "react-spring"

import { Town } from "../types"

interface TownListProps {
  townList: Town[]
  town: Town
  onSelect: (town: Town) => void
}

interface TownProps {
  town: Town
  selectedTown: Town
  onSelect: (town: Town) => void
}

function TownName({ town, selectedTown, onSelect }: TownProps) {
  const props = useSpring({
    fontWeight: selectedTown.pueblo === town.pueblo ? 700 : 500,
    fontSize: selectedTown.pueblo === town.pueblo ? 20 : 18,
  })

  return (
    <li className="inline-block ml-4 h-8 lg:block lg:ml-0 lg:mt-4 first:mt-0 first:ml-0">
      <button className="whitespace-no-wrap" onClick={() => onSelect(town)}>
        <animated.span className="overflow-hidden" style={props}>
          {town.pueblo}
        </animated.span>
      </button>
    </li>
  )
}

export function TownList({ townList, town, onSelect }: TownListProps) {
  return (
    <ul className="flex items-center overflow-x-auto m-4 lg:block lg:w-1/3 lg:m-0 lg:border-r lg:border-separator">
      {townList.map(t => (
        <TownName
          key={t.pueblo}
          town={t}
          selectedTown={town}
          onSelect={onSelect}
        />
      ))}
    </ul>
  )
}
