import React, { useState, useRef } from "react"
import { useSpring, animated } from "react-spring"
import useMeasure from "react-use-measure"
import { ResizeObserver } from "@juggle/resize-observer"

import { Button, Typography } from "../index"
import Arrows from "../arrows"
import { Voter } from "./types"

export function VoterCard(voter: Voter) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const btnCopy = isOpen ? "Cerrar ventana" : "Ver documentos necesarios"
  const srText = isOpen
    ? `de documentos requeridos para ${voter.srText}`
    : `para ${voter.srText}`

  // Animation
  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver })
  const props = useSpring({
    height: isOpen ? bounds.height || "auto" : 0,
    visibility: isOpen ? "visible" : "hidden",
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
  })

  return (
    <li
      className="flex flex-col flex-shrink-0 w-full rounded shadow-md p-6 bg-white mx-0 my-2 relative lg:flex-1 md:m-2"
      style={{ minHeight: "15rem" }}
    >
      <img className="mr-auto" src={voter.icon} alt="" />
      <Typography tag="p" variant="p" className="pt-4 mb-2">
        {voter.description}
      </Typography>
      <div tabIndex={-1} ref={containerRef}>
        <animated.div
          className="overflow-hidden"
          style={{ height: props.height, visibility: props.visibility }}
        >
          <animated.ul
            className="pb-4"
            style={{ opacity: props.opacity }}
            ref={ref}
          >
            {/* Voting pre-requisite */}
            <li className="pt-2">
              Para votar en las Elecciones Generales en Puerto Rico debes tener
              18 años (o más) en o antes del 3 de noviembre de 2020.
            </li>

            {/* Required docs */}
            {voter.requiredDocs.length >= 1 && voter.requiredDocs ? (
              <li className="pt-4">
                <Typography tag="h3" variant="h5">
                  {voter.requiredDocsText}
                </Typography>
                <ul>
                  {voter.requiredDocs.map((item, index) => (
                    <li
                      key={`required-docs-${voter.id}-${index}`}
                      className="ml-4 pt-2 list-disc text-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ) : null}

            {/* Recommended docs */}
            {voter.recommendedDocs.length >= 1 && voter.recommendedDocs ? (
              <li className="pt-4">
                <Typography tag="h3" variant="h5">
                  {voter.recommendedDocsText || "Recomendamos que lleves:"}
                </Typography>
                <ul>
                  {voter.recommendedDocs.map((item, index) => (
                    <li
                      key={`required-docs-${voter.id}-${index}`}
                      className="ml-4 pt-2 list-disc text-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ) : null}

            {/* Should know */}
            <li className={voter.shouldKnow.length > 0 ? "pt-4" : ""}>
              <Typography tag="h3" variant="h5">
                Debes saber:
              </Typography>
              <ul>
                {voter.shouldKnow.map((item, index) => (
                  <li
                    key={`should-know-${voter.id}-${index}`}
                    className="ml-4 pt-2 list-disc text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>

            {/* Optional docs */}
            <li className="pt-4">
              <Typography tag="h3" variant="h5">
                Documentos opcionales y situaciones que te podrías encontrar:
              </Typography>
              <ul>
                {voter.optionalDocs.map((item, index) => (
                  <li
                    key={`optional-docs-${voter.id}-${index}`}
                    className="ml-4 pt-2 list-disc text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          </animated.ul>
        </animated.div>
      </div>
      <Button
        variant="inverse"
        className="text-xs mt-auto"
        onClick={() => {
          const nextState = !isOpen

          if (nextState && containerRef && containerRef.current) {
            containerRef.current.focus()
          }

          setIsOpen(nextState)
        }}
      >
        {btnCopy} <span className="sr-only">{srText}</span>
        <Arrows
          style={{ transform: props.transform }}
          className="inline-block ml-1"
        />
      </Button>
    </li>
  )
}
