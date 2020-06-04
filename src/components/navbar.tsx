import React, { useRef, useState, useEffect } from "react"

import Logo from "../assets/images/logo.svg"
import Inscribete from "../assets/icons/inscribete.svg"
import Practica from "../assets/icons/practica.svg"
import SalAVotar from "../assets/icons/sal-a-votar.svg"
import Close from "../assets/icons/close.svg"
import Menu from "../assets/icons/menu.svg"
import { Section, SubSection } from "./section"

type SidebarProps = {
  pathname: string
}

interface HTMLDivElementWithInert extends HTMLDivElement {
  inert: boolean
}

export default function Navbar({ pathname }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElementWithInert>(null)

  useEffect(() => {
    if (menuRef && menuRef.current) {
      menuRef.current.inert = !isOpen
    }
  }, [isOpen])

  return (
    <>
      <nav className="flex items-center justify-between bg-navbar sticky h-16 px-2 top-0 z-50 shadow-md md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <img className="h-6 w-6" src={Menu} alt="Mobile Menu" />
        </button>
        <img className="h-12 -mt-1" src={Logo} alt="Para Votar" />
        <div className="h-6 w-6"></div>
      </nav>
      <div
        id="testing"
        className={`fixed top-0 bg-navbar h-screen w-screen z-50 pt-12 transform ease-linear duration-300 ${
          isOpen ? "top-0" : "-top-h-screen"
        }`}
        ref={menuRef}
      >
        <button
          className="absolute top-0 right-0 mt-2 mr-2"
          onClick={() => setIsOpen(false)}
        >
          <img className="h-5 w-5" src={Close} alt="Close Menu" />
        </button>
        <div className="px-4">
          <img className="mx-auto h-16" src={Logo} alt="Para Votar" />
        </div>
        <div className="mt-10">
          <Section
            name="Inscríbete"
            icon={Inscribete}
            isActive={pathname === "/"}
          >
            <SubSection
              name="Tarjeta Electoral"
              route="/#tarjeta-electoral"
              onClick={() => setIsOpen(false)}
            />
            <SubSection
              name="Juntas de Inscripción Permanentes"
              route="/#juntas-de-inscripcion-permanentes"
              onClick={() => setIsOpen(false)}
            />
            <SubSection
              name="Estatus Electoral"
              route="/#electoral-status"
              onClick={() => setIsOpen(false)}
            />
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
              onClick={() => setIsOpen(false)}
            />
          </Section>
        </div>
      </div>
    </>
  )
}
