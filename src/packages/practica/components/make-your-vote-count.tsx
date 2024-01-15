import { Typography } from "../../../components/index"
import ValidMark from "../../../assets/images/valid-mark.svg?url"
import { useTranslation } from "react-i18next"

export default function MakeYourVoteCount() {
  const { t } = useTranslation();

  return (
    <>
      <Typography tag="h2" variant="h3" className="uppercase">
        {t("practice.make-your-vote-count")}
      </Typography>
      <Typography
        tag="h3"
        variant="h2"
        weight="base"
        className="font-normal mt-4"
      >
        {t("practice.learn-signs")}
      </Typography>
      <div className="mt-8">
        <div className="lg:w-10/12 lg:mx-auto">
          <div className="lg:flex">
            <div className="w-full lg:w-1/4">
              <img
                className="w-32 mx-auto flex-shrink-0"
                src={ValidMark}
                alt=""
              />
            </div>
            <div className="mt-4 w-full lg:w-3/4 lg:mt-0">
              <Typography tag="p" variant="p" className="text-left">
                {t("practice.the-only-valid-sign")}{" "}
                <b>{t("practice.your-vote-discarded")}</b>
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
