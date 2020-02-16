import React, { useMemo } from "react"
import { voterCenters } from "./constants"
import { Typography } from "../.."

export function LetterList() {
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

  return (
    <ul className="flex flex-wrap lg:flex-no-wrap justify-around items-start pl-4 pr-4 pt-4 pb-5 border-b border-separator">
      {Object.keys(letterList).map(l => (
        <li key={l}>
          <Typography variant="p" weight="base" className="text-2xl">
            {l}
          </Typography>
        </li>
      ))}
    </ul>
  )
}
