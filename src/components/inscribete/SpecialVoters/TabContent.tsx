import React from "react"
import { animated, useSpring } from "react-spring"

import { Reason } from "./SpecialVoterReasons"
import Typography from "../../typography"
import ButtonDropdown from "../../button-dropdown"
import Link from "../../link"
import Download from "../../../assets/icons/download.inline.svg"

type Props = {
  title: string
  summary: string
  deadline: string
  documents: Array<{ title: string; link: string }>
  reasons: Array<{ summary: string; details: string }>
}

export default function TabContent(voter: Props) {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } })

  return (
    <animated.div style={props}>
      <Typography tag="p" variant="p" className="mt-6">
        {voter.summary}
      </Typography>
      <Typography tag="p" variant="p" className="mt-4" weight="semibold">
        Fecha límite para sometera tu solicitud: <br />{" "}
        <span className="text-primary">
          <time>{voter.deadline}</time>
        </span>
      </Typography>
      <Typography tag="p" variant="h4" className="mt-6" weight="semibold">
        {voter.title}
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
    </animated.div>
  )
}
