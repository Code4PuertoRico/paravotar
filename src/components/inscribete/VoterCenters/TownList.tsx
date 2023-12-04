import { TownName } from "./TownName"
import { Town } from "../types"

interface TownListProps {
  townList: Town[]
  town: Town
  onSelect: (town: Town) => void
}

export function TownList({ townList, town, onSelect }: TownListProps) {
  return (
    <ul className="flex items-center overflow-x-auto m-4 lg:block lg:w-1/3 lg:m-0 lg:border-r lg:border-separator">
      {townList.map((t) => (
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
