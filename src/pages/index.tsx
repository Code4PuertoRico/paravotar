import React from "react"

import { Container, Highlight, Layout, SEO, Typography } from "../components"
import { VoterCardList } from "../components/inscribete/VoterCardList"
import { VoterCenters } from "../components/inscribete/VoterCenters"
import { VoterStatus } from "../components/inscribete/VoterStatus"

export default function Inscribete() {
  return (
    <Layout>
      <SEO title="Inscríbete" />
      <Highlight>
        <Container className="w-11/12 text-center pt-32">
          <Typography variant="h3" className="uppercase">
            Inscríbete, conoce cómo obtener tu tarjeta electoral
          </Typography>
          <Typography variant="h2" weight="base" className="font-normal mt-4">
            ¿Qué debo llevar para obtener mi tarjeta electoral?
          </Typography>
        </Container>
      </Highlight>
      <Container className="w-11/12 mt-4 mb-32 lg:-mt-32">
        <VoterCardList />
      </Container>
      <Typography variant="h3" className="uppercase text-center">
        BUSCA DONDE PUEDES SACAR TU TARJETA ELECTORAL
      </Typography>
      <Typography variant="h2" weight="base" className="text-center mt-3">
        Identifica tu pueblo, revisa horarios de información contacto.
      </Typography>
      <Container className="w-11/12 mt-12 mb-32 bg-white shadow-md rounded">
        <VoterCenters />
      </Container>
      <Container className="w-11/12 mb-32">
        <VoterStatus />
      </Container>
    </Layout>
  )
}
