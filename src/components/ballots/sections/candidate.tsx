import React from "react"

import Checkbox from "./checkbox"

type CandidateProps = {
  url: string
  img: string
  ocrResult: string
}

export default function Candidate({ url, img, ocrResult }: CandidateProps) {
  const splitOcrResult = ocrResult
    .trim()
    .replace(/\n/g, " ")
    .split(".")
  const number = splitOcrResult[0]
  const name = splitOcrResult[splitOcrResult.length - 1]

  if (name) {
    return (
      <div className="border px-auto" key={ocrResult}>
        <div className="flex items-center justify-center mx-auto p-1">
          {isNaN(Number(number)) ? null : <p>{number}.</p>}
          <Checkbox
            type="candidate"
            id={name.replace(" ", "-").toLowerCase()}
          />
          <img
            className="h-10 w-10"
            src={`${url}/${img}`}
            alt={`Foto de ${name}`}
          />
          <p className="whitespace-pre-wrap ml-1">{name}</p>
        </div>
      </div>
    )
  }

  return null
}
