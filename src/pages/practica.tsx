import React, { useEffect } from "react"
import "fetch-ponyfill"

import { Layout, SEO, Container } from "../components/index"
import {
  HowToVote,
  MakeYourVoteCount,
  Practice,
} from "../packages/practica/components/index"
import { withTrans } from "../i18n/withTrans"
import { makeServer } from "../mirage/config.js"
import { SidebarProvider } from "../context/sidebar-context"

type PageProps = {
  location: Location
}

const Practica = ({ location }: PageProps) => {
  useEffect(() => {
    makeServer()
  }, [])

  return (
    <SidebarProvider>
      <Layout location={location}>
        <SEO title="Practica tu voto" />
        <Container
          className="w-11/12 pt-16 mb-16 text-center lg:pt-5"
          id="haz-que-tu-voto-cuente"
        >
          <MakeYourVoteCount />
        </Container>
        <Container
          className="w-11/12 pt-16 mb-16 text-center lg:pt-5"
          id="como-votar"
        >
          <HowToVote />
        </Container>

        <Container
          className="w-11/12 pt-16 mb-16 text-center lg:pt-5"
          id="haz-que-tu-voto-cuente"
        >
          <Practice />
        </Container>
      </Layout>
    </SidebarProvider>
  )
}

export default withTrans(Practica)
