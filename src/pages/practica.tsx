import React from "react"
import "whatwg-fetch"

import { Container, Highlight, Layout, SEO } from "../components/index"
import { Flow } from "../packages/practica/components/Flow"

const IndexPage = () => (
  <Layout>
    <SEO title="Practica tu voto" />
    <Highlight>
      <Container className="text-center">
        <h1 className="text-9xl uppercase font-bold tracking-wide">
          Pratica Tu Voto
        </h1>
      </Container>
    </Highlight>
    <Container>
      <Flow />
    </Container>
  </Layout>
)

export default IndexPage
