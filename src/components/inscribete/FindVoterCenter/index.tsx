import React from "react"
import i18next from "i18next"

import Typography from "../../typography"
import { FindYourCenter } from "./FindYourCenter"

export function FindVoterCenter() {
  return (
    <>
      <div className="mx-auto text-center">
        <Typography
          id="tu-centro-de-votacion"
          tag="h2"
          variant="h3"
          className="uppercase tracking-wide"
        >
          {i18next.t("site.find-your-center-title")}
        </Typography>
        <Typography
          tag="h3"
          variant="h2"
          weight="base"
          className="font-normal mt-4"
        >
          {i18next.t("site.find-your-center-sub-title")}
        </Typography>
      </div>
      <div className="mt-12 mb-32">
        <FindYourCenter />
      </div>
    </>
  )
}
