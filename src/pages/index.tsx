import React, { useState, useRef, useEffect } from "react"
import DropdownAria from "react-dropdown-aria"

import { Container, Layout, SEO, Typography, Link } from "../components"
import { VoterCenters } from "../components/inscribete/VoterCenters"
import { VoterStatus } from "../components/inscribete/VoterStatus"
import { VoterDocs } from "../components/inscribete/constants"
import { VoterInfoLeftPanel } from "../components/inscribete/VoterInfo/LeftPanel"
import { VoterInfoRightPanel } from "../components/inscribete/VoterInfo/RightPanel"
import { StickyBanner } from "../components/sticky-banner"
import MakeAppointment from "../components/inscribete/MakeAppointment"
import Phone from "../assets/icons/phone.inline.svg"

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

type PageProps = {
  location: Location
}

export default function Inscribete({ location }: PageProps) {
  const [selectedOption, setSelectedOption] = useState(options[0].value)
  const containerRef = useRef<HTMLDivElement>(null)

  const voterMetadata = getVoterMeta(selectedOption)

  useEffect(() => {
    if (containerRef && containerRef.current) {
      containerRef.current.focus()
    }
  }, [selectedOption])

  return (
    <Layout location={location}>
      <SEO title="Inscríbete" />
      <Container className="w-11/12 text-center pt-5">
        <Typography
          id="tarjeta-electoral"
          tag="h1"
          variant="h3"
          className="uppercase tracking-wide"
        >
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
          Yo nací en...
        </Typography>
      </Container>
      <Container className="w-11/12 mt-4 mb-8 lg:w-10/12">
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
      <Container
        className="w-11/12 mt-12 mb-32 bg-white shadow-md rounded lg:w-10/12"
        tabIndex={-1}
        ref={containerRef}
      >
        <div className="border-separator lg:flex lg:p-10">
          <VoterInfoLeftPanel voterMetadata={voterMetadata} />
          <VoterInfoRightPanel voterMetadata={voterMetadata} />
        </div>
      </Container>
      {/* <Container className="w-11/12 mb-32 lg:w-10/12">
        <Typography
          id="juntas-de-inscripcion-permanentes"
          tag="h2"
          variant="h3"
          className="uppercase text-center tracking-wide"
        >
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
        <div className="mt-12 bg-white shadow-md rounded">
          <VoterCenters />
        </div>
      </Container> */}
      <Container className="w-11/12 mb-32 lg:w-10/12">
        <MakeAppointment />
      </Container>
      <Container className="w-11/12 mb-32 lg:w-10/12">
        <VoterStatus />
      </Container>
      <StickyBanner>
        <div className="flex flex-col md:flex-row justify-center items-center text-center">
          <span className="font-bold mb-4 md:mb-0 md:mr-4 block text-md md:text-lg">
            Saca tu cita para Inscribirte,{" "}
            <span className="block md:inline-block">llama ahora</span>
          </span>
          <Link
            to="tel:+1787-777-8682,2362"
            className="h-12 text-base md:text-lg flex justify-center items-center"
            variant="danger"
          >
            <Phone className="mr-2 h-5 w-5 tada animated infinite" />
            (787) 777-8682 &nbsp;
            <span className="text-xs pt-1 md:text-base md:pt-0">ext. 2362</span>
          </Link>
        </div>
      </StickyBanner>
    </Layout>
  )
}
