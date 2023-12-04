import { useColumnHighlight } from "../../../../context/column-highlight-context"
import Checkbox from "./checkbox"

type HeaderProps = {
  ocrResult: string
  hasVote: boolean
  position: number
  isHighlighted: boolean
  voteOpacity: string
  logo?: string
  toggleVote?: () => void
  voteType: "explicit-vote" | "implicit-vote" | "no-vote"
}

export default function PoliticalParty(props: HeaderProps) {
  const { setHighlightedColumn } = useColumnHighlight()

  return (
    <div
      className="p-2 text-center border border-white"
      key={props.ocrResult}
      data-vote-type={props.voteType}
    >
      <img className="mx-auto" src={props.logo} alt={props.ocrResult} />
      <Checkbox
        type="party"
        id={props.ocrResult.trim().replace(/\s/gi, "-").toLowerCase()}
        checked={props.hasVote}
        onClick={props.toggleVote}
        isHighlighted={props.isHighlighted}
        voteOpacity={props.voteOpacity}
        onMouseEnter={() => {
          setHighlightedColumn(props.position)
        }}
        onMouseLeave={() => {
          setHighlightedColumn(null)
        }}
      />
      <p className="whitespace-pre-line text-white font-semibold text-sm">
        {props.ocrResult}
      </p>
    </div>
  )
}
