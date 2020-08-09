import React from "react"
import LanguageMenu from "./language-menu"

import Logo from "../assets/images/logo.svg"
import Inscribete from "../assets/icons/inscribete.svg"
import Practica from "../assets/icons/practica.svg"
import Collaborations from "../assets/icons/collaborations.svg"
import SalAVotar from "../assets/icons/sal-a-votar.svg"
import { Section, SubSection } from "./section"
import i18next from "i18next"

type SidebarProps = {
  pathname: string
}

export default function Sidebar({ pathname }: SidebarProps) {
  return (
    <nav className="hidden lg:grid lg:col-span-1 lg:relative lg:border lg:border-solid lg:border-b-0 lg:border-t-0 lg:border-l-0 lg:border-footer lg:bg-navbar">
      <aside className="sticky h-screen top-0">
        <div className="relative px-4">
          <img className="h-24" src={Logo} alt="Para Votar" />
          <div className="sidebar__translate">
            <LanguageMenu />
          </div>
        </div>
        <div className="mt-6">
          <Section
            name={i18next.t("nav.sign-up")}
            icon={Inscribete}
            isActive={
              pathname.includes("/#tarjeta-electoral") ||
              pathname.includes("/#juntas-de-inscripcion-permanentes") ||
              pathname.includes("/#electoral-status")
            }
          >
            <SubSection
              name={i18next.t("nav.voter-card")}
              route="/#tarjeta-electoral"
              isActive={pathname.includes("/#tarjeta-electoral")}
            />
            {/* <SubSection
              name={i18next.t("nav.make-appointment")}
              route="/#saca-tu-cita"
            /> */}
            <SubSection
              name={i18next.t("nav.enrollment-centers")}
              route="/#juntas-de-inscripcion-permanentes"
              isActive={pathname.includes(
                "/#juntas-de-inscripcion-permanentes"
              )}
            />
            <SubSection
              name={i18next.t("nav.voter-status")}
              route="/#electoral-status"
              isActive={pathname.includes("/#electoral-status")}
            />
          </Section>
          {/* <Section
            name="Practica"
            icon={Practica}
            isActive={pathname === "/practica"}
          /> */}
          <Section
            name={i18next.t("nav.voter-action")}
            icon={SalAVotar}
            isActive={
              pathname.includes("/sal-a-votar#voto-ausente-y-adelantado") ||
              pathname.includes("/sal-a-votar#tu-centro-de-votacion")
            }
          >
            <SubSection
              name={i18next.t("nav.vote-type1")}
              route="/sal-a-votar#voto-ausente-y-adelantado"
              isActive={pathname.includes(
                "/sal-a-votar#voto-ausente-y-adelantado"
              )}
            />
            <SubSection
              name={i18next.t("nav.find-voter-center")}
              route="/sal-a-votar#tu-centro-de-votacion"
              isActive={pathname.includes("/sal-a-votar#tu-centro-de-votacion")}
            />
          </Section>
          <Section
            name={i18next.t("nav.collaborations")}
            icon={Collaborations}
            isActive={
              pathname.includes("/colaboraciones#proyecto-85") ||
              pathname.includes("/colaboraciones#quien-me-representa")
            }
          >
            <SubSection
              name="Proyecto 85"
              route="/colaboraciones#proyecto-85"
              isActive={pathname.includes("/colaboraciones#proyecto-85")}
            />
            <SubSection
              name="¿Quién me representa?"
              route="/colaboraciones#quien-me-representa"
              isActive={pathname.includes(
                "/colaboraciones#quien-me-representa"
              )}
            />
          </Section>
        </div>
      </aside>
    </nav>
  )
}
