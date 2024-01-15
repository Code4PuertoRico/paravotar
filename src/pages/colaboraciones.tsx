import { useLocation } from "react-router-dom";

import { Container, Layout } from "../components";
import Collabs from "../packages/colaboraciones/components/collabs";
import { SidebarProvider } from "../context/sidebar-context";
import useScrollIntoView from "../hooks/useScrollIntoView";
import SEO from "../components/seo";

const Inscribete = () => {
  const location = useLocation();

  useScrollIntoView(location);

  return (
    <SidebarProvider>
      <Layout location={location}>
        <SEO title="Colaboraciones" />
        <Container className="w-11/12 pt-16 mb-16 text-center lg:w-10/12 lg:mb-32 lg:pt-5">
          <Collabs />
        </Container>
      </Layout>
    </SidebarProvider>
  );
};

export default Inscribete;
