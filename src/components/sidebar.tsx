import React, { useState, ReactNode } from "react"
import { Link } from "gatsby"

import Logo from "../assets/images/logo.svg"
import Close from "../assets/icons/close.svg"
import Menu from "../assets/icons/menu.svg"
import Inscribete from "../assets/icons/inscribete.svg"
import Practica from "../assets/icons/practica.svg"
import SalAVotar from "../assets/icons/sal-a-votar.svg"
import Arrows from "./arrows"
import { ResizeObserver } from "@juggle/resize-observer"
import useMeasure from "react-use-measure"
import { useSpring, animated } from "react-spring"

type SectionProps = {
  name: string
  icon: string
  children?: ReactNode
  isActive: boolean
}

function Section(props: SectionProps) {
  const [isOpen, setIsOpen] = useState(props.isActive)

  // Animation
  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver })
  const springProps = useSpring({
    height: isOpen ? bounds.height || "auto" : 0,
    visibility: isOpen ? "visible" : "hidden",
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    backgroundColor: isOpen ? "#E3C094" : "#f5ddc0",
  })

  return (
    <animated.div
      className="overflow-y-hidden p-2"
      style={{ backgroundColor: springProps.backgroundColor }}
    >
      <button
        className="flex items-center justify-between py-1 px-4 w-full hover:bg-secondary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <img className="w-8" src={props.icon} alt="" />
          <div className="text-left ml-2">{props.name}</div>
        </div>
        <Arrows
          className="inline-block ml-1"
          style={{ transform: springProps.transform }}
        />
      </button>
      <animated.div
        style={{
          height: springProps.height,
          visibility: springProps.visibility,
          opacity: springProps.opacity,
        }}
      >
        <ul className="list-disc ml-6" ref={ref}>
          {props.children}
        </ul>
      </animated.div>
    </animated.div>
  )
}

type SubSectionProps = {
  name: string
  route: string
  onClick?: () => void
}

function SubSection(props: SubSectionProps) {
  return (
    <li className="ml-5">
      <Link
        className="pr-4 py-2 block w-full"
        to={props.route}
        onClick={props.onClick ? props.onClick : undefined}
      >
        {props.name}
      </Link>
    </li>
  )
}

type SidebarProps = {
  pathname: string
}

export function Navbar({ pathname }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

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
        className={`fixed top-0 bg-navbar h-screen w-screen z-50 pt-12 transform ease-linear duration-300 ${
          isOpen ? "top-0" : "-top-h-screen"
        }`}
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
