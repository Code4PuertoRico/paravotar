import { useState } from "react"
import { Selection } from "../../../ballot-validator/types"
import { VotesCoordinates } from "../../generate-ballot/types/ballot-machine"
import { ElectiveField } from "../services/ballot-configs/base"
import { Vote } from "../services/vote-service"

export default function useVoteCoordinates(): [
  Vote[],
  (candidate: ElectiveField, position: VotesCoordinates) => void,
  () => void
] {
  const [coordinates, setCoordinates] = useState<Vote[]>([])
  const setVoteCoordinates = (
    candidate: ElectiveField,
    position: VotesCoordinates
  ) => {
    setCoordinates(prevCoordinates => {
      const hasVote = prevCoordinates.some(
        vote =>
          vote.position.row === position.row &&
          vote.position.column === position.column
      )

      if (hasVote) {
        return prevCoordinates.filter(vote => {
          return !(
            position.row === vote.position.row &&
            position.column === vote.position.column
          )
        })
      }

      const vote = new Vote(candidate, position, Selection.selected)

      return [...prevCoordinates, vote]
    })
  }

  const setVotesToEmpty = () => setCoordinates([])

  return [coordinates, setVoteCoordinates, setVotesToEmpty]
}
