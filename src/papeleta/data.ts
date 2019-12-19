import { SectionData } from "./Section/types";
import { Party } from "./Party/types";

export const stateParties: Party[] = [
  { id: "PPD", description: "Partido Popular Democratico" },
  { id: "PNP", description: "Partido Nuevo Progresista" },
  { id: "PIP", description: "Partido Independentista Puertorriqueño" },
  { id: "PPT", description: "Partido Pueblo Trabajador" },
  { id: "CIDP-1", description: "Candidato Independiente" },
  { id: "CIDP-2", description: "Candidato Independiente" }
];

export const stateSections: SectionData[] = [
  {
    id: "123",
    name: "Gobernador",
    limit: 1,
    maxColumns: 6,
    rows: [
      [
        { id: "1", name: "David Bernier", party: "PPD" },
        { id: "2", name: "Ricardo Rosello", party: "PNP" },
        { id: "3", name: "Maria Lourdes", party: "PIP" },
        { id: "4", name: "Rafael Bernabe", party: "PPT" },
        { id: "5", name: "Manuel Cidre", party: "CIDP-1" },
        { id: "6", name: "Alexandra Lugaro", party: "CIDP-2" }
      ]
    ]
  },
  {
    id: "124",
    name: "Comisionado Residente",
    limit: 1,
    maxColumns: 6,
    rows: [
      [
        { id: "7", name: "Hector Ferrer", party: "PPD" },
        { id: "8", name: "Jennifer Gonzalez", party: "PNP" },
        { id: "9", name: "Hugo Rodriguez", party: "PIP" },
        { id: "10", name: "Maria Nogales", party: "PPT" }
      ]
    ]
  }
];

export const legislativeParties = [
  { id: "PPD", description: "Partido Popular Democratico" },
  { id: "PNP", description: "Partido Nuevo Progresista" },
  { id: "PIP", description: "Partido Independentista Puertorriqueño" },
  { id: "PPT", description: "Partido Pueblo Trabajador" },
  { id: "CIDP-1", description: "Candidato Independiente" }
];

export const legislativeSections = [
  {
    id: "125",
    name: "REPRESENTANTES POR DISTRITO",
    limit: 1,
    maxColumns: 5,
    rows: [
      [
        { id: "1", name: "Maria Hernandez", party: "PPD" },
        { id: "2", name: "Victor Pares", party: "PNP" },
        { id: "3", name: "Luis Piñero", party: "PIP" },
        { id: "4", name: "Melissa Repollet", party: "PPT" },
        { id: "5", name: "Maria Lourdes", party: "CIDP-1" }
      ]
    ]
  },
  {
    id: "126",
    name: "SENADORES POR DISTRITO",
    limit: 2,
    maxColumns: 5,
    rows: [
      [
        { id: "6", name: "Ramon Luis Nieves", party: "PPD" },
        { id: "7", name: "Miguel Romero", party: "PNP" },
        { id: "8", name: "Edda Lopez", party: "PIP" },
        { id: "9", name: "Maritza Stanchich", party: "PPT" }
      ],
      [
        { id: "10", name: "Ada Alvarez", party: "PPD" },
        { id: "11", name: "Henry Neumann", party: "PNP" },
        { id: "12", name: "Angel Alicea", party: "PIP" },
        { id: "13", name: "Maria Rosado", party: "PPT" }
      ]
    ]
  },
  {
    id: "127",
    name: "REPRESENTANTES POR ACUMULACIÓN",
    limit: 1,
    maxColumns: 5,
    rows: [
      [
        { id: "14", name: "Luis Vega", party: "PPD" },
        { id: "15", name: "Nestor Alonso", party: "PNP" },
        { id: "16", name: "Denis Marquez", party: "PIP" },
        { id: "17", name: "Felix Cordova", party: "PPT" }
      ],
      [
        { id: "18", name: "Jaime Perello", party: "PPD" },
        { id: "19", name: "Jose Hernandez", party: "PNP" }
      ]
    ]
  },
  {
    id: "128",
    name: "SENADORES POR ACUMULACIÓN",
    limit: 1,
    maxColumns: 5,
    rows: [
      [
        { id: "20", name: "Jose Nadal", party: "PPD" },
        { id: "21", name: "Thomas Rivera", party: "PNP" },
        { id: "22", name: "Juan Dalmau", party: "PIP" },
        { id: "23", name: "Amarilis Pagan", party: "PPT" },
        { id: "24", name: "Jose Vargas", party: "CIDP-1" }
      ],
      [
        { id: "25", name: "Miguel Pereira", party: "PPD" },
        { id: "26", name: "Lawrence Rodriguez", party: "PNP" }
      ]
    ]
  }
];
