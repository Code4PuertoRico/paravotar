import EighteenPlus from "../../assets/icons/eighteen-plus.svg"
import TurnsEighteen from "../../assets/icons/turns-eighteen.svg"
import BornInTerritory from "../../assets/icons/born-in-territory.svg"
import BornInOtherCountries from "../../assets/icons/born-in-other-countries.svg"
import { Voter } from "./types"

export const VoterDocs: Voter[] = [
  {
    id: "eighteen-plus",
    icon: EighteenPlus,
    description: "Nacido en Puerto Rico y es mayor de dieciocho años:",
    docs: [
      "Identificación con foto expedida por Gobierno Estatal, Municipal o Federal. Puede usar su Licencia de Conducir.",
      "Factura de agua o luz del lugar donde reside. En el caso de que la factura no este a su nombre debe llevar una carta del dueño de la factura que certifique que reside en la dirección provista.",
      "Puede necesitar su Certificado de Nacimiento y Seguro Social.",
    ],
  },
  {
    id: "turns-eighteen",
    icon: TurnsEighteen,
    description:
      "Nacido en Puerto Rico y cumple los dieciocho años durante el cuatrienio:",
    docs: [
      "Visitar la Junta de Inscripción Permanente de su municipio o precinto electoral para cotejar que aparezca en la Base de Datos del Registro Demográfico. De no aparecer tendrá que presentar el Certificado de Nacimiento Original.",
      "Identificación con foto expedida por Gobierno Estatal, Municipal o Federal. Puede usar su Licencia de Conducir.",
      "Factura de agua o luz del lugar donde reside. En el caso de que la factura no este a su nombre debe llevar una carta del dueño de la factura que certifique que reside en la dirección provista.",
      "Seguro Social.",
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
      "Identificación con foto expedida por Gobierno Estatal, Municipal o Federal. Puede usar su Licencia de Conducir.",
      "Factura de agua o luz del lugar donde reside. En el caso de que la factura no este a su nombre debe llevar una carta del dueño de la factura que certifique que reside en la dirección provista.",
    ],
  },
  {
    id: "born-in-other-countries",
    icon: BornInOtherCountries,
    description: "Nacido en países extranjeros:",
    docs: [
      "Pasaporte de Estados Unidos de América vigente.",
      "Certificado de Naturalización.",
      "Identificación con foto expedida por Gobierno Estatal, Municipal o Federal. Puede usar su Licencia de Conducir.",
      "Factura de agua o luz del lugar donde reside. En el caso de que la factura no este a su nombre debe llevar una carta del dueño de la factura que certifique que reside en la dirección provista.",
    ],
  },
]
