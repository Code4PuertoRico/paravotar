import React from "react"

import { Ballot } from "../papeleta/Form/components/Ballot"
import { StateBallot, LegislativeBallot } from "../papeleta/ballots"
import { Container, Highlight, Layout, SEO } from "../components/index"

const stateBallot = new StateBallot()
const legislativeBallot = new LegislativeBallot()

const IndexPage = () => (
  <Layout>
    <SEO title="Practica tu voto" />
    <Highlight>
      <Container className="text-center">
        <h1 className="text-9xl uppercase font-bold">Pratica Tu Voto</h1>
      </Container>
    </Highlight>
    <Container>
      <h2>State Ballot</h2>
      <hr />
      <Ballot ballotRef={stateBallot.getService()} />
      <h2>Legislative Ballot</h2>
      <hr />
      <Ballot ballotRef={legislativeBallot.getService()} />
    </Container>
  </Layout>
)

export default IndexPage
