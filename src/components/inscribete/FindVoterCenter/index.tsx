import { useTranslation } from "react-i18next"
import Typography from "../../typography"
import { FindYourCenter } from "./FindYourCenter"

export function FindVoterCenter() {
  const { t } = useTranslation();

  return (
    <>
      <div className="mx-auto text-center">
        <Typography tag="h2" variant="h3" className="uppercase tracking-wide">
          {t("site.find-your-center-title")}
        </Typography>
        <Typography
          tag="h3"
          variant="h2"
          weight="base"
          className="font-normal mt-4"
        >
          {t("site.find-your-center-sub-title")}
        </Typography>
      </div>
      <div className="mt-12 mb-32">
        <FindYourCenter />
      </div>
    </>
  )
}
