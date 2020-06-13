import React from "react"
import { StateBallot, LegislativeBallot } from "../components/ballots/index"

const state = {
  ballotType: "estatal",
  ballotPath: "/papeletas/2016/gobernador-y-comisionado-residente",
  votes: [
    [
      {
        ocrResult: "PARTIDO POPULAR\r\nDEMOCRÁTICO\r\n",
        logoImg: "partido-logo-1.jpg",
      },
      {
        ocrResult: "PARTIDO NUEVO PROGRESISTA\r\n",
        logoImg: "partido-logo-2.jpg",
      },
      {
        ocrResult: "PARTIDO INDEPENDENTISTA\r\nPUERTORRIQUEÑO\r\n",
        logoImg: "partido-logo-3.jpg",
      },
      {
        ocrResult: "PARTIDO PUEBLO TRABAJADOR\r\n",
        logoImg: "partido-logo-4.jpg",
      },
      {
        ocrResult:
          "CANDIDATOS(AS) INDEPENDIENTES\r\nEn esta columna usted puede votar por un candidato o\r\ncandidata independiente. Para votar por un(a)\r\ncandidato(a) independiente, usted hace una\r\nválida dentro del rectángulo en blanco al\r\nmarca\r\nlado del nornbre del candidato o candidata.\r\nINDEPENDENT CANDIDATES\r\nIn this column you can cast a vote for an independent\r\ncandidate. To cast a vote for an independent candidate,\r\nyou make a valid mark within the White\r\nrectangle to the side of the name of the candidate.\r\n",
      },
      {
        ocrResult:
          "CANDIDATOS(AS) INDEPENDIENTES\r\nEn esta columna usted puede votar por un candidato o\r\ncandidata independiente. Para votar por un(a)\r\ncandidato(a) independiente, usted hace una\r\nválida dentro del rectángulo en blanco al\r\nmarca\r\nlado del nombre del candidato o candidata.\r\nINDEPENDENT CANDIDATES\r\nIn this column you can cast a vote for an independent\r\ncandidate. To cast a vote for an independent candidate,\r\nyou make a valid mark within the White\r\nrectangle to the side of the name of the candidate.\r\n",
      },
      {
        ocrResult:
          "NOMINACIÓN DIRECTA\r\nEn esta ü)lumna usted puede nominar pergynas distintas a las q.le\r\naparecen corno candidatos o candidatas en las columnas\r\nanteriores. Para nominar una persona, usted hace\r\nuna marca dida dentro del rectángulo blanco y\r\nescribe al lado al nombre completo de la que desee\r\nnominar.\r\nWRITE IN CANDIDATES\r\nIn this column you can nominate people different from the ones that\r\nappear as candidates in previous columns. To cast a vote for a\r\nwrite in candidate, you make a valid\r\nmark within the White rectangle to side of the full narne\r\nof the person you wrote in and to vote for.\r\n",
      },
    ],
    [
      {
        ocrResult: "GOBERNADOR\r\nGOVERNOR\r\n",
      },
      {
        ocrResult: "GOBERNADOR\r\nGOVERNOR\r\n",
      },
      {
        ocrResult: "GOBERNADOR\r\nGOVERNOR\r\n",
      },
      {
        ocrResult: "GOBERNADOR\r\nGOVERNOR\r\n",
      },
      {
        ocrResult: "GOBERNADOR\r\nGOVERNOR\r\n",
      },
      {
        ocrResult: "GOBERNADOR\r\nGOVERNOR\r\n",
      },
      {
        ocrResult: "GOBERNADOR\r\nGOVERNOR\r\n",
      },
    ],
    [
      {
        ocrResult: "1.\r\nDavid Bernier\r\n",
        logoImg: "gobernador-logo-1.jpg",
      },
      {
        ocrResult: "1.\r\nRicardo Rosselló\r\nNevares\r\n",
        logoImg: "gobernador-logo-2.jpg",
      },
      {
        ocrResult: "1.\r\nMaria De Lourdes\r\nSantiago\r\n",
        logoImg: "gobernador-logo-3.jpg",
      },
      {
        ocrResult: "1.\r\nRafael Bernabe\r\nRiefkohl\r\n",
        logoImg: "gobernador-logo-4.jpg",
      },
      {
        ocrResult: "1.\r\nManuel Cidre\r\n",
        logoImg: "gobernador-logo-5.jpg",
      },
      {
        ocrResult: "1.\r\nAlexandra Lúgaro\r\n",
        logoImg: "gobernador-logo-6.jpg",
      },
      {
        ocrResult: "",
      },
    ],
    [
      {
        ocrResult: "COMISIONADO RESIDENTE\r\nRESIDENT COMMISSIONER\r\n",
      },
      {
        ocrResult: "COMISIONADO RESIDENTE\r\nRESIDENT COMMISSIONER\r\n",
      },
      {
        ocrResult: "COMISIONADO RESIDENTE\r\nRESIDENT COMMISSIONER\r\n",
      },
      {
        ocrResult: "COMISIONADO RESIDENTE\r\nRESIDENT COMMISSIONER\r\n",
      },
      {
        ocrResult: "COMISIONADO RESIDENTE\r\nRESIDENT COMMISSIONER\r\n",
      },
      {
        ocrResult: "COMISIONADO RESIDENTE\r\nRESIDENT COMMISSIONER\r\n",
      },
      {
        ocrResult: "COMISIONADO RESIDENTE\r\nRESIDENT COMMISSIONER\r\n",
      },
    ],
    [
      {
        ocrResult: "2.\r\nHéctor Ferrer\r\n",
        logoImg: "comisionado-logo-1.jpg",
      },
      {
        ocrResult: "Jenniffer González\r\n",
        logoImg: "comisionado-logo-2.jpg",
      },
      {
        ocrResult: "2.\r\nHugo Rodríguez Díaz\r\n",
        logoImg: "comisionado-logo-3.jpg",
      },
      {
        ocrResult: "2.\r\nMariana Nogales\r\nMolinelli\r\n",
        logoImg: "comisionado-logo-4.jpg",
      },
      {
        ocrResult: "",
        logoImg: "comisionado-logo-5.jpg",
      },
      {
        ocrResult: "",
        logoImg: "comisionado-logo-6.jpg",
      },
      {
        ocrResult: "",
      },
    ],
  ],
}

const legislative = {
  ballotType: "estatal",
  ballotPath: "/papeletas/2016/091-patillas",
  votes: [
    [
      {
        ocrResult: "PARTIDO POPULAR\r\nDEMOCRÁTICO\r\n",
        logoImg: "1-partido-logo-1.jpg",
      },
      {
        ocrResult: "PARTIDO NUEVO PROGRESISTA\r\n",
        logoImg: "1-partido-logo-2.jpg",
      },
      {
        ocrResult: "PARTIDO INDEPENDENTISTA\r\nPUERTORRIQUEÑO\r\n",
        logoImg: "1-partido-logo-3.jpg",
      },
      {
        ocrResult: "PARTIDO PUEBLO TRABAJADOR\r\n",
        logoImg: "1-partido-logo-4.jpg",
      },
      {
        ocrResult:
          "CANDIDATOS(AS) INDEPENDIENTES\r\nEn esta columna usted puede votar por un candidato o\r\ncandidata independiente. Para votar por un(a)\r\ncandidato(a) independiente, usted hace una\r\nválida dentro del rectángulo en blanco al\r\nmarca\r\nlado del nombre del candidato o candidata.\r\nINDEPENDENT CANDIDATES\r\nIn this column you can cast a vote for an independent\r\ncandidate. To cast a vote for an independent candidate,\r\nyou make a valid mark\r\nwithin the White\r\nrectangle to the side of the name of the candidate.\r\n",
      },
      {
        ocrResult:
          "NOMINACIÓN DIRECTA\r\nEn esta columna usted puede nominar personas distintas a las que\r\naparecen como candidatos o candidatas en las columnas\r\nanteriores. Para nominar una persona, usted hace\r\nuna marca válida dentro del rectángulo en blanco y\r\nescribe al lado el nombre completo de la persona que desee\r\nnominar.\r\nWRITE IN CANDIDATES\r\nIn this column you can nominate people different from the ones that\r\nappear as candidates in previous columns. To cast a vote for a\r\nwrite in candidate, you make a valid\r\nmark within the White rectangle to side of the full name\r\nof the person you wrote in and to vote for.\r\n",
      },
    ],
    [
      {
        ocrResult:
          "REPRESENTANTES POR DISTRITO\r\nDISTRICT REPRESENTATIVES\r\n",
      },
      {
        ocrResult:
          "REPRESENTANTES POR DISTRITO\r\nDISTRICT REPRESENTATIVES\r\n",
      },
      {
        ocrResult:
          "REPRESENTANTES POR DISTRITO\r\nDISTRICT REPRESENTATIVES\r\n",
      },
      {
        ocrResult:
          "REPRESENTANTES POR DISTRITO\r\nDISTRICT REPRESENTATIVES\r\n",
      },
      {
        ocrResult:
          "REPRESENTANTES POR DISTRITO\r\nDISTRICT REPRESENTATIVES\r\n",
      },
      {
        ocrResult:
          "REPRESENTANTES POR DISTRITO\r\nDISTRICT REPRESENTATIVES\r\n",
      },
    ],
    [
      {
        ocrResult: "1.\r\nRamón Luis Cruz\r\nBurgos\r\n",
        logoImg: "3-representates-distrito-logo-1.jpg",
      },
      {
        ocrResult: "1.\r\nFelix (Jhonny)\r\nFi ueroa\r\n",
        logoImg: "3-representates-distrito-logo-2.jpg",
      },
      {
        ocrResult: "1.\r\nCatalino Santiago\r\n",
        logoImg: "3-representates-distrito-logo-3.jpg",
      },
      {
        ocrResult: "",
      },
      {
        ocrResult: "",
      },
      {
        ocrResult: "",
      },
    ],
    [
      {
        ocrResult: "SENADORES POR DISTRITO\r\nDISTRICT SENATORS\r\n",
      },
      {
        ocrResult: "SENADORES POR DISTRITO\r\nDISTRICT SENATORS\r\n",
      },
      {
        ocrResult: "SENADORES POR DISTRITO\r\nDISTRICT SENATORS\r\n",
      },
      {
        ocrResult: "SENADORES POR DISTRITO\r\nDISTRICT SENATORS\r\n",
      },
      {
        ocrResult: "SENADORES POR DISTRITO\r\nDISTRICT SENATORS\r\n",
      },
      {
        ocrResult: "SENADORES POR DISTRITO\r\nDISTRICT SENATORS\r\n",
      },
    ],
    [
      {
        ocrResult: "José L. Dalmau\r\n2.\r\nSantiago\r\n",
        logoImg: "5-senadores-1-logo-1.jpg",
      },
      {
        ocrResult: "2.\r\nMiguel Laureano\r\n",
        logoImg: "5-senadores-1-logo-2.jpg",
      },
      {
        ocrResult: "2.\r\nLydia E. Ortiz Flores\r\n",
        logoImg: "5-senadores-1-logo-3.jpg",
      },
      {
        ocrResult: "Javier Córdova\r\n2.\r\nIturregui\r\n",
        logoImg: "5-senadores-1-logo-4.jpg",
      },
      {
        ocrResult: "",
      },
      {
        ocrResult: "",
      },
    ],
    [
      {
        ocrResult: "3.\r\nJorge Suárez Cáceres\r\n",
        logoImg: "6-senadores-2-logo-1.jpg",
      },
      {
        ocrResult: "Luis (Pickie) Díaz\r\n",
        logoImg: "6-senadores-2-logo-2.jpg",
      },
      {
        ocrResult: "Olivero (Oli) Rivera\r\n3.\r\nDávila\r\n",
        logoImg: "6-senadores-2-logo-3.jpg",
      },
      {
        ocrResult: "3.\r\nJosé O. Sotero Esteva\r\n",
        logoImg: "6-senadores-2-logo-4.jpg",
      },
      {
        ocrResult: "",
      },
      {
        ocrResult: "",
      },
    ],
    [
      {
        ocrResult:
          "REPRESENTANTES POR ACUMULACIÓN\r\nAT-LARGE REPRESENTATIVES\r\n",
      },
      {
        ocrResult:
          "REPRESENTANTES POR ACUMULACIÓN\r\nAT-LARGE REPRESENTATIVES\r\n",
      },
      {
        ocrResult:
          "REPRESENTANTES POR ACUMULACIÓN\r\nAT-LARGE REPRESENTATIVES\r\n",
      },
      {
        ocrResult:
          "REPRESENTANTES POR ACUMULACIÓN\r\nAT-LARGE REPRESENTATIVES\r\n",
      },
      {
        ocrResult:
          "REPRESENTANTES POR ACUMULACIÓN\r\nAT-LARGE REPRESENTATIVES\r\n",
      },
      {
        ocrResult:
          "REPRESENTANTES POR ACUMULACIÓN\r\nAT-LARGE REPRESENTATIVES\r\n",
      },
    ],
    [
      {
        ocrResult: "4.\r\nBrenda López De\r\nArrarás\r\n",
        logoImg: "8-representates-acumulacion-1-logo-1.jpg",
      },
      {
        ocrResult: "4.\r\nNestor Alonso (Joven\r\nNo Vidente)\r\n",
        logoImg: "8-representates-acumulacion-1-logo-2.jpg",
      },
      {
        ocrResult: "4.\r\nDenis Márquez Lebrón\r\n",
        logoImg: "8-representates-acumulacion-1-logo-3.jpg",
      },
      {
        ocrResult: "Félix Córdova Iturregui\r\n",
        logoImg: "8-representates-acumulacion-1-logo-4.jpg",
      },
      {
        ocrResult: "",
      },
      {
        ocrResult: "",
      },
    ],
    [
      {
        ocrResult: "5.\r\nJorge Colberg Toro\r\n",
        logoImg: "9-representates-acumulacion-2-logo-1.jpg",
      },
      {
        ocrResult: "5.\r\nJosé Aponte\r\nHernández\r\n",
        logoImg: "9-representates-acumulacion-2-logo-2.jpg",
      },
      {
        ocrResult: "",
      },
      {
        ocrResult: "",
      },
      {
        ocrResult: "",
      },
      {
        ocrResult: "",
      },
    ],
    [
      {
        ocrResult: "6.\r\nManuel Natal Albelo\r\n",
        logoImg: "10-representates-acumulacion-3-logo-1.jpg",
      },
      {
        ocrResult: "6.\r\nJosé Enrique\r\n(Quiquito) Meléndez\r\n",
        logoImg: "10-representates-acumulacion-3-logo-2.jpg",
      },
      {
        ocrResult: "",
      },
      {
        ocrResult: "",
      },
      {
        ocrResult: "",
      },
      {
        ocrResult: "",
      },
    ],
    [
      {
        ocrResult: "Jesús Manuel Ortiz\r\n",
        logoImg: "11-representates-acumulacion-4-logo-1.jpg",
      },
      {
        ocrResult: "7.\r\nJosé (Pichy) Torres\r\nZamora\r\n",
        logoImg: "11-representates-acumulacion-4-logo-2.jpg",
      },
      {
        ocrResult: "",
      },
      {
        ocrResult: "",
      },
      {
        ocrResult: "",
      },
      {
        ocrResult: "",
      },
    ],
    [
      {
        ocrResult: "8.\r\n• Luis Vega Ramos\r\n",
        logoImg: "12-representates-acumulacion-5-logo-1.jpg",
      },
      {
        ocrResult: "8.\r\nMaría Milagros\r\nCharbonier\r\n",
        logoImg: "12-representates-acumulacion-5-logo-2.jpg",
      },
      {
        ocrResult: "",
      },
      {
        ocrResult: "",
      },
      {
        ocrResult: "",
      },
      {
        ocrResult: "",
      },
    ],
    [
      {
        ocrResult: "9.\r\nJaime Perelló\r\n",
        logoImg: "13-representates-acumulacion-6-logo-1.jpg",
      },
      {
        ocrResult: "9.\r\nLourdes Ramos\r\n",
        logoImg: "13-representates-acumulacion-6-logo-2.jpg",
      },
      {
        ocrResult: "",
      },
      {
        ocrResult: "",
      },
      {
        ocrResult: "",
      },
      {
        ocrResult: "",
      },
    ],
  ],
}

export default function GenerateBallot() {
  return (
    <div>
      <StateBallot ballotPath={state.ballotPath} votes={state.votes} />
      <LegislativeBallot
        ballotPath={legislative.ballotPath}
        votes={legislative.votes}
      />
    </div>
  )
}
