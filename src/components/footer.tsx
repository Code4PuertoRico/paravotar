import React from "react"

import Code4PR from "../assets/icons/code-4-pr.svg"
import Heart from "../assets/icons/heart.svg"
import { Container, Link } from "../components/index"

export default function Footer() {
  return (
    <Container
      tag="footer"
      className="text-center p-4 border border-solid border-b-0 border-r-0 border-l-0 border-footer"
    >
      <Link
        to="https://github.com/Code4PuertoRico/papeleta-pr/blob/master/CONTRIBUTING.md"
        target="_blank"
      >
        ¿Cómo puedo contribuir al proyecto?
      </Link>
      <p className="font-bold mt-4">
        Para Votar no esta afiliado al gobierno ni a ningún partido politico.
        Para Votar no guarda ningún tipo de información del usuario.
      </p>
      <p className="mt-2">
        El código de este proyecto es totalmente público y puedes verlo{" "}
        <Link
          to="https://github.com/Code4PuertoRico/papeleta-pr"
          target="_blank"
        >
          aquí
        </Link>
        .
      </p>
      <p className="text-sm mt-10">
        Hecho con{" "}
        <img className="inline-block h-4 w-4" src={Heart} alt="love" /> desde PR
        y la diaspora por{" "}
        <Link to="https://twitter.com/eluciiano" target="_blank">
          Emmanuel Luciano
        </Link>
        ,{" "}
        <Link to="https://twitter.com/jpadilla1293" target="_blank">
          José Padilla
        </Link>{" "}
        &{" "}
        <Link to="https://twitter.com/LayshiCurbelo" target="_blank">
          Layshi Curbelo
        </Link>
        .
      </p>
      <p className="text-sm mt-2">
        Gracias a todas las personas que nos han dado su feedback para mejorar
        esta herramienta.
      </p>
      <p className="text-sm">
        Para sugerencias y comentarios nos puedes contactar por{" "}
        <Link to="https://www.twitter.com/paravotarpr" target="_blank">
          Twitter
        </Link>{" "}
        o puedes abrir un issue en{" "}
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
          alt="Code 4 Puerto Rico"
        />
      </Link>
    </Container>
  )
}
