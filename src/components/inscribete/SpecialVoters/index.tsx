import React from "react"
import i18next from "i18next"

import Typography from "../../typography"
import Tabs from "./Tabs"
import SpecialVoterCards from "./SpecialVoterCards"

export function SpecialVoters() {
  return (
    <>
      <div className="mx-auto text-center">
        <Typography tag="h2" variant="h3" className="uppercase tracking-wide">
          {i18next.t("site.special-voters-title")}
        </Typography>
        <Typography
          tag="h3"
          variant="h2"
          weight="base"
          className="font-normal mt-4"
        >
          {i18next.t("site.special-voters-guide")}
        </Typography>
      </div>
      <div className="mt-12 mb-32">
        <div className="md:hidden">
          <Tabs />
        </div>
        <div className="hidden md:block">
          <SpecialVoterCards />
        </div>
      </div>
    </>
  )
}
