import Typography from "../../typography"
import Tabs from "./Tabs"
import SpecialVoterCards from "./SpecialVoterCards"
import { useTranslation } from "react-i18next"

export function SpecialVoters() {
  const { t } = useTranslation();

  return (
    <>
      <div className="mx-auto text-center">
        <Typography tag="h2" variant="h3" className="uppercase tracking-wide">
          {t("site.special-voters-title")}
        </Typography>
        <Typography
          tag="h3"
          variant="h2"
          weight="base"
          className="font-normal mt-4"
        >
          {t("site.special-voters-guide")}
        </Typography>
      </div>
      <div className="mt-12 mb-16 lg:mb-32">
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
