import React, { useState } from "react"
import DropdownAria from "react-dropdown-aria"

import Logo from "../assets/images/logo.svg"
import { Container, Highlight, Layout, SEO, Typography } from "../components"
import { VoterCenters } from "../components/inscribete/VoterCenters"
import { VoterStatus } from "../components/inscribete/VoterStatus"
import { VoterDocs } from "../components/inscribete/constants"
import { VoterInfoLeftPanel } from "../components/inscribete/VoterInfo/LeftPanel"
import { VoterInfoRightPanel } from "../components/inscribete/VoterInfo/RightPanel"

const style: { [key: string]: any } = {
  DropdownWrapper: (base: any) => ({
    ...base,
    height: "60px",
  }),
  DropdownButton: (base: any) => ({
    ...base,
    backgroundColor: "white",
    borderColor: "#886944",
    borderWidth: 2,
    "&:hover": {
      borderColor: "#886944",
      borderWidth: 2,
    },

    "&:focus": {
      borderColor: "#886944",
      borderWidth: 2,
      outline: "none",
      boxShadow: "none",
    },
  }),
  OptionContainer: (base: any) => ({
    ...base,
    marginTop: 8,
    backgroundColor: "white",
    borderColor: "#886944",
    borderWidth: 1,
    borderRadius: 6,
    boxShadow: "0px 3px 10px #cacad9",
  }),
  OptionItem: (base: any) => {
    return {
      ...base,
      backgroundColor: "white",
      color: "#292936",
      paddingTop: 8,
      paddingBottom: 8,
      "&:hover": {
        backgroundColor: "#ebebff",
      },
    }
  },
}

const options = VoterDocs.map(v => ({
  value: v.description,
}))

const getVoterMeta = (v: string) =>
  VoterDocs.filter(vd => vd.description === v)[0]

export default function Inscribete() {
  const [selectedOption, setSelectedOption] = useState(options[0].value)

  const voterMetadata = getVoterMeta(selectedOption)

  return (
    <Layout>
      <SEO title="Inscríbete" />
      <Highlight>
        <Container className="w-11/12 text-center pt-5">
          <div className="flex justify-center mb-24">
            <img className="h-32" src={Logo} alt="Para Votar" />
          </div>
          <Typography tag="h1" variant="h3" className="uppercase">
            Inscríbete, conoce cómo obtener tu tarjeta electoral
          </Typography>
          <Typography
            tag="h2"
            variant="h2"
            weight="base"
            className="font-normal mt-4"
          >
            ¿Qué debo llevar para obtener mi tarjeta electoral?
          </Typography>
          <Typography
            tag="h2"
            variant="h2"
            weight="base"
            className="font-normal mt-4"
          >
            Yo soy...
          </Typography>
        </Container>
      </Highlight>
      <Container className="w-10/12 md:w-7/12 lg:w-5/12 mt-4 mb-8 lg:-mt-8">
        <DropdownAria
          placeholder=""
          id="voter-info"
          ariaLabel="Seleccione su situación"
          options={options}
          selectedOption={selectedOption}
          setSelected={o => setSelectedOption(o)}
          style={style}
        />
      </Container>
      <Container className="w-11/12 mt-12 mb-32 bg-white shadow-md rounded">
        <div className="border-t border-separator lg:flex lg:p-10">
          <VoterInfoLeftPanel voterMetadata={voterMetadata} />
          <VoterInfoRightPanel voterMetadata={voterMetadata} />
        </div>
      </Container>
      <Typography tag="h2" variant="h3" className="uppercase text-center">
        BUSCA DONDE PUEDES SACAR TU TARJETA ELECTORAL
      </Typography>
      <Typography
        tag="h3"
        variant="h2"
        weight="base"
        className="text-center mt-3"
      >
        Identifica tu pueblo, revisa horarios de información contacto.
      </Typography>
      <Container className="w-11/12 mt-12 mb-32 bg-white shadow-md rounded">
        <VoterCenters />
      </Container>
      <Container className="w-11/12 mb-32">
        <VoterStatus />
      </Container>
    </Layout>
  )
}
