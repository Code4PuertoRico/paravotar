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
    <li className="ml-4 mt-1 lg:flex lg:items-center lg:ml-0 lg:mt-4 first:mt-0 first:ml-0">
      <animated.button
        className="whitespace-no-wrap overflow-hidden h-8 m-1"
        onClick={() => onSelect(town)}
        style={props}
      >
        {town.pueblo}
      </animated.button>
      {town.JIPIsla ? (
        <animated.div
          className="inline-block"
          style={{ opacity: props.opacity }}
        >
          <span className="bg-primary py-1 px-2 ml-2 rounded font-bold text-xs uppercase text-white">
            Isla
          </span>
        </animated.div>
      ) : null}
    </li>
  )
}

export const TownName = memo(Name)
