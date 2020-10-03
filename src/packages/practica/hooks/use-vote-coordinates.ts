import { useState } from "react"
import { VotesCoordinates } from "../../generate-ballot/types/ballot-machine"

export default function useVoteCoordinates(): [
  VotesCoordinates[],
  ({ row, column }: VotesCoordinates) => void
] {
  const [coordinates, setCoordinates] = useState<VotesCoordinates[]>([])
  const setVoteCoordinates = ({ row, column }: VotesCoordinates) => {
    setCoordinates(prevCoordinates => {
      const hasVote = prevCoordinates.some(
        vote => vote.row === row && vote.column === column
      )

      if (hasVote) {
        return prevCoordinates.filter(vote => {
          return !(row === vote.row && column === vote.column)
        })
      }

      return [...prevCoordinates, { row, column }]
    })
  }

  return [coordinates, setVoteCoordinates]
}
