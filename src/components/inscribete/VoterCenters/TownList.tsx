import React from "react"
import { Town } from "../types"

interface TownListProps {
  townList: Town[]
  town: Town
  onSelect: (town: Town) => void
}

export function TownList({ townList, town, onSelect }: TownListProps) {
  return (
    <ul className="w-1/3 pl-8 border-r border-separator">
      {townList.map(t => (
        <li key={t.pueblo} className="pt-2 pb-2">
          <button onClick={() => onSelect(t)}>
            <span
              className={`${
                town.pueblo === t.pueblo
                  ? "text-xl font-bold"
                  : "text-lg font-normal"
              }`}
            >
              {t.pueblo}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
