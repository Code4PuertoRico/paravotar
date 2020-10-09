import React from "react"

import VoteCross from "../../../../assets/icons/vote-cross.svg"

type CheckboxProps = {
  type: "candidate" | "party"
  id: string
  isHighlighted: boolean
  checked?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export default function Checkbox(props: CheckboxProps) {
  const style = `${
    props.type === "candidate" ? "h-8 w-12 ml-3 mr-1" : "h-12 w-16 mx-auto"
  }`

  return (
    <label htmlFor={props.id}>
      <input id={props.id} type="checkbox" className="hidden" />
      <button
        className={`${style} bg-white border flex items-center justify-center`}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onClick={props.onClick}
      >
        {props.checked || props.isHighlighted ? (
          <img
            className={`h-6 w-8 ${props.isHighlighted ? "opacity-75" : ""}`}
            src={VoteCross}
            alt=""
          />
        ) : null}
      </button>
    </label>
  )
}
