import "fetch-ponyfill";

import { Layout, Container } from "../components/index";
import {
  HowToVote,
  MakeYourVoteCount,
} from "../packages/practica/components/index";
import { SidebarProvider } from "../context/sidebar-context";
import { useLocation } from "react-router-dom";
import useScrollIntoView from "../hooks/useScrollIntoView";
import SEO from "../components/seo";

const HazQueTuVotoCuente = () => {
  const location = useLocation();

  useScrollIntoView(location);

  return (
    <SidebarProvider>
      <Layout location={location}>
        <SEO title="Haz que tu voto cuente" />
        <Container
          className="practice-container pt-16 mb-16 text-center lg:pt-5"
          id="haz-que-tu-voto-cuente"
        >
          <MakeYourVoteCount />
        </Container>
        <Container
          className="practice-container pt-16 mb-16 text-center lg:pt-5"
          id="como-votar"
        >
          <HowToVote />
        </Container>
      </Layout>
    </SidebarProvider>
  );
};

export default HazQueTuVotoCuente;
