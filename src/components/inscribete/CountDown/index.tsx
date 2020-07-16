import React, { useState, useCallback } from "react"

import i18next from "i18next"
import useInterval from "@use-it/interval"
import { enUS, es } from "date-fns/locale"
import differenceInDays from "date-fns/differenceInDays"
import differenceInHours from "date-fns/differenceInHours"
import differenceInMinutes from "date-fns/differenceInMinutes"
import differenceInSeconds from "date-fns/differenceInSeconds"
import format from "date-fns/format"
import Typography from "../../typography"

const LAST_DAY = new Date(2020, 8, 14, 16, 0)

function Counter({ timeLeft, title }: { timeLeft: number; title: string }) {
  return (
    <div className="text-center">
      <Typography tag="h2" variant="h2">
        {timeLeft < 10 ? `0${timeLeft}` : timeLeft}
      </Typography>
      <Typography
        tag="p"
        variant="p"
        className="uppercase font-semibold text-gray text-sm lg:text-normal"
      >
        {title}
      </Typography>
    </div>
  )
}

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountDown() {
  const getTimeLeft = useCallback(() => {
    const today = new Date()

    return {
      days: differenceInDays(LAST_DAY, today),
      hours: differenceInHours(LAST_DAY, today) % 24,
      minutes: differenceInMinutes(LAST_DAY, today) % 60,
      seconds: differenceInSeconds(LAST_DAY, today) % 60,
    }
  }, [])
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft())

  useInterval(() => {
    setTimeLeft(getTimeLeft())
  }, 1000)

  return (
    <div>
      <Typography tag="h3" variant="h2" weight="base" className="mt-3">
        {i18next.t("counter.time-is-running-out")}
      </Typography>
      <div className="flex justify-between rounded border border-gray px-4 py-2 bg-white mt-4 mx-auto md:w-2/4">
        <Counter timeLeft={timeLeft.days} title={i18next.t("counter.days")} />
        <Counter timeLeft={timeLeft.hours} title={i18next.t("counter.hours")} />
        <Counter
          timeLeft={timeLeft.minutes}
          title={i18next.t("counter.minutes")}
        />
        <Counter
          timeLeft={timeLeft.seconds}
          title={i18next.t("counter.seconds")}
        />
      </div>
      <Typography tag="h3" variant="p" className="mt-2">
        {i18next.t("counter.last-day")}: <br className="lg:hidden" />
        <span className="font-bold">
          {format(LAST_DAY, "PPPP", {
            locale: i18next.language === "en" ? enUS : es,
          })}
        </span>
      </Typography>
    </div>
  )
}
