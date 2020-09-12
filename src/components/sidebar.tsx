import React, { useMemo } from "react"

import { useTranslation } from "react-i18next"

import Practica from "../assets/icons/practica.svg"
import Logo from "../assets/images/logo.svg"
import Inscribete from "../assets/icons/inscribete.svg"
import Collaborations from "../assets/icons/collaborations.svg"
import SalAVotar from "../assets/icons/sal-a-votar.svg"
import { Section, SubSection } from "./section"
import LanguageMenu from "./language-menu"

type SidebarProps = {
  pathname: string
}

export const getSections = (pathname = "", t) => [
  {
    name: t("nav.sign-up"),
    icon: Inscribete,
    isActive:
      pathname.includes("/#tarjeta-electoral") ||
      pathname.includes("/#juntas-de-inscripcion-permanentes") ||
      pathname.includes("/#electoral-status"),
    subsections: [
      {
        name: t("nav.voter-card"),
        route: "/#tarjeta-electoral",
        isActive: pathname.includes("/#tarjeta-electoral"),
      },
      {
        name: t("nav.enrollment-centers"),
        route: "/#juntas-de-inscripcion-permanentes",
        isActive: pathname.includes("/#juntas-de-inscripcion-permanentes"),
      },
      {
        name: t("nav.enrollment-reminder"),
        route: "/#enrollment-reminder",
        isActive: pathname.includes("/#enrollment-reminder"),
      },
      {
        name: t("nav.voter-status"),
        route: "/#electoral-status",
        isActive: pathname.includes("/#electoral-status"),
      },
    ],
  },
  {
    name: "Practica",
    icon: Practica,
    isActive:
      pathname.includes("/practica#haz-que-tu-voto-cuente") ||
      pathname.includes("/practica#como-votar"),
    subsections: [
      {
        name: "Haz que tu voto cuente",
        route: "/practica#haz-que-tu-voto-cuente",
        isActive: pathname.includes("/practica#haz-que-tu-voto-cuente"),
      },
      {
        name: "¿Cómo votar?",
        route: "/practica#como-votar",
        isActive: pathname.includes("/practica#como-votar"),
      },
    ],
  },
  {
    name: t("nav.voter-action"),
    icon: SalAVotar,
    isActive:
      pathname.includes("/sal-a-votar#voto-ausente-y-adelantado") ||
      pathname.includes("/sal-a-votar#tu-centro-de-votacion"),
    subsections: [
      {
        name: t("nav.vote-type1"),
        route: "/sal-a-votar#voto-ausente-y-adelantado",
        isActive: pathname.includes("/sal-a-votar#voto-ausente-y-adelantado"),
      },
      {
        name: t("nav.find-voter-center"),
        route: "/sal-a-votar#tu-centro-de-votacion",
        isActive: pathname.includes("/sal-a-votar#tu-centro-de-votacion"),
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
    ],
  },
]

export default function Sidebar({ pathname }: SidebarProps) {
  const { t } = useTranslation()
  const sections = useMemo(() => getSections(pathname, t), [pathname, t])

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
        </div>
      </aside>
    </nav>
  )
}
