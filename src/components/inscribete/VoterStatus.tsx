import React from "react"

import Typography from "../typography"
import Link from "../link"
import BrowserExample from "../../assets/images/browser-example.png"
import OutsideLink from "../../assets/icons/outside-link.inline.svg"
import i18next from "i18next"

export function VoterStatus() {
  return (
    <>
      <div className="text-center">
        <Typography
          id="electoral-status"
          tag="h2"
          variant="h3"
          className="uppercase tracking-wide"
        >
          {i18next.t("site.voter-status")}
        </Typography>
        <Typography
          tag="h3"
          variant="h2"
          weight="base"
          className="font-normal mt-4"
        >
          {i18next.t("site.voter-status-guide")}
        </Typography>
      </div>
      <div className="flex flex-wrap mt-12">
        <div className="w-full lg:w-1/2">
          <img className="mx-auto" src={BrowserExample} alt="" />
        </div>
        <div className="w-full lg:mt-3 lg:w-1/2">
          <Typography tag="h4" variant="h3">
            {i18next.t("site.voter-important")}
          </Typography>
          <Typography tag="p" variant="p" className="mt-4">
            {i18next.t("site.voter-important-guide1")}
          </Typography>
          <Typography tag="p" variant="p" className="mt-4">
            {i18next.t("site.voter-important-guide2")}
          </Typography>
          <Link
            className="mt-6 w-full pt-2 pb-2 md:w-1/2"
            variant="primary"
            to="http://ww2.ceepur.org/es-pr/Paginas/Estatus-del-Elector.aspx"
            target="_blank"
          >
            <OutsideLink className="mr-2 h-5 w-5" />
            {i18next.t("site.voter-status-verify")}
            <span className="sr-only">
              {i18next.t("site.voter-status-verify")}
            </span>
          </Link>
          <Typography tag="p" variant="p" className="mt-2 text-xs">
            {i18next.t("site.voter-status-note")}
          </Typography>
        </div>
      </div>
    </>
  )
}
