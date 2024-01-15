import { useLocation } from "react-router-dom";
import { Container, Layout } from "../components";
import { SpecialVoters } from "../components/inscribete/SpecialVoters";
import { SidebarProvider } from "../context/sidebar-context";
import useScrollIntoView from "../hooks/useScrollIntoView";
import SEO from "../components/seo";

const SalAVotar = () => {
  const location = useLocation();

  useScrollIntoView(location);

  return (
    <SidebarProvider>
      <Layout location={location}>
        <SEO title="Sal a votar" />
        <Container
          className="w-11/12 pt-16 lg:w-10/12 lg:mb-32 lg:pt-5"
          id="voto-ausente-y-adelantado"
        >
          <SpecialVoters />
        </Container>
        {/* <Container
          className="w-11/12 pt-16 lg:w-10/12 lg:mb-32 lg:pt-5"
          id="tu-centro-de-votacion"
        >
          <FindVoterCenter />
        </Container> */}
      </Layout>
    </SidebarProvider>
  );
};

export default SalAVotar;
