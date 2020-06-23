import React, { useMemo } from "react"
// import { voterCenters } from "./constants"
import { AvailableCentersDirectory } from "../MakeAppointment/constants"

interface LetterListProps {
  onSelect: (letter: string) => void
  letter: string
}

export function LetterList({ onSelect, letter }: LetterListProps) {
  const letterList = useMemo(
    () =>
      AvailableCentersDirectory.map(({ pueblo }) => pueblo).reduce(
        (letterMap: any, pueblo) => {
          const firstLetter = pueblo.charAt(0)
          if (Object.keys(letterMap).includes(firstLetter)) {
            letterMap[firstLetter] = letterMap[firstLetter] + 1
          } else {
            letterMap[firstLetter] = 1
          }
          return letterMap
        },
        {}
      ),
    []
  )

  const handleSelect = (letter: string) => () => {
    onSelect(letter)
  }

  return (
    <ul className="flex justify-center overflow-x-auto items-start mx-4 pt-4 pb-5 lg:flex-no-wrap">
      {Object.keys(letterList).map(l => (
        <li className="mx-1" key={l}>
          <button
            onClick={handleSelect(l)}
            className={`flex items-center justify-center text-2xl h-10 w-10 rounded-full border-2 hover:bg-primary hover:text-white ${
              l === letter
                ? "text-white font-bold bg-primary border-dark"
                : "border-white"
            }`}
          >
            <span className="sr-only">
              Mostrar los pueblos con Juntas de Inscripción Permanentes que
              comienzan con la letra{" "}
            </span>
            {l}
          </button>
        </li>
      ))}
    </ul>
  )
}
