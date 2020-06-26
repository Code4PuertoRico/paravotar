import React from "react"
import LanguageMenu from "../components/languageMenu"

import Logo from "../assets/images/logo.svg"
import Inscribete from "../assets/icons/inscribete.svg"
import Practica from "../assets/icons/practica.svg"
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
        <div className="px-4">
          <img className="h-24" src={Logo} alt="Para Votar" />
        </div>
        <div className="mt-6">
          <Section
            name={i18next.t("nav.sign-up")}
            icon={Inscribete}
            isActive={pathname === "/"}
          >
            <SubSection
              name={i18next.t("nav.voter-card")}
              route="/#tarjeta-electoral"
            />
            {/* <SubSection
              name={i18next.t("nav.make-appointment")}
              route="/#saca-tu-cita"
            /> */}
            <SubSection
              name={i18next.t("nav.enrollment-centers")}
              route="/#juntas-de-inscripcion-permanentes"
            />
            <SubSection
              name={i18next.t("nav.voter-status")}
              route="/#electoral-status"
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
            isActive={pathname === "/sal-a-votar"}
          >
            <SubSection
              name={i18next.t("nav.vote-type1")}
              route="/sal-a-votar#voto-ausente-y-adelantado"
            />
          </Section>
          <div className="w-auto text-center">
            <LanguageMenu />
          </div>
        </div>
      </aside>
    </nav>
  )
}
