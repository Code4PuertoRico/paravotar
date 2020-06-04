import React from "react"

import Logo from "../assets/images/logo.svg"
import Inscribete from "../assets/icons/inscribete.svg"
import Practica from "../assets/icons/practica.svg"
import SalAVotar from "../assets/icons/sal-a-votar.svg"
import { Section, SubSection } from "./section"

type SidebarProps = {
  pathname: string
}

export default function Sidebar({ pathname }: SidebarProps) {
  return (
    <nav className="hidden md:grid md:col-span-1 md:relative md:border md:border-solid md:border-b-0 md:border-t-0 md:border-l-0 md:border-footer md:bg-navbar">
      <aside className="sticky h-screen top-0">
        <div className="px-4">
          <img className="h-24" src={Logo} alt="Para Votar" />
        </div>
        <div className="mt-6">
          <Section
            name="Inscríbete"
            icon={Inscribete}
            isActive={pathname === "/"}
          >
            <SubSection name="Tarjeta Electoral" route="/#tarjeta-electoral" />
            <SubSection
              name="Juntas de Inscripción Permanentes"
              route="/#juntas-de-inscripcion-permanentes"
            />
            <SubSection name="Estatus Electoral" route="/#electoral-status" />
          </Section>
          <Section
            name="Practica"
            icon={Practica}
            isActive={pathname === "/practica"}
          />
          <Section
            name="Sal a votar"
            icon={SalAVotar}
            isActive={pathname === "/sal-a-votar"}
          >
            <SubSection
              name="Voto adelantado y voto ausente"
              route="/sal-a-votar#voto-ausente-y-adelantado"
            />
          </Section>
        </div>
      </aside>
    </nav>
  )
}
