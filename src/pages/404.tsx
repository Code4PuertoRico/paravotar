import React from "react"

import { Container, Layout, Link, SEO, Typography } from "../components/index"

export default function NotFoundPage() {
  return (
    <Layout>
      <SEO title="404: Not found" />
      <Container className="w-11/12 text-center pt-32">
        <Typography variant="h2">
          No encontramos la página que esta buscando.
        </Typography>
        <Link className="mt-4" variant="inverse" to="/">
          Ir a página principal
        </Link>
        <img
          className="m-auto my-8"
          src="https://media.giphy.com/media/NTY1kHmcLsCsg/giphy.gif"
          alt="Animación de un muñequito con cara triste"
        />
      </Container>
    </Layout>
  )
}
