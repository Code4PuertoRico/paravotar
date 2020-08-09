import React from "react"

import i18next from "i18next"

import { Typography, Card, Link } from "../../../components"
import Proyecto85 from "../../../assets/images/proyecto-85.jpg"
import QuienMeRepresenta from "../../../assets/images/quien-me-representa.svg"

export default function Collabs() {
  const COLLABS = [
    {
      id: "proyecto-85",
      logo: Proyecto85,
      name: "Proyecto 85",
      description: i18next.t("collabs.proyecto-85"),
      url: "https://www.proyecto85.org",
    },
    {
      id: "quien-me-representa",
      logo: QuienMeRepresenta,
      name: "¿Quién me representa?",
      description: i18next.t("collabs.quien-me-representa"),
      url: "https://www.quienmerepresentapr.com",
    },
  ]

  return (
    <>
      <Typography tag="h1" variant="h3" className="uppercase tracking-wide">
        {i18next.t("collabs.meet-our-collaborators")}
      </Typography>
      <Typography
        tag="h2"
        variant="h2"
        weight="base"
        className="font-normal mt-4"
      >
        {i18next.t("collabs.visit-the-initiatives")}
      </Typography>
      <div className="grid grid-rows-1 grid-cols-1 gap-4 lg:grid-cols-3 mt-12">
        {COLLABS.map((collab, index) => {
          return (
            <Card key={`${collab.name}-${index}`} id={collab.id}>
              <div className="relative h-24 w-24 rounded-full border-4 border-primary m-auto">
                <img
                  className="absolute h-full w-full object-fill rounded-full"
                  src={collab.logo}
                  alt=""
                />
              </div>
              <Typography tag="h3" variant="h3" className="mt-4">
                {collab.name}
              </Typography>
              <Typography tag="p" variant="p" className="mt-2">
                {collab.description}
              </Typography>
              <Link
                variant="primary"
                to={collab.url}
                className="mt-6"
                target="_blank"
              >
                {i18next.t("collabs.view")}
              </Link>
            </Card>
          )
        })}
      </div>
    </>
  )
}
