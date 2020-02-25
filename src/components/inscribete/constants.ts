import EighteenPlus from "../../assets/icons/eighteen-plus.svg"
import TurnsEighteen from "../../assets/icons/turns-eighteen.svg"
import BornInTerritory from "../../assets/icons/born-in-territory.svg"
import BornInOtherCountries from "../../assets/icons/born-in-other-countries.svg"
import { Voter } from "./types"

export const VoterDocs: Voter[] = [
  {
    id: "eighteen-plus",
    icon: EighteenPlus,
    description: "Naciste en Puerto Rico y tienes más de 18 años:",
    docs: [
      "Identificación con foto expedida por Gobierno Estatal, Municipal o Federal. Puedes usar tu Licencia de Conducir.",
      "Factura de agua o luz del lugar donde vives. En el caso de que la factura no este a tu nombre debe llevar una carta del dueño de la factura que certifique tu residencia en la dirección provista.",
      "Puedes necesitar tu Certificado de Nacimiento y Seguro Social.",
    ],
  },
  {
    id: "turns-eighteen",
    icon: TurnsEighteen,
    description:
      "Naciste en Puerto Rico y cumples los 18 años durante el cuatrenio de las elecciones:",
    docs: [
      "Visita la Junta de Inscripción Permanente de su municipio o precinto electoral para cotejar que aparezcas en la Base de Datos del Registro Demográfico. De no aparecer tendrá que presentar el Certificado de Nacimiento Original.",
      "Identificación con foto expedida por Gobierno Estatal, Municipal o Federal. Puedes usar tu Licencia de Conducir.",
      "Factura de agua o luz del lugar donde vives. En el caso de que la factura no este a tu nombre debe llevar una carta del dueño de la factura que certifique tu residencia en la dirección provista.",
      "Seguro Social.",
    ],
  },
  {
    id: "born-in-territory",
    icon: BornInTerritory,
    description:
      "Naciste en los Estados Unidos, Continentales, Territorios o Posesiones:",
    docs: [
      "Pasaporte de Estados Unidos de América aunque no esté vigente.",
      "Copia Certificada del Acta de Nacimiento.",
      "Identificación con foto expedida por Gobierno Estatal, Municipal o Federal. Puedes usar tu Licencia de Conducir.",
      "Factura de agua o luz del lugar donde vives. En el caso de que la factura no este a tu nombre debe llevar una carta del dueño de la factura que certifique tu residencia en la dirección provista.",
    ],
  },
  {
    id: "born-in-other-countries",
    icon: BornInOtherCountries,
    description: "Naciste en un país extranjero:",
    docs: [
      "Pasaporte de Estados Unidos de América vigente.",
      "Certificado de Naturalización.",
      "Identificación con foto expedida por Gobierno Estatal, Municipal o Federal. Puedes usar tu Licencia de Conducir.",
      "Factura de agua o luz del lugar donde vives. En el caso de que la factura no este a tu nombre debe llevar una carta del dueño de la factura que certifique tu residencia en la dirección provista.",
    ],
  },
]
