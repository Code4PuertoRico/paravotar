import React from "react"

import { Container, Layout, SEO } from "../components"
import { SpecialVoters } from "../components/inscribete/SpecialVoters"

type PageProps = {
  location: Location
}

export default function SalAVotar({ location }: PageProps) {
  return (
    <Layout location={location}>
      <SEO title="Sal a votar" />
      <Container className="w-11/12 mb-32 pt-5 lg:w-10/12">
        <SpecialVoters />
      </Container>
    </Layout>
  )
}
