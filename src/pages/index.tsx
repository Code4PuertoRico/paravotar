import React from "react"

import {
  Container,
  Highlight,
  Layout,
  SEO,
  Typography,
  Link,
} from "../components"
import { VoterCardList } from "../components/inscribete/VoterCardList"
import { VoterCenters } from "../components/inscribete/VoterCenters"
import BrowserExample from "../assets/images/browser-example.png"

export default function Inscribete() {
  return (
    <Layout>
      <SEO title="Inscribete" />
      <Highlight>
        <Container className="w-11/12 text-center pt-32">
          <Typography variant="h3" className="uppercase">
            Inscribete, conoce como obtener tu tarjeta electoral
          </Typography>
          <Typography variant="h2" weight="base" className="font-normal mt-4">
            ¿Qué debo llevar para obtener mi tarjeta electoral?
          </Typography>
        </Container>
      </Highlight>
      <Container className="w-11/12 mt-4 mb-32 lg:-mt-32">
        <VoterCardList />
      </Container>
      <Typography variant="h3" className="uppercase text-center">
        BUSCA DONDE PUEDES SACAR TU TARJETA ELECTORAL
      </Typography>
      <Typography variant="h2" weight="base" className="text-center mt-3">
        Identifica tu pueblo, revisa horarios e información contacto.
      </Typography>
      <Container className="w-11/12 mt-12 mb-32 bg-white shadow-md rounded">
        <VoterCenters />
      </Container>
      <Container className="w-11/12 mb-32">
        <div className="text-center">
          <Typography variant="h3" className="uppercase">
            Verifica el estatus de tu registro electoral
          </Typography>
          <Typography variant="h2" weight="base" className="font-normal mt-4">
            Revisa cuál es tu centro de votación junto con su dirección y el
            estatus de tu tarjeta electoral.
          </Typography>
        </div>
        <div className="flex flex-wrap mt-12">
          <div className="w-full lg:w-1/2">
            <img src={BrowserExample} alt="Website Example" />
          </div>
          <div className="w-full lg:mt-3 lg:w-1/2">
            <Typography variant="h3">¿Por que es importante?</Typography>
            <Typography variant="p" className="mt-4">
              Es de suma importancia verificar el estatus de tu tarjeta
              electoral para que pueda ejercer su voto el día de las elecciones.
              Si su tarjeta electoral no esta activa debe visitar la Junta de
              Inscripción Permanente más cercana para activarla.
            </Typography>
            <Typography variant="p" className="mt-4">
              Si se ha mudado recientemente es importante renovar su tarjeta
              electoral para ejercer su voto en la localización actual.
            </Typography>
            <Link
              className="mt-6"
              variant="button"
              to="http://ww2.ceepur.org/es-pr/Paginas/Estatus-del-Elector.aspx"
              target="_blank"
            >
              Verificar mi status
            </Link>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
