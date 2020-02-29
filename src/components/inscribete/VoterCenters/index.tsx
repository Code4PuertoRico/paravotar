import React, { useMemo, useState, useEffect } from "react"
import { animated, useSpring } from "react-spring"
import useMeasure from "react-use-measure"
import { ResizeObserver } from "@juggle/resize-observer"

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

  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver })
  const props = useSpring({
    height: bounds.height || "auto",
  })

  return (
    <>
      <LetterList onSelect={setSelectedLetter} letter={selectedLetter} />
      <animated.div
        className="overflow-hidden"
        style={{ height: props.height }}
      >
        <div className="border-t border-separator lg:flex lg:p-10" ref={ref}>
          <TownList
            townList={townList}
            onSelect={setSelectedTown}
            town={selectedTown}
          />
          <CenterInfo key={selectedTown.pueblo} town={selectedTown} />
        </div>
      </animated.div>
    </>
  )
}
