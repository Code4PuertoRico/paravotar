type HeaderProps = {
  ocrResult: string
}

export default function Rule({ ocrResult }: HeaderProps) {
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
        <p className="whitespace-pre-line text-white font-semibold text-sm">
          {esHeader}
        </p>
        <p className="whitespace-pre-line text-white text-sm mt-1">
          {esParagraph}
        </p>
        <p className="whitespace-pre-line text-white font-semibold mt-2 text-sm">
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
