import React from "react"
import "fetch-ponyfill"

import { Layout, SEO, Container } from "../components/index"
import { Practice } from "../packages/practica/components/index"
import { withTrans } from "../i18n/withTrans"
import { SidebarProvider } from "../context/sidebar-context"
import { BallotType } from "../ballot-validator/types"

type PageProps = {
  location: Location
}

const Practica = ({ location }: PageProps) => {
  const params = new URLSearchParams(location.search)
  const precinto = params.get("precint")
  let ballotType = undefined

  if (Object.keys(BallotType).includes(params.get("ballotType") || "")) {
    ballotType = params.get("ballotType") as BallotType
  }

  return (
    <SidebarProvider>
      <Layout location={location}>
        <SEO title="Practica tu voto" />
        <Container
          className="practice-container pt-16 mb-16 text-center lg:pt-5 w-full"
          id="practica-tu-voto"
        >
          <Practice initialPrecint={precinto} initialBallotType={ballotType} />
        </Container>
      </Layout>
    </SidebarProvider>
  )
}

export default withTrans(Practica)
