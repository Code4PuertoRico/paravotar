import React from "react"

import Checkbox from "./checkbox"

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

export default function PartyHeader({ url, logo, ocrResult }: HeaderProps) {
  if (logo) {
    return <PoliticalParty url={url} logo={logo} ocrResult={ocrResult} />
  }

  return <IndependentCandidate ocrResult={ocrResult} />
}
