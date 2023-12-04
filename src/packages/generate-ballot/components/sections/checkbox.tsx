import VoteCross from "../../../../assets/icons/vote-cross.svg?url"

type CheckboxProps = {
  type: "candidate" | "party"
  id: string
  isHighlighted: boolean
  voteOpacity: string
  checked?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export default function Checkbox(props: CheckboxProps) {
  const style = `${
    props.type === "candidate" ? "h-8 w-10 ml-3 mr-1" : "h-12 w-16 mx-auto"
  }`

  return (
    <label htmlFor={props.id}>
      <input id={props.id} type="checkbox" className="hidden" />
      <button
        className={`${style} ${
          props.isHighlighted ? "bg-gray-100" : "bg-white"
        }  border flex items-center justify-center`}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onClick={props.onClick}
        data-testid={props.id}
      >
        {props.checked ? (
          <img
            className={`h-6 w-8 ${props.voteOpacity}`}
            src={VoteCross}
            alt=""
          />
        ) : null}
      </button>
    </label>
  )
}
