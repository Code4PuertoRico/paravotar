import React from "react"
import { PUBLIC_S3_BUCKET } from "../../packages/practica/services/constants"

type PartyHeaderProps = {
  url: string
  ocrResult: string
  logo?: string
}

function PartyHeader({ url, logo, ocrResult }: PartyHeaderProps) {
  return (
    <div className="px-auto text-center border border-white" key={ocrResult}>
      {logo && (
        <img className="mx-auto" src={`${url}/${logo}`} alt={ocrResult} />
      )}
      <input type="checkbox" />
      <p className="whitespace-pre-line text-white">{ocrResult}</p>
    </div>
  )
}

type CandidateProps = {
  index: number
  url: string
  img: string
  ocrResult: string
}

function Candidate({ url, img, ocrResult }: CandidateProps) {
  const splitOcrResult = ocrResult
    .trim()
    .replace("\n", " ")
    .split(".")
  const number = splitOcrResult[0]
  const name = splitOcrResult[splitOcrResult.length - 1]

  if (name) {
    return (
      <div className="border px-auto" key={ocrResult}>
        <div className="flex items-center justify-center mx-auto p-1">
          {isNaN(Number(number)) ? null : <p>{number}.</p>}
          <div className="h-8 w-12 bg-white border ml-3 mr-1"></div>
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

function SectionHeader({ ocrResult }: { ocrResult: string }) {
  return (
    <p className="font-semibold text-center whitespace-pre-line border">
      {ocrResult}
    </p>
  )
}

export default function StateBallot({ ballotPath, votes }) {
  const url = `${PUBLIC_S3_BUCKET}${ballotPath}`

  return (
    <div className="bg-black" style={{ width: 4000 }}>
      {votes.map((row, rowIndex) => {
        return (
          <div
            key={`state-ballot-${rowIndex}`}
            className={`grid grid-cols-${row.length} ${
              rowIndex !== 0 ? "bg-ballots-governmental" : ""
            }`}
          >
            {row.map((col, colIndex) => {
              const key = `${col.ocrResult}-${colIndex}`

              if (rowIndex === 0) {
                return (
                  <PartyHeader
                    key={key}
                    url={url}
                    logo={col.logoImg}
                    ocrResult={col.ocrResult}
                  />
                )
              }

              if (col.logoImg) {
                return (
                  <Candidate
                    key={key}
                    url={url}
                    img={col.logoImg}
                    ocrResult={col.ocrResult}
                  />
                )
              }

              return <SectionHeader key={key} ocrResult={col.ocrResult} />
            })}
          </div>
        )
      })}
    </div>
  )
}
