import React from "react"

import i18next from "i18next"

import { Typography } from "../../../components/index"
import ValidMark from "../../../assets/images/valid-mark.svg"

export default function MakeYourVoteCount() {
  return (
    <>
      <Typography tag="h2" variant="h3" className="uppercase">
        {i18next.t("practice.make-your-vote-count")}
      </Typography>
      <Typography
        tag="h3"
        variant="h2"
        weight="base"
        className="font-normal mt-4"
      >
        {i18next.t("practice.learn-signs")}
      </Typography>
      <div className="mt-8">
        <Typography tag="h3" variant="h3" className="uppercase">
          {i18next.t("practice.valid-mark")}
        </Typography>
        <img className="w-78 mx-auto" src={ValidMark} alt="" />
      </div>
      <Typography tag="p" variant="p" className="mt-6">
        {i18next.t("practice.the-only-valid-sign")} <br />{" "}
        <b>{i18next.t("practice.your-vote-discarded")}</b>
      </Typography>
    </>
  )
}
