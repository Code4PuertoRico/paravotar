import React, { useMemo, useState, useEffect } from "react"
import { animated, useSpring } from "react-spring"
import useMeasure from "react-use-measure"
import { ResizeObserver } from "@juggle/resize-observer"
import Dropdown from "react-dropdown-aria"

import { LetterList } from "./LetterList"
import { TownList } from "./TownList"
// import { voterCenters } from "./constants"
import { AvailableCentersDirectory } from "../MakeAppointment/constants"
import { CenterInfo } from "./CenterInfo"
import Typography from "../../typography"

const style: { [key: string]: any } = {
  DropdownButton: (base: any, { open }: any) => ({
    ...base,
    backgroundColor: "white",
    borderColor: open ? "#292936" : "#cacad9",
    "&:hover": {
      borderColor: open ? "#292936" : "#cacad9",
    },

    "&:focus": {
      borderColor: open ? "#292936" : "#cacad9",
    },
  }),
  OptionContainer: (base: any) => ({
    ...base,
    marginTop: 8,
    backgroundColor: "white",
    borderColor: "#cacad9",
    borderWidth: 1,
    borderRadius: 6,
    boxShadow: "0px 3px 10px #cacad9",
  }),
  OptionItem: (base: any) => {
    return {
      ...base,
      backgroundColor: "white",
      color: "#292936",
      paddingTop: 8,
      paddingBottom: 8,
      "&:hover": {
        backgroundColor: "#ebebff",
      },
    }
  },
}

const dropdownOptions = AvailableCentersDirectory.map(
  ({ pueblo, JIPIsla }) => ({
    value: `${pueblo}${JIPIsla ? " (Isla)" : ""}`,
  })
)

export function VoterCenters() {
  const [selectedLetter, setSelectedLetter] = useState("A")

  const townList = useMemo(
    () =>
      AvailableCentersDirectory.filter(({ pueblo }) =>
        pueblo.startsWith(selectedLetter)
      ),
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
      <Typography
        id="juntas-de-inscripcion-permanentes"
        tag="h2"
        variant="h3"
        className="uppercase text-center tracking-wide"
      >
        Saca una cita e inscríbete
      </Typography>
      <Typography
        tag="h3"
        variant="h2"
        weight="base"
        className="text-center mt-3"
      >
        Encuentra la Junta de Inscripción Permanente más cercana a ti e
        inscríbete.
      </Typography>
      <div className="mt-12 bg-white shadow-md rounded">
        <section>
          <div className="md:hidden">
            <Dropdown
              placeholder="Pueblo"
              id="dropdown"
              searchable={true}
              options={dropdownOptions}
              selectedOption={
                selectedTown.JIPIsla
                  ? `${selectedTown.pueblo} (Isla)`
                  : selectedTown.pueblo
              }
              setSelected={(t: string) => {
                const selection = t.replace(" (Isla)", "")

                setSelectedTown(
                  AvailableCentersDirectory.filter(
                    ({ pueblo }) => pueblo === selection
                  )[0]
                )
              }}
              style={style}
            />
            <CenterInfo key={selectedTown.pueblo} town={selectedTown} />
          </div>
          <div className="hidden md:block">
            <LetterList onSelect={setSelectedLetter} letter={selectedLetter} />
            <animated.div
              className="overflow-hidden"
              style={{ height: props.height }}
            >
              <div
                className="border-t border-separator lg:flex lg:p-10"
                ref={ref}
                style={{ maxHeight: 500 }}
              >
                <TownList
                  townList={townList}
                  onSelect={setSelectedTown}
                  town={selectedTown}
                />
                <CenterInfo key={selectedTown.pueblo} town={selectedTown} />
              </div>
            </animated.div>
          </div>
        </section>
      </div>
    </>
  )
}
