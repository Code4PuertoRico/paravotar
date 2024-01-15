import { useTranslation } from "react-i18next"

import { ActiveCenters } from "./constants"
import Typography from "../../typography"
import { Link } from "../../../components/index"
import Location from "../../../assets/icons/location.svg?url"

export default function MakeAppointment() {
  const { t } = useTranslation();

  return (
    <>
      <div className="mx-auto text-center">
        <Typography
          id="saca-tu-cita"
          tag="h2"
          variant="h3"
          className="uppercase tracking-wide"
        >
          {t("site.where-voter-card")}
        </Typography>
        <Typography
          tag="h3"
          variant="h2"
          weight="base"
          className="font-normal mt-4"
        >
          {t("site.where-voter-card-guide")}
        </Typography>
      </div>
      <div className="mt-12 mb-32">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {ActiveCenters.map(center => (
            <div
              key={center.name}
              className="flex flex-col justify-between bg-white p-4 shadow-md rounded"
            >
              <div>
                <Typography tag="p" variant="h4">
                  {center.name}
                </Typography>
                {center.extra ? (
                  <Typography
                    tag="p"
                    variant="p"
                    className="text-xs text-gray-400"
                  >
                    {center.extra}
                  </Typography>
                ) : null}
                <Typography tag="p" variant="p" className="text-sm mt-1">
                  {center.address}
                </Typography>
              </div>
              <Link
                className="self-end w-full text-center mt-3 self-end"
                to={center.location}
                target="_blank"
                variant="primary"
              >
                <img src={Location} className="mr-1 h-5 w-5" />
                Direcciones
                <span className="sr-only">
                  para esta Junta de Inscripción Permanente
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
