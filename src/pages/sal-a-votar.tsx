import React from "react"

import { Container, Layout, SEO } from "../components"
import { SpecialVoters } from "../components/inscribete/SpecialVoters"

export default function SalAVotar() {
  return (
    <Layout>
      <SEO title="Sal a votar" />
      <Container
        id="voto-adelantado-y-ausente"
        className="w-11/12 mb-32 pt-5 lg:w-10/12"
      >
        <SpecialVoters />
      </Container>
    </Layout>
  )
}
