import React, { useState, ReactNode } from "react"
import { Link } from "gatsby"

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

export { Section, SubSection }
