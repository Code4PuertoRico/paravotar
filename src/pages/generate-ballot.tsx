import React from "react"
import { StateBallot } from "../components/ballots"
import { PUBLIC_S3_BUCKET } from "../packages/practica/services/constants"

const data = {
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

export default function GenerateBallot() {
  return (
    <div>
      <StateBallot ballotPath={data.ballotPath} votes={data.votes} />
    </div>
  )
}
