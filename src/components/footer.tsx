import { useTranslation } from "react-i18next"

import Code4PR from "../assets/icons/code-4-pr.svg?url"
import Heart from "../assets/icons/heart.svg?url"
import { Container, Link } from "../components/index"

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Container
      tag="footer"
      className="text-center p-4 border border-solid border-b-0 border-r-0 border-l-0 border-footer md:w-10/12"
    >
      <Link
        to="https://github.com/Code4PuertoRico/papeleta-pr/blob/master/CONTRIBUTING.md"
        target="_blank"
      >
        {t("footer.contribute")}
      </Link>
      <p className="font-bold mt-4">
        {t("footer.contribute-note1")}
        <br />
        {t("footer.contribute-note2")}
      </p>
      <p className="mt-2">
        {t("footer.contribute-note3")}
        <Link
          to="https://github.com/Code4PuertoRico/papeleta-pr"
          target="_blank"
        >
          <span className="sr-only">
            {t("footer.contribute-note5")}
          </span>
          {t("footer.contribute-note4")}
        </Link>
        .
      </p>
      <p className="text-sm mt-10">
        {t("site.made-with")}{" "}
        <img className="inline-block h-4 w-4" src={Heart} alt="amor" />{" "}
        {t("site.from-pr")}{" "}
        <Link to="https://twitter.com/eluciiano" target="_blank">
          Emmanuel Luciano Bernal
        </Link>
        ,{" "}
        <Link to="https://twitter.com/jpadilla1293" target="_blank">
          José Padilla Malavé
        </Link>
        ,{" "}
        <Link to="https://twitter.com/LayshiCurbelo" target="_blank">
          Layshi Curbelo Vega
        </Link>{" "}
        &{" "}
        <Link
          to="https://github.com/Code4PuertoRico/paravotar/graphs/contributors"
          target="_blank"
        >
          {t("site.other-contributors")}
        </Link>
        .
      </p>
      <p className="text-sm mt-2">{t("footer.contribute-note6")}</p>
      <p className="text-sm">
        {t("footer.support1")}
        <Link to="https://www.twitter.com/paravotarpr" target="_blank">
          Twitter
        </Link>
        {t("footer.support2")}
        <Link
          to="https://github.com/Code4PuertoRico/papeleta-pr/issues/new"
          target="_blank"
        >
          Github
        </Link>
        .
      </p>
      <Link
        to="https://www.twitter.com/code4puertorico"
        target="_blank"
        className="inline-block"
      >
        <img
          className="h-12 w-12 mx-auto mt-4"
          src={Code4PR}
          alt="Hecho bajo la organización de Code for Puerto Rico"
        />
      </Link>
    </Container>
  )
}
