import get from "lodash/get";
import "fetch-ponyfill";

import { Layout, Container } from "../components/index";
import { Practice } from "../packages/practica/components/index";
import { SidebarProvider } from "../context/sidebar-context";
import { BallotType } from "../ballot-validator/types";
import makeServer from "../mirage";
import { useLocation } from "react-router-dom";
import useScrollIntoView from "../hooks/useScrollIntoView";
import SEO from "../components/seo";

if (import.meta.env.DEV) {
  makeServer({ environment: "development" });
}

const Practica = () => {
  const location = useLocation();
  const params = new URLSearchParams(get(location, "search", ""));
  const precinto = params.get("precint");
  let ballotType = undefined;

  if (Object.keys(BallotType).includes(params.get("ballotType") || "")) {
    ballotType = params.get("ballotType") as BallotType;
  }

  useScrollIntoView(location);

  return (
    <SidebarProvider>
      <Layout location={location}>
        <SEO title="Practica tu voto" />
        <Container
          className="practice-container pt-16 mb-16 text-center lg:pt-5 w-full"
          id="practica-tu-voto"
        >
          <Practice initialPrecint={precinto} initialBallotType={ballotType} />
        </Container>
      </Layout>
    </SidebarProvider>
  );
};

export default Practica;
