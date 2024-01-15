import { PropsWithChildren, ReactNode } from "react"

import { Typography } from "../../../components"
import Avatar from "../../../assets/images/avatar.svg?url"

type CandidateProps = {
  name: string
  img?: string
}

function CandidateCard(props: CandidateProps) {
  return (
    <div className="flex items-center px-4 py-2 shadow-md bg-white rounded">
      <>
        <img className="h-12 w-12" src={props.img || Avatar} alt="" />
        <Typography
          variant="p"
          tag="p"
          className="font-semibold ml-2 text-left"
        >
          {props.name}
        </Typography>
      </>
    </div>
  )
}

function CandidatesSummarySection(props: {
  children: ReactNode
  inverse: boolean
  className?: string
}) {
  return (
    <div
      className={`border border-r-0 border-l-0 border-t-0 mb-4 ${
        props.inverse ? "" : "border-white"
      } ${props.className}`}
    >
      <Typography
        tag="p"
        variant="p"
        className={`${
          props.inverse ? "" : "text-white"
        } text-left mb-2 font-bold`}
      >
        {props.children}
      </Typography>
    </div>
  )
}

function CandidatesSummary({ children }: PropsWithChildren<{}>) {
  if (children == null) {
    return (
      <div className="grid lg:grid-cols-3 gap-2">
        <div className="flex items-center px-4 py-2 shadow-md bg-white rounded col-span-3">
          <Typography tag="p" variant="p" className="text-center">
            No haz seleccionado un candidato.
          </Typography>
        </div>
      </div>
    )
  }

  return <div className="grid lg:grid-cols-3 gap-2">{children}</div>
}

CandidatesSummary.Section = CandidatesSummarySection
CandidatesSummary.Card = CandidateCard

export default CandidatesSummary
