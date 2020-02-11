import React from "react"

import { Button, Highlight, Container, Layout, Typography } from "../components"
import EighteenPlus from "../assets/icons/eighteen-plus.svg"
import TurnsEighteen from "../assets/icons/turns-eighteen.svg"
import BornInTerritory from "../assets/icons/born-in-territory.svg"
import BornInOtherCountries from "../assets/icons/born-in-other-countries.svg"

const VoterDocs = [
  {
    id: "eighteen-plus",
    icon: EighteenPlus,
    description: "Nacido en Puerto Rico y es mayor de dieciocho años:",
    docs: [],
  },
  {
    id: "turns-eighteen",
    icon: TurnsEighteen,
    description:
      "Nacido en Puerto Rico y cumple los dieciocho años durante el cuatrienio:",
    docs: [],
  },
  {
    id: "born-in-territory",
    icon: BornInTerritory,
    description:
      "Nacidos en los Estados Unidos, Continentales, Territorios o Posesiones:",
    docs: [],
  },
  {
    id: "born-in-other-countries",
    icon: BornInOtherCountries,
    description: "Nacidos en países extranjeros:",
    docs: [],
  },
]

export default function Inscribete() {
  return (
    <Layout>
      <Highlight>
        <Container className="w-11/12 text-center pt-32">
          <Typography variant="h3" className="uppercase">
            Inscribete, conoce como obtener tu tarjeta electoral
          </Typography>
          <Typography variant="h2" weight="base" className="font-normal mt-4">
            ¿Qué debo llevar para obtener mi tarjeta electoral?
          </Typography>
        </Container>
      </Highlight>
      <Container className="w-11/12 -mt-32 mb-32">
        <ul className="flex flex-wrap md:flex-no-wrap">
          {VoterDocs.map(voter => (
            <li
              key={voter.id}
              className="rounded shadow-md p-6 w-full mr-5 bg-white md:w-1/4"
            >
              <img src={voter.icon} alt="man" />
              <Typography variant="p" className="pt-4">
                {voter.description}
              </Typography>
              <Button className="w-full mt-4">Testing</Button>
              <Button variant="inverse" className="w-full mt-3">
                Testing
              </Button>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  )
}
