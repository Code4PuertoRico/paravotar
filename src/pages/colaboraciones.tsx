import React from "react"

import { withTrans } from "../i18n/withTrans"
import { Container, Layout, SEO } from "../components"
import Collabs from "../packages/colaboraciones/components/collabs"
import { SidebarProvider } from "../context/sidebar-context"

type PageProps = {
  location: Location
}

const Inscribete = ({ location }: PageProps) => {
  return (
    <SidebarProvider>
      <Layout location={location}>
        <SEO title="Colaboraciones" />
        <Container className="w-11/12 pt-16 mb-16 text-center lg:w-10/12 lg:mb-32 lg:pt-5">
          <Collabs />
        </Container>
      </Layout>
    </SidebarProvider>
  )
}

export default withTrans(Inscribete)
