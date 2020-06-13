import React, { useState } from "react"

import VoteCross from "../../assets/icons/vote-cross.svg"
import { PUBLIC_S3_BUCKET } from "../../packages/practica/services/constants"

type CheckboxProps = {
  type: "candidate" | "party"
  id: string
  checked?: boolean
}

function Checkbox({ type, id, checked = false }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState<boolean>(checked)
  const style = `${
    type === "candidate" ? "h-8 w-12 ml-3 mr-1" : "h-12 w-16 mx-auto"
  }`

  return (
    <label htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className="hidden"
        onClick={() => setIsChecked(!isChecked)}
      />
      <div
        className={`${style} bg-white border flex items-center justify-center`}
      >
        {isChecked ? <img className="h-6 w-8" src={VoteCross} alt="" /> : null}
      </div>
    </label>
  )
}

type HeaderProps = {
  url: string
  ocrResult: string
  logo?: string
}

function PoliticalParty({ url, logo, ocrResult }: HeaderProps) {
  return (
    <div className="p-2 text-center border border-white" key={ocrResult}>
      <img className="mx-auto" src={`${url}/${logo}`} alt={ocrResult} />
      <Checkbox type="party" id={ocrResult.replace(" ", "-").toLowerCase()} />
      <p className="whitespace-pre-line text-white font-semibold">
        {ocrResult}
      </p>
    </div>
  )
}

function IndependentCandidate({ ocrResult }: { ocrResult: string }) {
  if (ocrResult.includes("CANDIDATOS(AS) INDEPENDIENTES")) {
    const esHeader = "CANDIDATOS(AS) INDEPENDIENTES"
    const enHeader = "INDEPENDENT CANDIDATES"
    const esParagraph = ocrResult
      .substring(esHeader.length, ocrResult.indexOf(enHeader))
      .trim()
      .replace(/\n/g, "")
    const enParagraph = ocrResult
      .substring(ocrResult.indexOf(enHeader) + enHeader.length)
      .trim()
      .replace(/\n/g, "")

    return (
      <div className="p-2 text-center border border-white">
        <p className="whitespace-pre-line text-white font-semibold">
          {esHeader}
        </p>
        <p className="whitespace-pre-line text-white text-sm mt-1">
          {esParagraph}
        </p>
        <p className="whitespace-pre-line text-white font-semibold mt-2">
          {enHeader}
        </p>
        <p className="whitespace-pre-line text-white text-sm mt-1">
          {enParagraph}
        </p>
      </div>
    )
  } else if (ocrResult.includes("NOMINACIÓN DIRECTA")) {
    const esHeader = "NOMINACIÓN DIRECTA"
    const enHeader = "WRITE IN CANDIDATES"
    const esParagraph = ocrResult
      .substring(esHeader.length, ocrResult.indexOf(enHeader))
      .trim()
      .replace(/\n/g, "")
    const enParagraph = ocrResult
      .substring(ocrResult.indexOf(enHeader) + enHeader.length)
      .trim()
      .replace(/\n/g, "")

    return (
      <div className="p-2 text-center border border-white">
        <p className="whitespace-pre-line text-white font-semibold">
          {esHeader}
        </p>
        <p className="whitespace-pre-line text-white text-xs mt-1">
          {esParagraph}
        </p>
        <p className="whitespace-pre-line text-white font-semibold mt-2">
          {enHeader}
        </p>
        <p className="whitespace-pre-line text-white text-xs mt-1">
          {enParagraph}
        </p>
      </div>
    )
  }

  return (
    <div className="p-2 text-center border border-white" key={ocrResult}>
      <p className="whitespace-pre-line text-white">{ocrResult}</p>
    </div>
  )
}

function Header({ url, logo, ocrResult }: HeaderProps) {
  if (logo) {
    return <PoliticalParty url={url} logo={logo} ocrResult={ocrResult} />
  }

  return <IndependentCandidate ocrResult={ocrResult} />
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
    <div className="bg-black" style={{ width: 2200 }}>
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
                  <Header
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
