import { SectionMetadata } from "../types/practica-mobile"

export const baseUrl = "https://api.paravotar.org"

export enum APIPaths {
  GET_VOTER_DETAILS = "/voterStatus",
}

export const API_URL = "https://api.paravotar.org"
export const PUBLIC_S3_BUCKET = "https://paravotar.s3.amazonaws.com"
export const CDN_URL = "https://cdn.paravotar.org"

export enum BALLOT_SECTION_TITLES {
  GOBERNADOR = "GOBERNADOR",
  COMISIONADO_RESIDENTE = "COMISIONADO RESIDENTE",
  ALCALDE = "ALCALDE",
  LEGISLADORES_MUNICIPALES = "LEGISLADORES MUNICIPALES",
  REPRESENTANTES_POR_DISTRITO = "REPRESENTANTES POR DISTRITO",
  SENADORES_POR_DISTRITO = "SENADORES POR DISTRITO",
  REPRESENTANTES_POR_ACUMULACION = "REPRESENTANTES POR ACUMULACION",
  SENADORES_POR_ACUMULACION = "SENADORES POR ACUMULACION",
}

export const BALLOT_SECTION_TITLES_LIST = Object.values(BALLOT_SECTION_TITLES)

export const SECTION_METADATA: { [key: string]: SectionMetadata } = {
  [BALLOT_SECTION_TITLES.GOBERNADOR]: {
    limit: 1,
  },
  [BALLOT_SECTION_TITLES.COMISIONADO_RESIDENTE]: {
    limit: 1,
  },
  [BALLOT_SECTION_TITLES.ALCALDE]: {
    limit: 1,
  },
  [BALLOT_SECTION_TITLES.LEGISLADORES_MUNICIPALES]: {
    limit: 9,
  },
  [BALLOT_SECTION_TITLES.REPRESENTANTES_POR_ACUMULACION]: {
    limit: 1,
  },
  [BALLOT_SECTION_TITLES.REPRESENTANTES_POR_DISTRITO]: {
    limit: 1,
  },
  [BALLOT_SECTION_TITLES.SENADORES_POR_DISTRITO]: {
    limit: 2,
  },
  [BALLOT_SECTION_TITLES.SENADORES_POR_ACUMULACION]: {
    limit: 1,
  },
}

export const MAX_PRECINT_LENGTH = 3

export const towns = [
  "Adjuntas",
  "Aguada",
  "Aguadilla",
  "Aguas Buenas",
  "Aibonito",
  "Arecibo",
  "Arroyo",
  "Añasco",
  "Barceloneta",
  "Barranquitas",
  "Bayamón",
  "Cabo Rojo",
  "Caguas",
  "Camuy",
  "Canóvanas",
  "Carolina",
  "Cataño",
  "Cayey",
  "Ceiba",
  "Ciales",
  "Cidra",
  "Coamo",
  "Comerío",
  "Corozal",
  "Culebra",
  "Dorado",
  "Fajardo",
  "Florida",
  "Guayama",
  "Guayanilla",
  "Guaynabo",
  "Gurabo",
  "Guánica",
  "Hatillo",
  "Hormigueros",
  "Humacao",
  "Isabela",
  "Jayuya",
  "Juana Díaz",
  "Juncos",
  "Lajas",
  "Lares",
  "Las Marías",
  "Las Piedras",
  "Loiza",
  "Luquillo",
  "Manatí",
  "Maricao",
  "Maunabo",
  "Mayagüez",
  "Moca",
  "Morovis",
  "Naguabo",
  "Naranjito",
  "Orocovis",
  "Patillas",
  "Peñuelas",
  "Ponce",
  "Quebradillas",
  "Rincón",
  "Rio Grande",
  "Sabana Grande",
  "Salinas",
  "San Germán",
  "San Juan",
  "San Lorenzo",
  "San Sebastián",
  "Santa Isabel",
  "Toa Alta",
  "Toa Baja",
  "Trujillo Alto",
  "Utuado",
  "Vega Alta",
  "Vega Baja",
  "Vieques",
  "Villalba",
  "Yabucoa",
  "Yauco",
]
