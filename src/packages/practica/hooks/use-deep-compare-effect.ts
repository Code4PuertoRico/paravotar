import { useEffect, EffectCallback } from "react"

import { isEqual } from "lodash"

import usePrevious from "./use-previous"

export default function useDeepCompareEffect<T>(
  callback: EffectCallback,
  inputs: T[]
) {
  const previousInputs = usePrevious(inputs)

  useEffect(() => {
    if (!isEqual(previousInputs, inputs)) {
      callback()
    }
  })
}
