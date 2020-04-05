import React, { useState } from "react"

import Download from "../../../assets/icons/download.inline.svg"
import ButtonDropdown from "../../button-dropdown"
import Typography from "../../typography"
import Button from "../../button"
import Arrows from "../../arrows"
import Card from "../../card"
import Link from "../../link"
import { AbsenteeAndEarlyVoting } from "../types"

type ReasonProps = {
  summary: string
  details: string
}

function Reason({ summary, details }: ReasonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className="mt-4 border border-separator border-r-0 border-l-0 border-t-0">
      <button
        className="flex justify-between items-center w-full p-2 font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {summary}
        <Arrows />
      </button>
      {isOpen ? (
        <Typography tag="p" variant="p" className="p-2">
          {details}
        </Typography>
      ) : null}
    </li>
  )
}

type Props = {
  icon: string
  title: string
  reasons: AbsenteeAndEarlyVoting[]
  documents: Array<{ title: string; link: string }>
  onClickClose: () => void
}

export default function SpecialVoterReasons(voter: Props) {
  return (
    <Card>
      <img className="w-12 h-auto" src={voter.icon} alt="" />
      <Typography tag="h4" variant="h4" className="mt-4 uppercase">
        {voter.title}
      </Typography>
      <ul>
        {voter.reasons.map(reason => (
          <Reason
            key={reason.summary}
            summary={reason.summary}
            details={reason.details}
          />
        ))}
      </ul>
      {voter.documents.length > 1 ? (
        <ButtonDropdown
          placeholder="Escoge la solicitud a descargar"
          options={voter.documents.map(document => ({ value: document.title }))}
          onSelect={(docTitle: string) => {
            const document = voter.documents.find(doc => doc.title === docTitle)

            // Open download in a new tab.
            window.open(document?.link, "_blank")
          }}
        />
      ) : (
        <Link
          to={voter.documents[0].link}
          target="_blank"
          variant="primary"
          className="mt-6"
        >
          <Download className="mr-1 h-5 w-5 inline-block" /> Descarga la
          solicitud
        </Link>
      )}
      <Button variant="inverse" className="mt-4" onClick={voter.onClickClose}>
        Close
      </Button>
    </Card>
  )
}
