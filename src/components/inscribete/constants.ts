import EighteenPlus from "../../assets/icons/eighteen-plus.svg"
import BornInTerritory from "../../assets/icons/born-in-territory.svg"
import BornInOtherCountries from "../../assets/icons/born-in-other-countries.svg"
import { Voter } from "./types"

export const VoterDocs: Voter[] = [
  {
    id: "eighteen-plus",
    icon: EighteenPlus,
    description: "Puerto Rico",
    shouldKnow: [
      "Nombre completo",
      "Dirección postal",
      "Dirección física",
      "Número de teléfono",
      "Número de Seguro Social",
      "Estatura",
    ],
    recommendedDocsText:
      "Recomendamos que lleves uno o más de los siguientes documentos:",
    recommendedDocs: [
      "Licencia de conducir o identificación con foto expedida por Gobierno Estatal, Municipal o Federal.",
      "Certificado de Nacimiento original. Puede ser necesario en el caso de que la CEE no encuentre tu información en el sistema del Registro Demográfico.",
    ],
    requiredDocsText: "Documentos requeridos:",
    requiredDocs: ["Ninguno"],
    optionalDocs: [
      "Factura con la dirección del lugar en donde vives. Esto puede ser necesario en el caso que la CEE no pueda validar tu dirección en su sistema.",
    ],
    srText: "personas nacidas en Puerto Rico",
  },
  {
    id: "born-in-territory",
    icon: BornInTerritory,
    description: "Estados Unidos, Continentales, Territorios o Posesiones",
    shouldKnow: [
      "Nombre completo",
      "Dirección postal",
      "Dirección física",
      "Número de teléfono",
      "Estatura",
    ],
    recommendedDocs: [
      "Licencia de conducir o identificación con foto expedida por Gobierno Estatal, Municipal o Federal.",
    ],
    requiredDocsText: "Debes llevar uno de los siguientes documentos:",
    requiredDocs: [
      "Pasaporte de Estados Unidos de América vigente",
      "Certificado de Nacimiento original",
    ],
    optionalDocs: [
      "Factura con la dirección del lugar en donde vives. Esto puede ser necesario en el caso que la CEE no pueda validar tu dirección en su sistema.",
    ],
    srText:
      "personas nacidas en Estados Unidos, incluyendo cualquiera de sus territorios continentales o posesiones.",
  },
  {
    id: "born-in-other-countries",
    icon: BornInOtherCountries,
    description: "Un país extranjero y resides en Puerto Rico",
    shouldKnow: [
      "Nombre completo",
      "Dirección postal",
      "Dirección física",
      "Número de teléfono",
      "Estatura",
    ],
    recommendedDocs: [
      "Licencia de conducir o identificación con foto expedida por Gobierno Estatal, Municipal o Federal.",
    ],
    requiredDocsText: "Debes llevar uno de los siguientes documentos:",
    requiredDocs: [
      "Pasaporte de Estados Unidos de América vigente",
      "Certificado de Naturalización",
      "Certificación del Departamento de Estado con acreditación",
    ],
    optionalDocs: [
      "Factura con la dirección del lugar en donde vives. Esto puede ser necesario en el caso que la CEE no pueda validar tu dirección en su sistema.",
    ],
    srText:
      "personas nacidas en un país extranjero y que residen en Puerto Rico.",
  },
]
