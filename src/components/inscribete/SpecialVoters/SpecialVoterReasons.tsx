import React, { useState, useEffect, createRef } from "react"
import { useSpring, animated } from "react-spring"
import useMeasure from "react-use-measure"
import { ResizeObserver } from "@juggle/resize-observer"

import Download from "../../../assets/icons/download.inline.svg"
import ButtonDropdown from "../../button-dropdown"
import Typography from "../../typography"
import Button from "../../button"
import Arrows from "../../arrows"
import Card, { CardRef } from "../../card"
import Link from "../../link"
import { AbsenteeAndEarlyVoting } from "../types"

type ReasonProps = {
  summary: string
  details: string
}

export function Reason({ summary, details }: ReasonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver })
  const props = useSpring({
    height: isOpen ? bounds.height || "auto" : 0,
    visibility: isOpen ? "visible" : "hidden",
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
  })

  return (
    <div className="border border-separator border-r-0 border-l-0 border-t-0">
      <button
        className="flex justify-between items-center w-full px-2 pb-2 pt-3 font-semibold text-left text-dark"
        onClick={() => setIsOpen(!isOpen)}
      >
        {summary}
        <span className="w-5">
          <Arrows
            className="inline-block ml-1"
            style={{ transform: props.transform }}
          />
        </span>
      </button>
      <animated.div
        className="overflow-hidden"
        style={{
          height: props.height,
          visibility: props.visibility,
          opacity: props.opacity,
        }}
      >
        <div ref={ref}>
          <Typography tag="p" variant="p" className="px-2 pt-2 pb-3">
            {details}
          </Typography>
        </div>
      </animated.div>
    </div>
  )
}

type Props = {
  icon: string
  title: string
  exceptions?: string
  reasons: AbsenteeAndEarlyVoting[]
  documents: Array<{ title: string; link: string }>
  onClickClose: () => void
}

export default function SpecialVoterReasons(voter: Props) {
  const ref = createRef<CardRef>()

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus()
    }
  }, [ref])

  return (
    <Card ref={ref} tabIndex={-1}>
      <img className="w-12 h-auto mx-auto" src={voter.icon} alt="" />
      <Typography
        tag="h4"
        variant="h4"
        className="mt-4 uppercase tracking-wide text-center"
      >
        {voter.title}
      </Typography>
      <div className="pt-4">
        {voter.reasons.map(reason => (
          <Reason
            key={reason.summary}
            summary={reason.summary}
            details={reason.details}
          />
        ))}
      </div>
      {voter.exceptions ? (
        <Typography tag="p" variant="p" className="mt-4">
          {voter.exceptions}
        </Typography>
      ) : null}
      <div className="w-full md:w-1/2 md:mx-auto">
        {voter.documents.length > 1 ? (
          <ButtonDropdown
            placeholder="Escoge la solicitud a descargar"
            options={voter.documents.map(document => ({
              value: document.title,
            }))}
            onSelect={(docTitle: string) => {
              const document = voter.documents.find(
                doc => doc.title === docTitle
              )

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
        <Button
          variant="inverse"
          className="mt-4 w-full"
          onClick={voter.onClickClose}
        >
          Close
        </Button>
      </div>
    </Card>
  )
}
