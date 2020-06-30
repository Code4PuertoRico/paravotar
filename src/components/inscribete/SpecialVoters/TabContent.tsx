import React from "react"
import { animated, useSpring } from "react-spring"
import i18next from "i18next"

import { Reason } from "./SpecialVoterReasons"
import Typography from "../../typography"
import ButtonDropdown from "../../button-dropdown"
import Link from "../../link"
import Download from "../../../assets/icons/download.inline.svg"

type Props = {
  title: string
  summary: string
  deadline: string
  exceptions?: string
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
        {i18next.t("site.special-voters-deadline-text")}
        <br />
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
            summary={i18next.t(reason.summary)}
            details={i18next.t(reason.details)}
          />
        ))}
      </ul>
      <Typography tag="p" variant="p" className="mt-4">
        {i18next.t(voter.exceptions)}
      </Typography>
      {voter.documents.length > 1 ? (
        <ButtonDropdown
          placeholder={i18next.t("site.absentee-voter-dropdown")}
          options={voter.documents.map(document => ({
            value: i18next.t(document.title),
          }))}
          onSelect={(docTitle: string) => {
            if (docTitle == "Voto Adelantado" || docTitle == "Early Vote")
              docTitle = "site.absentee-voter-dropdown-01"
            else if (
              docTitle == "Voto en el Domicilio" ||
              docTitle == "Vote at Home"
            )
              docTitle = "site.absentee-voter-dropdown-02"
            else if (
              docTitle == "Voto por el Teléfono" ||
              docTitle == "Vote by Phone"
            )
              docTitle = "site.absentee-voter-dropdown-03"
            else docTitle = "none"

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
          <Download className="mr-1 h-5 w-5 inline-block" />
          {i18next.t("site.early-voter-dropdown")}
        </Link>
      )}
    </animated.div>
  )
}
