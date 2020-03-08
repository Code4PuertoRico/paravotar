import React from "react"

import Code4PR from "../assets/icons/code-4-pr.svg"
import Heart from "../assets/icons/heart.svg"
import Twitter from "../assets/icons/twitter.png"
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
        Una humilde aportación de{" "}
        <Link to="https://twitter.com/eluciiano" target="_blank">
          Emmanuel Luciano
        </Link>
        ,{" "}
        <Link to="https://twitter.com/jpadilla1293" target="_blank">
          José Padilla
        </Link>
        , &{" "}
        <Link to="https://twitter.com/LayshiCurbelo" target="_blank">
          Layshi Curbelo
        </Link>{" "}
        . Para Votar no esta afiliado al gobierno ni a ningún partido politico.
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
      <Link to="https://www.twitter.com/paravotarpr" target="_blank">
        <img
          className="h-12 w-12 mx-auto mt-4 object-contain"
          src={Twitter}
          alt="Twitter"
        />
      </Link>
      <p className="text-sm mt-10">
        Hecho con{" "}
        <img className="inline-block h-4 w-4" src={Heart} alt="love" /> desde PR
        y la diaspora.
      </p>
      <img
        className="h-16 w-16 mx-auto mt-4"
        src={Code4PR}
        alt="Code 4 Puerto Rico"
      />
    </Container>
  )
}
