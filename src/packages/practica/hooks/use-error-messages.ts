import { useState } from "react"

import i18next from "i18next"
import { toast } from "react-toastify"

import coordinatesToSections from "../services/coordinates-to-sections"
import BallotValidator from "../../../ballot-validator/index"

import useDeepCompareEffect from "./use-deep-compare-effect"
import { BallotType } from "../../../ballot-validator/types"
import { toFriendlyErrorMessages } from "../../../ballot-validator/helpers/messages"
import { MunicipalBallotConfig } from "../services/ballot-configs"

export default function useToast(state, dependencies: Array<any>) {
  const [isPristine, setIsPristine] = useState(true)

  useDeepCompareEffect(() => {
    let ballotType: any = null
    let ballot: any = null

    if (state.context.ballotType === BallotType.state) {
      ballotType = BallotType.state
      ballot = state.context.ballots.estatal
    } else if (state.context.ballotType === BallotType.legislative) {
      ballotType = BallotType.legislative
      ballot = state.context.ballots.legislativa
    } else if (state.context.ballotType === BallotType.municipality) {
      ballotType = BallotType.municipality
      ballot = state.context.ballots.municipal
    }

    if (!ballotType) {
      return
    }

    if (isPristine) {
      return
    }

    const transformedVotes = coordinatesToSections(
      state.context.votes,
      ballot,
      ballotType
    )

    const validationResult = BallotValidator(transformedVotes, ballotType)

    toast.dismiss()

    toFriendlyErrorMessages(validationResult)?.map(messageId => {
      if (
        messageId.includes("MunicipalLegislatorDynamicSelectionRule") &&
        ballotType === BallotType.municipality
      ) {
        toast.error(
          i18next.t(messageId, {
            maxSelection: (ballot as MunicipalBallotConfig)
              ?.amountOfMunicipalLegislators,
          })
        )
      } else {
        toast.error(i18next.t(messageId))
      }
    })
  }, dependencies)

  return { setIsPristine }
}
