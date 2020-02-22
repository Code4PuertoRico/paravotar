import React from "react"
import { Highlight, Container, Layout, SEO, Typography } from "../components"
import { VoterCardList } from "../components/inscribete/VoterCardList"
import { VoterCenters } from "../components/inscribete/VoterCenters"

export default function Inscribete() {
  return (
    <Layout>
      <SEO title="Inscribete" />
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
        <VoterCardList />
      </Container>
      <Typography variant="h3" className="uppercase text-center">
        BUSCA DONDE PUEDES SACAR TU TARJETA ELECTORAL
      </Typography>
      <Typography variant="h2" weight="base" className="text-center mt-3">
        Identifica tu pueblo, revisa horarios e información contacto.
      </Typography>
      <Container className="w-11/12 mt-12 mb-32 bg-white shadow-md rounded">
        <VoterCenters />
      </Container>
    </Layout>
  )
}
