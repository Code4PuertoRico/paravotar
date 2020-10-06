import React from "react"

import Checkbox from "./checkbox"

type HeaderProps = {
  ocrResult: string
  hasVote: boolean
  logo?: string
  toggleVote?: () => void
}

function PoliticalParty({ logo, ocrResult, hasVote, toggleVote }: HeaderProps) {
  return (
    <div className="p-2 text-center border border-white" key={ocrResult}>
      <img className="mx-auto" src={logo} alt={ocrResult} />
      <Checkbox
        type="party"
        id={ocrResult.replace(" ", "-").toLowerCase()}
        checked={hasVote}
        onClick={toggleVote}
      />
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
  }

  return (
    <div className="p-2 text-center border border-white" key={ocrResult}>
      <p className="whitespace-pre-line text-white">{ocrResult}</p>
    </div>
  )
}

export default function PartyHeader({
  logo,
  ocrResult,
  hasVote,
  toggleVote,
}: HeaderProps) {
  if (logo) {
    return (
      <PoliticalParty
        logo={logo}
        ocrResult={ocrResult}
        hasVote={hasVote}
        toggleVote={toggleVote}
      />
    )
  }

  return <IndependentCandidate ocrResult={ocrResult} toggleVote={toggleVote} />
}
