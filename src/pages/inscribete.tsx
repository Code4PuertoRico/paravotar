import { useState, useRef, useEffect } from "react";

// import DropdownAria from "react-dropdown-aria"
import { useTranslation } from "react-i18next";

import { Container, Layout, Typography } from "../components";
import { EnrollmentReminder } from "../components/inscribete/EnrollmentReminder";
import { VoterCenters } from "../components/inscribete/VoterCenters";
import { VoterStatus } from "../components/inscribete/VoterStatus";
import { VoterDocs } from "../components/inscribete/constants";
import { VoterInfoLeftPanel } from "../components/inscribete/VoterInfo/LeftPanel";
import { VoterInfoRightPanel } from "../components/inscribete/VoterInfo/RightPanel";
import { CountDown } from "../components/inscribete/CountDown/index";
import { SidebarProvider } from "../context/sidebar-context";
import { useLocation } from "react-router-dom";
import useScrollIntoView from "../hooks/useScrollIntoView";
import Dropdown from "../components/button-dropdown";
import SEO from "../components/seo";

const Inscribete = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const options = VoterDocs.map((v) => ({
    value: t(`${v.description}`),
  }));
  const getVoterMeta = (v: string) => {
    if (
      v === "A foreign country and I reside in Puerto Rico" ||
      v === "Un país extranjero y resido en Puerto Rico"
    ) {
      v = "site.born-in-other-countries";
      return VoterDocs.filter((vd) => vd.description === v)[0];
    } else if (
      v === "United States, Continentals, Territories or Possessions" ||
      v === "Estados Unidos, Continentales, Territorios o Posesiones"
    ) {
      v = "site.born-in-territory";
      return VoterDocs.filter((vd) => vd.description === v)[0];
    } else return VoterDocs.filter((vd) => vd.description === v)[0];
  };
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const containerRef = useRef<HTMLDivElement>(null);

  const voterMetadata = getVoterMeta(selectedOption);

  useScrollIntoView(location);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      containerRef.current.focus();
    }
  }, [selectedOption]);

  return (
    <SidebarProvider>
      <Layout location={location}>
        <SEO title="Inscríbete" />
        <Container
          className="w-11/12 pt-16 mb-16 text-center lg:pt-5"
          id="tarjeta-electoral"
        >
          <Typography tag="h1" variant="h3" className="uppercase tracking-wide">
            {t("site.tarjeta-electoral-title")}
          </Typography>
          <CountDown />
        </Container>
        <Container className="w-11/12 text-center">
          <Typography
            tag="h2"
            variant="h2"
            weight="base"
            className="font-normal mt-8"
          >
            {t("site.what-bring-registration-card")}
          </Typography>
          <Typography
            tag="h2"
            variant="h2"
            weight="base"
            className="font-normal mt-4"
          >
            {t("site.born-location")}
          </Typography>
        </Container>
        <Container className="w-11/12 mt-4 mb-8 lg:w-10/12">
          <Dropdown
            options={options}
            selectedOption={selectedOption}
            onSelect={(o) => setSelectedOption(o)}
          />
        </Container>
        <Container
          className="w-11/12  bg-white shadow-md rounded mb-16 lg:mb-32 lg:w-10/12 lg:pt-0 lg:pb-0"
          tabIndex={-1}
          ref={containerRef}
        >
          <div className="border-separator lg:flex lg:p-10">
            <VoterInfoLeftPanel voterMetadata={voterMetadata} />
            <VoterInfoRightPanel voterMetadata={voterMetadata} />
          </div>
        </Container>
        <Container
          className="w-11/12 lg:w-10/12 pt-16 mb-16 lg:mb-32 lg:pt-0 lg:pb-0"
          id="juntas-de-inscripcion-permanentes"
        >
          <VoterCenters />
        </Container>
        {/* <Container className="w-11/12 lg:w-10/12 pt-16 mb-16 lg:mb-32 lg:pt-0 lg:pb-0">
          <MakeAppointment />
        </Container> */}
        <Container className="w-11/12 mb-32 lg:w-10/12" id="recordatorio">
          <EnrollmentReminder />
        </Container>
        <Container
          className="w-11/12 lg:w-10/12 pt-16 mb-16 lg:mb-32 lg:pt-0 lg:pb-0"
          id="electoral-status"
        >
          <VoterStatus />
        </Container>
      </Layout>
    </SidebarProvider>
  );
};

export default Inscribete;
