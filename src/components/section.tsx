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
  })

  return (
    <animated.div className="overflow-y-hidden">
      <hr className="mx-4 text-footer mt-2" />
      <button
        className="flex items-center justify-between w-full -px-4 mt-2 px-4 overflow-x-visible"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <img className="w-8" src={props.icon} alt="" />
          <div className="text-left ml-2 font-semibold">{props.name}</div>
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
        <ul ref={ref}>{props.children}</ul>
      </animated.div>
    </animated.div>
  )
}

type SubSectionProps = {
  name: string
  route: string
  isActive: boolean
  onClick?: () => void
}

function SubSection(props: SubSectionProps) {
  return (
    <li
      className={`px-4 hover:bg-primary hover:text-white hover:font-semibold ${
        props.isActive ? "bg-primary text-white font-semibold" : ""
      }`}
    >
      <Link
        className="py-1 block w-full text-sm"
        to={props.route}
        onClick={props.onClick ? props.onClick : undefined}
      >
        {props.name}
      </Link>
    </li>
  )
}

export { Section, SubSection }
