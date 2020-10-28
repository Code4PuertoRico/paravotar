import React from "react"
import "fetch-ponyfill"

import { Layout, SEO, Container } from "../components/index"
import {
  HowToVote,
  MakeYourVoteCount,
} from "../packages/practica/components/index"
import { withTrans } from "../i18n/withTrans"
import { SidebarProvider } from "../context/sidebar-context"

type PageProps = {
  location: Location
}

const HazQueTuVotoCuente = ({ location }: PageProps) => {
  return (
    <SidebarProvider>
      <Layout location={location}>
        <SEO title="Haz que tu voto cuente" />
        <Container
          className="practice-container pt-16 mb-16 text-center lg:pt-5"
          id="haz-que-tu-voto-cuente"
        >
          <MakeYourVoteCount />
        </Container>
        <Container
          className="practice-container pt-16 mb-16 text-center lg:pt-5"
          id="como-votar"
        >
          <HowToVote />
        </Container>
      </Layout>
    </SidebarProvider>
  )
}

export default withTrans(HazQueTuVotoCuente)
