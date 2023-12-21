import { useState } from "react"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import { State } from "xstate"

import coordinatesToSections from "../services/coordinates-to-sections"
import BallotValidator from "../../../ballot-validator/index"
import useDeepCompareEffect from "./use-deep-compare-effect"
import { BallotType } from "../../../ballot-validator/types"
import { toFriendlyErrorMessages } from "../../../ballot-validator/helpers/messages"
import { MunicipalBallotConfig } from "../services/ballot-configs"
import { getExplicitlySelectedVotes } from "../services/vote-service"
import { PracticeContext } from "../services/types"
import { PracticeEvent } from "../machines/practice"

export default function useToast(
  state: State<PracticeContext, PracticeEvent>,
  dependencies: Array<any>
) {
  const [isPristine, setIsPristine] = useState(true)
  const { t } = useTranslation()

  useDeepCompareEffect(() => {
    let ballotType: any = null
    let ballot: any = null

    if (state.context.ballotType === BallotType.state) {
      ballotType = BallotType.state
      ballot = state.context.ballots?.estatal
    } else if (state.context.ballotType === BallotType.legislative) {
      ballotType = BallotType.legislative
      ballot = state.context.ballots?.legislativa
    } else if (state.context.ballotType === BallotType.municipality) {
      ballotType = BallotType.municipality
      ballot = state.context.ballots?.municipal
    }

    if (!ballotType) {
      return
    }

    if (isPristine) {
      return
    }

    const cleanedVotes = getExplicitlySelectedVotes(state.context.votes)
    const transformedVotes = coordinatesToSections(
      cleanedVotes,
      ballot,
      ballotType
    )

    const validationResult = BallotValidator(transformedVotes, ballotType)

    toast.dismiss()

    toFriendlyErrorMessages(validationResult)?.map((messageId) => {
      if (
        messageId.includes("MunicipalLegislatorDynamicSelectionRule") &&
        ballotType === BallotType.municipality
      ) {
        toast.error(
          t(messageId, {
            maxSelection: (ballot as MunicipalBallotConfig)
              ?.amountOfMunicipalLegislators,
          })
        )
      } else {
        toast.error(t(messageId))
      }
    })
  }, dependencies)

  return { setIsPristine }
}
