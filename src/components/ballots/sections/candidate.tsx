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
      <div className="border" key={ocrResult}>
        <div className="flex items-center mx-auto py-1 px-3">
          {isNaN(Number(number)) ? (
            <div className="h-5 w-4"></div>
          ) : (
            <p className="h-5 w-4">{number}.</p>
          )}
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
