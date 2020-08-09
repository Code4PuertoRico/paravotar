import React from "react"

import { Container, Layout, SEO } from "../components"
import { SpecialVoters } from "../components/inscribete/SpecialVoters"
import { withTrans } from "../i18n/withTrans"
import { FindVoterCenter } from "../components/inscribete/FindVoterCenter"

type PageProps = {
  location: Location
}

const SalAVotar = ({ location }: PageProps) => {
  return (
    <Layout location={location}>
      <SEO title="Sal a votar" />
      <Container
        className="w-11/12 mb-32 pt-5 lg:w-10/12"
        id="voto-ausente-y-adelantado"
      >
        <SpecialVoters />
      </Container>
      <Container
        className="w-11/12 mb-32 pt-5 lg:w-10/12"
        id="tu-centro-de-votacion"
      >
        <FindVoterCenter />
      </Container>
    </Layout>
  )
}

export default withTrans(SalAVotar)
