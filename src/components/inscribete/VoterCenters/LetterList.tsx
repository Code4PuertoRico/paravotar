import React, { useMemo, useState } from "react"
import { voterCenters } from "./constants"
import { Typography } from "../.."

interface LetterListProps {
  onSelect: (letter: string) => void
  letter: string
}

export function LetterList({ onSelect, letter }: LetterListProps) {
  const letterList = useMemo(
    () =>
      voterCenters
        .map(({ pueblo }) => pueblo)
        .reduce((letterMap: any, pueblo) => {
          const firstLetter = pueblo.charAt(0)
          if (Object.keys(letterMap).includes(firstLetter)) {
            letterMap[firstLetter] = letterMap[firstLetter] + 1
          } else {
            letterMap[firstLetter] = 1
          }
          return letterMap
        }, {}),
    []
  )

  const handleSelect = (letter: string) => () => {
    onSelect(letter)
  }

  return (
    <ul className="flex flex-wrap lg:flex-no-wrap justify-around items-start pl-4 pr-4 pt-4 pb-5 border-b border-separator">
      {Object.keys(letterList).map(l => (
        <li key={l}>
          <button
            onClick={handleSelect(l)}
            className={`hover:bg-secondary hover:text-white hover:rounded-full pl-2 pr-2 focus:outline-none ${
              l === letter
                ? "bg-secondary text-white rounded-full border-2 border-dark"
                : null
            }`}
          >
            <span className="text-2xl">{l}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
