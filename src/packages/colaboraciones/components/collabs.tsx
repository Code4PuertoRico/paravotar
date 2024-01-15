import { useTranslation } from "react-i18next"

import { Typography, Card, Link } from "../../../components"
import Microjuris from "../../../assets/images/microjuris.png"
import Proyecto85 from "../../../assets/images/proyecto-85.jpg"
import TuVotoNoSeDeja from "../../../assets/images/tu-voto-no-se-deja.jpg"
import QuienMeRepresenta from "../../../assets/images/quien-me-representa.svg?url"
import PTV from "../../../assets/images/ptv.png"

export default function Collabs() {
  const { t } = useTranslation();

  const COLLABS = [
    {
      id: "proyecto-85",
      logo: Proyecto85,
      name: "Proyecto 85",
      description: t("collabs.proyecto-85"),
      url: "https://www.proyecto85.org",
    },
    {
      id: "quien-me-representa",
      logo: QuienMeRepresenta,
      name: "¿Quién me representa?",
      description: t("collabs.quien-me-representa"),
      url: "https://www.quienmerepresentapr.com",
    },
    {
      id: "tu-voto-no-se-deja",
      logo: TuVotoNoSeDeja,
      name: "Tu Voto No Se Deja",
      description: t("collabs.tu-voto-no-se-deja"),
      url: "https://www.facebook.com/tuvotonosedeja",
    },
    {
      id: "microjuris",
      logo: Microjuris,
      name: "Microjuris",
      description: t("collabs.microjuris"),
      url: "https://aldia.microjuris.com/",
    },
    {
      id: "practica-tu-voto",
      logo: PTV,
      name: "Practica tu voto",
      description: t("collabs.ptv"),
      url:
        "https://www.practicatuvoto.com/practicatuvoto/main.jsp?jsCheck=5868563",
    },
  ]

  return (
    <>
      <Typography tag="h1" variant="h3" className="uppercase tracking-wide">
        {t("collabs.meet-our-collaborators")}
      </Typography>
      <Typography
        tag="h2"
        variant="h2"
        weight="base"
        className="font-normal mt-4"
      >
        {t("collabs.visit-the-initiatives")}
      </Typography>
      <div className="grid grid-rows-1 grid-cols-1 gap-4 lg:grid-cols-3 mt-12">
        {COLLABS.map((collab, index) => {
          return (
            <Card key={`${collab.name}-${index}`} id={collab.id}>
              <div className="relative h-24 w-24 rounded-full border-4 border-primary m-auto flex items-center">
                <img
                  className="absolute object-fill rounded-full"
                  src={collab.logo}
                  alt=""
                />
              </div>
              <Typography tag="h3" variant="h3" className="mt-4">
                {collab.name}
              </Typography>
              <Typography tag="p" variant="p" className="mt-2">
                {collab.description}
              </Typography>
              <Link
                variant="primary"
                to={collab.url}
                className="mt-6"
                target="_blank"
              >
                {t("collabs.view")}
              </Link>
            </Card>
          )
        })}
      </div>
    </>
  )
}
