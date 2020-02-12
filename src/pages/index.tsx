import React, { useState } from "react"

import { Button, Highlight, Container, Layout, Typography } from "../components"
import EighteenPlus from "../assets/icons/eighteen-plus.svg"
import TurnsEighteen from "../assets/icons/turns-eighteen.svg"
import BornInTerritory from "../assets/icons/born-in-territory.svg"
import BornInOtherCountries from "../assets/icons/born-in-other-countries.svg"
import Arrows from "../assets/icons/arrows.inline.svg"

type Voter = {
  id: string
  icon: string
  description: string
  docs: string[]
}

const VoterDocs: Voter[] = [
  {
    id: "eighteen-plus",
    icon: EighteenPlus,
    description: "Nacido en Puerto Rico y es mayor de dieciocho años:",
    docs: [
      "Identificación con foto expedida por Gobierno Estatal, Municipal o Federal o sus últimos cuatro dígitos del Seguro Social.",
      "Factura de AEE de la residencia donde vive.",
    ],
  },
  {
    id: "turns-eighteen",
    icon: TurnsEighteen,
    description:
      "Nacido en Puerto Rico y cumple los dieciocho años durante el cuatrienio:",
    docs: [
      "Visitar la JIP de su municipio o precinto electoral para cotejar que aparezca en la Base de Datos de registro Demográfico. De no aparecer tendrá que presentar el Certificado de Nacimiento en Original (el nuevo formato emitido por la Oficina de Registro Demográfico).",
      "Identificación con foto expedida por Gobierno Estatal, Municipal o Federal o sus últimos cuatro dígitos del Seguro Social.",
      "Factura de AEE de la residencia donde vive.",
    ],
  },
  {
    id: "born-in-territory",
    icon: BornInTerritory,
    description:
      "Nacido en los Estados Unidos, Continentales, Territorios o Posesiones:",
    docs: [
      "Pasaporte de Estados Unidos de América aunque no esté vigente.",
      "Copia Certificada del Acta de Nacimiento.",
      "Identificación con foto expedida por Gobierno Estatal, Municipal o Federal o sus últimos cuatro dígitos del Seguro Social.",
      "Factura de AEE de la residencia donde vive.",
    ],
  },
  {
    id: "born-in-other-countries",
    icon: BornInOtherCountries,
    description: "Nacido en países extranjeros:",
    docs: [
      "Pasaporte de Estados Unidos de América vigente.",
      "Certificado de Naturalización (Certificate of Naturalization).",
      "Certification of Birth (Report of Birth)",
      "Certificate of Citizenship.",
    ],
  },
]

function VoterCard({ id, icon, description, docs }: Voter) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowStyle = isOpen ? "rotate-180" : "rotate-0"
  const btnCopy = isOpen ? "Cerrar ventana" : "Ver documentos necesarios"

  return (
    <li
      className="flex-shrink-0 w-full rounded shadow-md p-6 bg-white mx-0 my-2 min-h-full lg:flex-1 md:m-2"
      style={{ minHeight: "14rem" }}
    >
      <img src={icon} alt="man" />
      <Typography variant="p" className="pt-4">
        {description}
      </Typography>
      {isOpen ? (
        <ul className="pl-2">
          {docs.map((doc, index) => (
            <li key={`${id}-${index}`} className="ml-4 pt-2 list-disc text-sm">
              {doc}
            </li>
          ))}
        </ul>
      ) : null}
      <Button
        variant="inverse"
        className="w-full mt-4 flex justify-center items-center"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <span className="text-xs">{btnCopy}</span>{" "}
        <Arrows
          className={`flex-shrink-0 ml-2 transform duration-300 ease-linear ${arrowStyle}`}
        />
      </Button>
    </li>
  )
}

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
      <Container className="w-11/12 mt-4 mb-32 lg:-mt-32">
        <ul className="flex flex-wrap lg:flex-no-wrap justify-around items-start">
          {VoterDocs.map((voter: Voter) => (
            <VoterCard key={voter.id} {...voter} />
          ))}
        </ul>
      </Container>
    </Layout>
  )
}
