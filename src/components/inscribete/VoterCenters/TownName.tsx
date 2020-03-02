import React, { memo } from "react"
import { useSpring, animated } from "react-spring"

import { Town } from "../types"

interface TownProps {
  town: Town
  selectedTown: Town
  onSelect: (town: Town) => void
}

function Name({ town, selectedTown, onSelect }: TownProps) {
  const props = useSpring({
    fontWeight: selectedTown.pueblo === town.pueblo ? 700 : 500,
    fontSize: selectedTown.pueblo === town.pueblo ? 20 : 18,
    opacity: 1,
    from: {
      opacity: 0,
    },
  })

  return (
    <li className="inline-block ml-4 h-8 lg:block lg:ml-0 lg:mt-4 first:mt-0 first:ml-0">
      <animated.button
        className="whitespace-no-wrap overflow-hidden h-8 focus:outline-none"
        onClick={() => onSelect(town)}
        style={props}
      >
        {town.pueblo}
      </animated.button>
    </li>
  )
}

export const TownName = memo(Name)
