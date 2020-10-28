import React, { useRef, useState, useEffect, useMemo } from "react"

import { useTranslation } from "react-i18next"

// import Practica from "../assets/icons/practica.svg"
import Logo from "../assets/images/logo.svg"
import Close from "../assets/icons/close.svg"
import Menu from "../assets/icons/menu.svg"
import NotiUno from "../assets/images/notiuno.png"
import { Section, SubSection } from "./section"
import LanguageMenu from "./language-menu"
import { getSections } from "./sidebar"
import Link from "./link"

type SidebarProps = {
  pathname: string
}

interface HTMLDivElementWithInert extends HTMLDivElement {
  inert: boolean
}

export default function Navbar({ pathname }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElementWithInert>(null)
  const { t } = useTranslation()
  const sections = useMemo(() => getSections(pathname, t), [pathname, t])

  useEffect(() => {
    if (menuRef && menuRef.current) {
      menuRef.current.inert = !isOpen
    }
  }, [isOpen])

  return (
    <>
      <nav className="flex items-center justify-between bg-navbar sticky h-16 px-2 top-0 z-50 shadow-md lg:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <img className="h-6 w-6" src={Menu} alt="Mobile Menu" />
        </button>
        <img className="h-12 -mt-1" src={Logo} alt="Para Votar" />
        <div className="h-6 w-6"></div>
      </nav>
      <div
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
          <div className="text-center mt-2">
            <LanguageMenu />
          </div>
        </div>
        <div className="mt-10">
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
                      onClick={() => setIsOpen(false)}
                      isActive={subsection.isActive}
                    />
                  )
                })}
              </Section>
            )
          })}
        </div>
        <div className="px-4 mt-6">
          <Link to="https://www.notiuno.com/" target="_blank">
            <img className="h-12" src={NotiUno} alt="NotiUno" />
          </Link>
        </div>
      </div>
    </>
  )
}
