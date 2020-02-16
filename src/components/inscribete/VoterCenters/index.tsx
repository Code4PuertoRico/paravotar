import React, { useMemo, useState } from "react"
import { LetterList } from "./LetterList"
import { voterCenters } from "./constants"

export function VoterCenters() {
  const [selectedLetter, setSelectedLetter] = useState("A")
  const townList = useMemo(
    () =>
      voterCenters.filter(({ pueblo }) => pueblo.startsWith(selectedLetter)),
    [selectedLetter]
  )

  return (
    <section>
      <LetterList onSelect={setSelectedLetter} letter={selectedLetter} />
      <br />
      <ul>
        {townList.map(({ pueblo }) => (
          <li key={pueblo}>{pueblo}</li>
        ))}
      </ul>
    </section>
  )
}
