import React, { useState, useCallback } from "react"
import { navigate } from "@reach/router"
import { parse, stringify } from "query-string"

import { Button, Typography } from "../"
import Arrows from "../../assets/icons/arrows.inline.svg"
import { Voter } from "./types"

export function VoterCard({ id, icon, description, docs }: Voter) {
  const search = typeof window === "undefined" ? "" : location.search
  const queryParams = parse(search)
  const params =
    typeof queryParams.voter === "string"
      ? [queryParams.voter]
      : queryParams.voter || []
  const hasValue = params.includes(id)

  const [isOpen, setIsOpen] = useState(hasValue)
  const arrowStyle = isOpen ? "rotate-180" : "rotate-0"
  const btnCopy = isOpen ? "Cerrar ventana" : "Ver documentos necesarios"

  const handleClick = useCallback(() => {
    if (isOpen) {
      // Remove from queryParams
      const filteredStrings = params.filter(val => val !== id)
      const paramsUpdate =
        filteredStrings.length === 0
          ? "/"
          : `?${stringify({
              voter: filteredStrings,
            })}`

      navigate(paramsUpdate)
    } else {
      const paramsUpdate = stringify({
        voter: [...params, id],
      })

      navigate(`?${paramsUpdate}`)
    }

    // Toggle
    setIsOpen(!isOpen)
  }, [id, isOpen, params])

  return (
    <li
      className="flex flex-col flex-shrink-0 w-full rounded shadow-md p-6 bg-white mx-0 my-2 relative lg:flex-1 md:m-2"
      style={{ minHeight: "14rem" }}
    >
      <img className="mr-auto" src={icon} alt="man" />
      <Typography variant="p" className="pt-4">
        {description}
      </Typography>
      {isOpen ? (
        <ul className="pl-2 pb-4">
          {docs.map((doc, index) => (
            <li key={`${id}-${index}`} className="ml-4 pt-2 list-disc text-sm">
              {doc}
            </li>
          ))}
        </ul>
      ) : null}
      <Button
        variant="inverse"
        className="text-xs mt-auto"
        onClick={handleClick}
      >
        {btnCopy}{" "}
        <Arrows
          className={`inline-block ml-1 transform duration-300 ease-linear ${arrowStyle}`}
        />
      </Button>
    </li>
  )
}
