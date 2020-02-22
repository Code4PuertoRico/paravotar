import React, { useMemo, useState, useEffect } from "react"
import { LetterList } from "./LetterList"
import { TownList } from "./TownList"
import { voterCenters } from "./constants"
import { CenterInfo } from "./CenterInfo"

export function VoterCenters() {
  const [selectedLetter, setSelectedLetter] = useState("A")

  const townList = useMemo(
    () =>
      voterCenters.filter(({ pueblo }) => pueblo.startsWith(selectedLetter)),
    [selectedLetter]
  )

  const [selectedTown, setSelectedTown] = useState(townList[0])

  useEffect(() => {
    setSelectedTown(townList[0])
  }, [selectedLetter, townList])

  return (
    <>
      <LetterList onSelect={setSelectedLetter} letter={selectedLetter} />
      <div className="border-t border-separator lg:flex lg:p-10">
        <TownList
          townList={townList}
          onSelect={setSelectedTown}
          town={selectedTown}
        />
        <CenterInfo town={selectedTown} />
      </div>
    </>
  )
}
