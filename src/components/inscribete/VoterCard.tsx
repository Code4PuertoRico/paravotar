import React, { useState } from "react"
import { useSpring, animated } from "react-spring"
import useMeasure from "react-use-measure"

import { Button, Typography } from "../index"
import Arrows from "../arrows"
import { Voter } from "./types"

export function VoterCard({ id, icon, description, docs }: Voter) {
  const [isOpen, setIsOpen] = useState(false)
  const btnCopy = isOpen ? "Cerrar ventana" : "Ver documentos necesarios"

  // Animation
  const [ref, bounds] = useMeasure()
  const props = useSpring({
    height: isOpen ? bounds.height || "auto" : 0,
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
  })

  return (
    <li
      className="flex flex-col flex-shrink-0 w-full rounded shadow-md p-6 bg-white mx-0 my-2 relative lg:flex-1 md:m-2"
      style={{ minHeight: "15rem" }}
    >
      <img className="mr-auto" src={icon} alt="man" />
      <Typography variant="p" className="pt-4 mb-2">
        {description}
      </Typography>
      <animated.div
        className="overflow-hidden"
        style={{ height: props.height }}
      >
        <animated.ul
          className="pl-2 pb-4"
          style={{ opacity: props.opacity }}
          ref={ref}
        >
          {docs.map((doc, index) => (
            <li key={`${id}-${index}`} className="ml-4 pt-2 list-disc text-sm">
              {doc}
            </li>
          ))}
        </animated.ul>
      </animated.div>
      <Button
        variant="inverse"
        className="text-xs mt-auto"
        onClick={() => setIsOpen(!isOpen)}
      >
        {btnCopy}{" "}
        <Arrows
          style={{ transform: props.transform }}
          className="inline-block ml-1"
        />
      </Button>
    </li>
  )
}
