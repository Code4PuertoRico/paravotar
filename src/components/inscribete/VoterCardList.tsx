import { VoterCard } from "./VoterCard"
import { VoterDocs } from "./constants"

export function VoterCardList() {
  return (
    <ul className="flex flex-wrap lg:flex-no-wrap justify-around items-start">
      {VoterDocs.map((voter) => (
        <VoterCard key={voter.id} {...voter} />
      ))}
    </ul>
  )
}
