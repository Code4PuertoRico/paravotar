import React from "react"

import VoteCross from "../../../../assets/icons/vote-cross.svg"

type CheckboxProps = {
  type: "candidate" | "party"
  id: string
  checked?: boolean
  onClick?: () => void
}

export default function Checkbox({
  type,
  id,
  checked = false,
  onClick,
}: CheckboxProps) {
  const style = `${
    type === "candidate" ? "h-8 w-12 ml-3 mr-1" : "h-12 w-16 mx-auto"
  }`

  return (
    <label htmlFor={id}>
      <input id={id} type="checkbox" className="hidden" onClick={onClick} />
      <div
        className={`${style} bg-white border flex items-center justify-center`}
      >
        {checked ? <img className="h-6 w-8" src={VoteCross} alt="" /> : null}
      </div>
    </label>
  )
}
