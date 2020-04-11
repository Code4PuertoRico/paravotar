import React from "react"

import { Reason } from "./SpecialVoterReasons"
import Typography from "../../typography"
import ButtonDropdown from "../../button-dropdown"
import Link from "../../link"
import Download from "../../../assets/icons/download.inline.svg"

type Props = {
  summary: string
  documents: Array<{ title: string; link: string }>
  reasons: Array<{ summary: string; details: string }>
}

export default function TabContent(voter: Props) {
  return (
    <>
      <Typography tag="p" variant="p" className="mt-4">
        {voter.summary}
      </Typography>
      <ul className="pt-2">
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
          options={voter.documents.map(document => ({
            value: document.title,
          }))}
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
    </>
  )
}
