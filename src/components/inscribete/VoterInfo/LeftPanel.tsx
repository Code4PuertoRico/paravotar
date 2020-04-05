import React from "react"
import { Voter } from "../types"
import Typography from "../../typography"
import NotePad from "../../../assets/icons/notepad.svg"

export const VoterInfoLeftPanel: React.FunctionComponent<{
  voterMetadata: Voter
}> = ({ voterMetadata }) => (
  <div className="flex flex-col items-center m-4 pt-4 lg:w-1/3 lg:m-0 lg:border-r lg:border-separator lg:items-baseline">
    <div className="flex flex-col items-center lg:items-start ml-2">
      <img src={NotePad} alt="Notepad" className="mb-4 lg:ml-4" />
      <Typography
        tag="p"
        variant="p"
        weight="base"
        className="font-bold block mb-4"
      >
        Debes Saber:
      </Typography>
    </div>
    <ul className="list-disc ml-4">
      {voterMetadata.shouldKnow.map((k, i) => (
        <li className="ml-5 mt-1" key={i}>
          {k}
        </li>
      ))}
    </ul>
  </div>
)
