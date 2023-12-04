import { useTranslation } from "react-i18next"

import { Voter } from "../types"
import Typography from "../../typography"
import NotePad from "../../../assets/icons/notepad.svg?url"

export const VoterInfoLeftPanel = ({
  voterMetadata,
}: {
  voterMetadata: Voter
}) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center m-4 pt-4 lg:w-1/3 lg:m-0 lg:border-r lg:border-separator lg:items-baseline">
      <div className="flex flex-col items-center lg:items-start lg:w-full">
        <img src={NotePad} alt="" className="mb-4 lg:mx-auto" />
        <Typography
          tag="p"
          variant="p"
          weight="base"
          className="font-bold block mb-4"
        >
          {t("site.you-must-know")}
        </Typography>
      </div>
      <ul className="list-disc ml-1">
        {voterMetadata.shouldKnow.map((k, i) => (
          <li className="ml-5 mt-1" key={i}>
            {t(`${k}`)}
          </li>
        ))}
      </ul>
    </div>
  )
}
