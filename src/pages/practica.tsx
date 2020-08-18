import React from "react"
import "fetch-ponyfill"

import { Layout, SEO, Container } from "../components/index"
import { MakeYourVoteCount } from "../packages/practica/components/index"
import { withTrans } from "../i18n/withTrans"

type PageProps = {
  location: Location
}

const Practica = ({ location }: PageProps) => (
  <Layout location={location}>
    <SEO title="Practica tu voto" />
    <Container
      className="w-11/12 pt-16 mb-16 text-center lg:pt-5"
      id="haz-que-tu-voto-cuente"
    >
      <MakeYourVoteCount />
    </Container>
  </Layout>
)

export default withTrans(Practica)
