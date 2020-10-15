import React from "react"

export default function Spinner({ className }: { className?: string }) {
  return (
    <div className={`loader rounded-full ${className}`}>
      <div className="loader-inner rounded-full" />
    </div>
  )
}
