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
    prerequisites: [],
    shouldKnow: [
      "Nombre completo",
      "Dirección postal",
      "Número de teléfono",
      "Número de Seguro Social",
      "Estatura",
    ],
    requiredDocsText: "Recomendamos que lleves los siguientes documentos:",
    requiredDocs: [
      "Identificación con foto con foto expedida por Gobierno Estatal, Municipal o Federal. Puedes llevar tu licencia de conducir.",
      "Si no tienes una identificación con foto expedida por Gobierno, lleva una factura con la dirección del lugar en donde vives y asegurate de saber tu Seguro Social.",
    ],
    optionalDocs: [
      "Certificado de Nacimiento. Esto puede ser necesario en el caso de que la CEE no encuentre tu información en el Registro Demográfico.",
      "Factura con la dirección del lugar en donde vives. Esto el caso que la CEE no pueda validar tu dirección en su sistema.",
    ],
  },
  {
    id: "turns-eighteen",
    icon: TurnsEighteen,
    description:
      "Naciste en Puerto Rico y cumples los 18 años durante el cuatrenio de las elecciones:",
    prerequisites: [],
    shouldKnow: [
      "Nombre completo",
      "Dirección postal",
      "Número de teléfono",
      "Número de Seguro Social",
      "Estatura",
    ],
    requiredDocsText: "Recomendamos que lleves los siguientes documentos:",
    requiredDocs: [
      "Identificación con foto con foto expedida por Gobierno Estatal, Municipal o Federal. Puedes llevar tu licencia de conducir.",
      "Si no tienes una identificación con foto expedida por Gobierno, lleva una factura con la dirección del lugar en donde vives y asegurate de saber tu Seguro Social.",
    ],
    optionalDocs: [
      "Certificado de Nacimiento. Esto puede ser necesario en el caso de que la CEE no encuentre tu información en el Registro Demográfico.",
      "Factura con la dirección del lugar en donde vives. Esto el caso que la CEE no pueda validar tu dirección en su sistema.",
    ],
  },
  {
    id: "born-in-territory",
    icon: BornInTerritory,
    description:
      "Naciste en los Estados Unidos, Continentales, Territorios o Posesiones:",
    prerequisites: [],
    shouldKnow: [
      "Nombre completo",
      "Dirección postal",
      "Número de teléfono",
      "Estatura",
    ],
    requiredDocsText: "Debes llevar uno de los siguientes documentos:",
    requiredDocs: [
      "Pasaporte de Estados Unidos de América (aunque no esté vigente).",
      "Certificada del Acta de Nacimiento.",
    ],
    optionalDocs: [
      "Identificación con foto con foto expedida por Gobierno Estatal, Municipal o Federal. Esto puede ser necesario en el caso que la CEE tenga que validar tu identidad. Puedes llevar tu licencia de conducir.",
      "Factura con la dirección del lugar en donde vives. Esto el caso que la CEE no pueda validar tu dirección en su sistema.",
    ],
  },
  {
    id: "born-in-other-countries",
    icon: BornInOtherCountries,
    description: "Naciste en un país extranjero:",
    prerequisites: [],
    shouldKnow: [
      "Nombre completo",
      "Dirección postal",
      "Número de teléfono",
      "Estatura",
    ],
    requiredDocsText: "Debes llevar uno de los siguientes documentos:",
    requiredDocs: [
      "Pasaporte de Estados Unidos de América vigente.",
      "Certificado de Naturalización.",
    ],
    optionalDocs: [
      "Identificación con foto con foto expedida por Gobierno Estatal, Municipal o Federal. Esto puede ser necesario en el caso que la CEE tenga que validar tu identidad. Puedes llevar tu licencia de conducir.",
      "Factura con la dirección del lugar en donde vives. Esto el caso que la CEE no pueda validar tu dirección en su sistema.",
    ],
  },
]
