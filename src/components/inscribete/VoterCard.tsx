import React, { useState } from "react"
import { useSpring, animated } from "react-spring"
import useMeasure from "react-use-measure"
import { ResizeObserver } from "@juggle/resize-observer"

import { Button, Typography } from "../index"
import Arrows from "../arrows"
import { Voter } from "./types"

export function VoterCard({
  id,
  icon,
  description,
  prerequisites,
  requiredDocsText,
  requiredDocs,
  optionalDocs,
  shouldKnow,
}: Voter) {
  const [isOpen, setIsOpen] = useState(false)
  const btnCopy = isOpen ? "Cerrar ventana" : "Ver documentos necesarios"

  // Animation
  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver })
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
          className="pb-4"
          style={{ opacity: props.opacity }}
          ref={ref}
        >
          {/* Pre-requisites */}
          {prerequisites.length > 0 ? (
            <li>
              <Typography variant="h5">Pré-requisitos:</Typography>
              <ul>
                {prerequisites.map((item, index) => (
                  <li
                    key={`prerequisites-${id}-${index}`}
                    className="ml-4 pt-2 list-disc text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ) : null}

          {/* Should know */}
          <li className={prerequisites.length > 0 ? "pt-4" : ""}>
            <Typography variant="h5">Debes saber:</Typography>
            <ul>
              {shouldKnow.map((item, index) => (
                <li
                  key={`should-know-${id}-${index}`}
                  className="ml-4 pt-2 list-disc text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>

          {/* Required docs */}
          <li className="pt-4">
            <Typography variant="h5">{requiredDocsText}</Typography>
            <ul>
              {requiredDocs.map((item, index) => (
                <li
                  key={`required-docs-${id}-${index}`}
                  className="ml-4 pt-2 list-disc text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>

          {/* Optional docs */}
          <li className="pt-4">
            <Typography variant="h5">
              Optionalmente, puedes llevar los siguientes documentos:
            </Typography>
            <ul>
              {optionalDocs.map((item, index) => (
                <li
                  key={`optional-docs-${id}-${index}`}
                  className="ml-4 pt-2 list-disc text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
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
