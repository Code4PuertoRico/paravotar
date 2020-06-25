import React, { useState, useRef, useEffect } from "react"
import DropdownAria from "react-dropdown-aria"

import { Container, Layout, SEO, Typography, Link } from "../components"
import { VoterCenters } from "../components/inscribete/VoterCenters"
import { VoterStatus } from "../components/inscribete/VoterStatus"
import { VoterDocs } from "../components/inscribete/constants"
import { VoterInfoLeftPanel } from "../components/inscribete/VoterInfo/LeftPanel"
import { VoterInfoRightPanel } from "../components/inscribete/VoterInfo/RightPanel"
import { StickyBanner } from "../components/sticky-banner"
// import MakeAppointment from "../components/inscribete/MakeAppointment"
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
      <Container className="w-11/12 mb-32 lg:w-10/12">
        <VoterCenters />
      </Container>
      {/* <Container className="w-11/12 mb-32 lg:w-10/12">
        <MakeAppointment />
      </Container> */}
      <Container className="w-11/12 mb-32 lg:w-10/12">
        <VoterStatus />
      </Container>
      <StickyBanner>
        <div className="text-center">
          <p className="font-bold mb-2 text-md md:text-lg">
            Saca tu tarjeta electoral, sin cita previa, en la JIP más cercana a
            ti.
          </p>
          {/* <p className="font-semibold text-md md:text-lg">
            Fecha límite para inscribirte: <br className="md:hidden" /> 14 de
            septiembre 2020.
          </p> */}
          {/* <Link
            to="tel:+1787-777-8682,2362"
            className="h-12 text-base md:text-lg flex justify-center items-center"
            variant="danger"
          >
            <Phone className="mr-2 h-5 w-5 tada animated infinite" />
            (787) 777-8682 &nbsp;
            <span className="text-xs pt-1 md:text-base md:pt-0">ext. 2362</span>
          </Link> */}
        </div>
      </StickyBanner>
    </Layout>
  )
}
