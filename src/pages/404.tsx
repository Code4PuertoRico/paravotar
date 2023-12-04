import { useLocation } from "react-router-dom";
import { Container, Layout, Link, Typography } from "../components/index";
import { SidebarProvider } from "../context/sidebar-context";
import SEO from "../components/seo";

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <Layout location={location}>
        <SEO title="404: Not found" />
        <Container className="w-11/12 text-center pt-32">
          <Typography tag="h1" variant="h2">
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
    </SidebarProvider>
  );
}
