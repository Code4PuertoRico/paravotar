import React, { useState } from "react"

import i18next from "i18next"
import useInterval from "@use-it/interval"
import { en, es } from "date-fns/locale"
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
        {timeLeft}
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

export function CountDown() {
  const today = new Date()
  const [days, setDays] = useState(differenceInDays(LAST_DAY, today))
  const [hours, setHours] = useState(differenceInHours(LAST_DAY, today))
  const [minutes, setMinutes] = useState(differenceInMinutes(LAST_DAY, today))
  const [seconds, setSeconds] = useState(differenceInSeconds(LAST_DAY, today))

  useInterval(() => {
    const now = new Date()

    setHours(differenceInHours(LAST_DAY, today))
    setDays(differenceInDays(LAST_DAY, today))
    setMinutes(differenceInMinutes(LAST_DAY, now))
    setSeconds(differenceInSeconds(LAST_DAY, now))
  }, 1000)

  return (
    <div>
      <Typography tag="h3" variant="h2" weight="base" className="mt-3">
        {i18next.t("counter.time-is-running-out")}
      </Typography>
      <div className="flex justify-between rounded border border-gray px-4 py-2 bg-white mt-4 mx-auto md:w-2/4">
        <Counter timeLeft={days} title={i18next.t("counter.days")} />
        <Counter timeLeft={hours % 24} title={i18next.t("counter.hours")} />
        <Counter timeLeft={minutes % 60} title={i18next.t("counter.minutes")} />
        <Counter timeLeft={seconds % 60} title={i18next.t("counter.seconds")} />
      </div>
      <Typography tag="h3" variant="p" className="mt-2">
        {i18next.t("counter.last-day")}: <br className="lg:hidden" />
        <span className="font-bold">
          {format(LAST_DAY, "PPPP", {
            locale: i18next.language === "en" ? en : es,
          })}
        </span>
      </Typography>
    </div>
  )
}
