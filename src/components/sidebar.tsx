import React, { useState, ReactNode } from "react"
import { Link } from "gatsby"

import Logo from "../assets/images/logo.svg"
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
}

function Section(props: SectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Animation
  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver })
  const springProps = useSpring({
    height: isOpen ? bounds.height || "auto" : 0,
    visibility: isOpen ? "visible" : "hidden",
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    backgroundColor: isOpen ? "#d0aa7c" : "#E3C094",
  })

  return (
    <animated.div
      className="overflow-hidden my-1"
      style={{ backgroundColor: springProps.backgroundColor }}
    >
      <button
        className="flex items-center justify-between py-1 px-4 w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <img className="w-10" src={props.icon} alt="" />
          <div className="text-left ml-2">{props.name}</div>
        </div>
        <Arrows
          className="inline-block ml-1"
          style={{ transform: springProps.transform }}
        />
      </button>
      <animated.ul
        style={{
          height: springProps.height,
          visibility: springProps.visibility,
          opacity: springProps.opacity,
        }}
      >
        <div ref={ref}>{props.children}</div>
      </animated.ul>
    </animated.div>
  )
}

type SubSectionProps = {
  name: string
  route: string
}

function SubSection(props: SubSectionProps) {
  return (
    <li>
      <Link className="px-4 py-2 block w-full" to={props.route}>
        {props.name}
      </Link>
    </li>
  )
}

export default function Sidebar() {
  return (
    <nav className="col-span-1 bg-secondary border border-solid border-b-0 border-t-0 border-l-0 border-footer">
      <aside>
        <div className="px-4">
          <img className="h-24" src={Logo} alt="Para Votar" />
        </div>
        <div className="mt-4">
          <Section name="Inscríbete" icon={Inscribete}>
            <SubSection name="Requisitos" route="/#requirements" />
            <SubSection
              name="Juntas de Inscripción Permanentes"
              route="/#JIP"
            />
            <SubSection
              name="Verifica tu status electoral"
              route="/#electoral-status"
            />
          </Section>
          <Section name="Practica" icon={Practica} />
          <Section name="Sal a votar" icon={SalAVotar}>
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
