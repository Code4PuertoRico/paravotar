import React from "react"

type SectionHeaderProps = {
  ocrResult: string
  slug: string
}

export default function SectionHeader(props: SectionHeaderProps) {
  return (
    <p
      className="font-semibold text-center whitespace-pre-line border text-sm"
      data-slug={props.slug}
    >
      {props.ocrResult}
    </p>
  )
}
