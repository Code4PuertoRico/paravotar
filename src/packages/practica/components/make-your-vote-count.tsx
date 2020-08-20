import React from "react"

import i18next from "i18next"

import { Typography } from "../../../components/index"
import ValidSign from "../../../assets/images/valid-sign-illustration.svg"

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
      <div className="flex justify-center mt-8">
        <img className="w-78" src={ValidSign} alt="" />
      </div>
      <Typography tag="p" variant="p" className="mt-6">
        {i18next.t("practice.the-only-valid-sign")} <br />{" "}
        <b>{i18next.t("practice.your-vote-discarded")}</b>
      </Typography>
    </>
  )
}
