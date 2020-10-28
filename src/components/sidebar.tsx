import React, { useMemo } from "react"

import { useTranslation } from "react-i18next"

import Practica from "../assets/icons/practica.svg"
import Logo from "../assets/images/logo.svg"
import Inscribete from "../assets/icons/inscribete.svg"
import Collaborations from "../assets/icons/collaborations.svg"
import SalAVotar from "../assets/icons/sal-a-votar.svg"
import NotiUno from "../assets/images/notiuno.png"
import { useSidebar } from "../context/sidebar-context"
import { Section, SubSection } from "./section"
import LanguageMenu from "./language-menu"
import Arrows from "./arrows"
import Link from "./link"
import Typography from "./typography"

type SidebarProps = {
  pathname: string
}

export const getSections = (pathname = "", t) => [
  {
    name: "Practica",
    icon: Practica,
    isActive:
      pathname.includes("/haz-que-tu-voto-cuente#haz-que-tu-voto-cuente") ||
      pathname.includes("/practica#practica-tu-voto") ||
      pathname.includes("/haz-que-tu-voto-cuente#como-votar"),
    strikeout: false,
    subsections: [
      {
        name: "Haz que tu voto cuente",
        route: "/haz-que-tu-voto-cuente#haz-que-tu-voto-cuente",
        isActive: pathname.includes(
          "/haz-que-tu-voto-cuente#haz-que-tu-voto-cuente"
        ),
      },
      {
        name: "¿Cómo votar?",
        route: "/haz-que-tu-voto-cuente#como-votar",
        isActive: pathname.includes("/haz-que-tu-voto-cuente#como-votar"),
      },
      {
        name: "Practica tu voto",
        route: "/practica#practica-tu-voto",
        isActive: pathname.includes("/practica#practica-tu-voto"),
      },
    ],
  },
  {
    name: t("nav.voter-action"),
    icon: SalAVotar,
    isActive:
      pathname.includes("/sal-a-votar#voto-ausente-y-adelantado") ||
      pathname.includes("/sal-a-votar#tu-centro-de-votacion"),
    strikeout: false,
    subsections: [
      {
        name: t("nav.vote-type1"),
        route: "/sal-a-votar#voto-ausente-y-adelantado",
        isActive: pathname.includes("/sal-a-votar#voto-ausente-y-adelantado"),
      },
      // {
      //   name: t("nav.find-voter-center"),
      //   route: "/sal-a-votar#tu-centro-de-votacion",
      //   isActive: pathname.includes("/sal-a-votar#tu-centro-de-votacion"),
      // },
    ],
  },
  {
    name: t("nav.sign-up"),
    icon: Inscribete,
    isActive:
      pathname.includes("/inscribete#tarjeta-electoral") ||
      pathname.includes("/inscribete#juntas-de-inscripcion-permanentes") ||
      pathname.includes("/inscribete#electoral-status"),
    strikeout: true,
    subsections: [
      {
        name: t("nav.voter-card"),
        route: "/inscribete#tarjeta-electoral",
        isActive: pathname.includes("/inscribete#tarjeta-electoral"),
      },
      {
        name: t("nav.enrollment-centers"),
        route: "/inscribete#juntas-de-inscripcion-permanentes",
        isActive: pathname.includes(
          "/inscribete#juntas-de-inscripcion-permanentes"
        ),
      },
      {
        name: t("nav.enrollment-reminder"),
        route: "/inscribete#enrollment-reminder",
        isActive: pathname.includes("/inscribete#enrollment-reminder"),
      },
      {
        name: t("nav.voter-status"),
        route: "/inscribete#electoral-status",
        isActive: pathname.includes("/inscribete#electoral-status"),
      },
    ],
  },
  {
    name: t("nav.collaborations"),
    icon: Collaborations,
    isActive: [
      "/colaboraciones#proyecto-85",
      "/colaboraciones#tu-voto-no-se-deja",
      "/colaboraciones#quien-me-representa",
    ].includes(pathname),
    strikeout: false,
    subsections: [
      {
        name: "Proyecto 85",
        route: "/colaboraciones#proyecto-85",
        isActive: pathname.includes("/colaboraciones#proyecto-85"),
      },
      {
        name: "¿Quién me representa?",
        route: "/colaboraciones#quien-me-representa",
        isActive: pathname.includes("/colaboraciones#quien-me-representa"),
      },
      {
        name: "Tu Voto No Se Deja",
        route: "/colaboraciones#tu-voto-no-se-deja",
        isActive: pathname.includes("/colaboraciones#tu-voto-no-se-deja"),
      },
      {
        name: "Microjuris",
        route: "/colaboraciones#microjuris",
        isActive: pathname.includes("/colaboraciones#microjuris"),
      },
      {
        name: "Practica tu voto",
        route: "/colaboraciones#practica-tu-voto",
        isActive: pathname.includes("/colaboraciones#practica-tu-voto"),
      },
    ],
  },
]

export default function Sidebar({ pathname }: SidebarProps) {
  const { t } = useTranslation()
  const sections = useMemo(() => getSections(pathname, t), [pathname, t])
  const { setSidebarIsVisible } = useSidebar()

  return (
    <nav className="sidebar">
      <aside className="sticky h-screen top-0">
        <div className="relative px-4">
          <img className="h-24" src={Logo} alt="Para Votar" />
          <div className="sidebar__translate">
            <LanguageMenu />
          </div>
        </div>
        <div className="mt-6">
          {sections.map((section, index) => {
            return (
              <Section
                key={`${section.name}-${index}`}
                name={section.name}
                icon={section.icon}
                isActive={section.isActive}
                strikeout={section.strikeout}
              >
                {section.subsections.map((subsection, index) => {
                  return (
                    <SubSection
                      key={`${section.subsections}-${index}`}
                      name={subsection.name}
                      route={subsection.route}
                      isActive={subsection.isActive}
                    />
                  )
                })}
              </Section>
            )
          })}
          <div className="px-4 mt-6">
            <Typography variant="p" tag="p" className="block">
              En alianza con:
            </Typography>
            <Link to="https://www.notiuno.com/" target="_blank">
              <img className="h-16" src={NotiUno} alt="NotiUno" />
            </Link>
          </div>
        </div>
        <button
          className="flex items-center absolute bottom-0 border border-footer border-b-0 border-r-0 border-l-0 py-3 px-4"
          style={{ width: 275 }}
          onClick={() => setSidebarIsVisible(false)}
        >
          <Arrows className="mr-4" style={{ transform: "rotate(90deg)" }} />
          {t("nav.hide-menu")}
        </button>
      </aside>
    </nav>
  )
}
