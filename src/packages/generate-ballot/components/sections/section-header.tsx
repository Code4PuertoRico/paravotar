import React from "react"

export default function SectionHeader({ ocrResult }: { ocrResult: string }) {
  return (
    <p className="font-semibold text-center whitespace-pre-line border">
      {ocrResult}
    </p>
  )
}
