import React from "react"
import { Town } from "../types"

interface TownListProps {
  townList: Town[]
  town: Town
  onSelect: (town: Town) => void
}

export function TownList({ townList, town, onSelect }: TownListProps) {
  return (
    <ul className="flex items-center overflow-x-auto m-4 lg:block lg:w-1/3 lg:m-0 lg:border-r lg:border-separator">
      {townList.map(t => (
        <li
          key={t.pueblo}
          className="inline-block ml-4 lg:block lg:ml-0 lg:mt-4 first:mt-0 first:ml-0"
        >
          <button
            className={`whitespace-no-wrap ${
              town.pueblo === t.pueblo
                ? "text-xl font-bold"
                : "text-lg font-normal"
            }`}
            onClick={() => onSelect(t)}
          >
            {t.pueblo}
          </button>
        </li>
      ))}
    </ul>
  )
}
