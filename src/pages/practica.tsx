import React from "react"
import "fetch-ponyfill"

import { Layout, SEO, Container } from "../components/index"
import { Practice } from "../packages/practica/components/index"
import { withTrans } from "../i18n/withTrans"
import { SidebarProvider } from "../context/sidebar-context"

type PageProps = {
  location: Location
}

const Practica = ({ location }: PageProps) => {
  return (
    <SidebarProvider>
      <Layout location={location}>
        <SEO title="Practica tu voto" />
        <Container
          className="practice-container pt-16 mb-16 text-center lg:pt-5 w-full"
          id="practica-tu-voto"
        >
          <Practice />
        </Container>
      </Layout>
    </SidebarProvider>
  )
}

export default withTrans(Practica)
