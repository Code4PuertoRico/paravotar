import React from "react"

import Code4PR from "../assets/icons/code-4-pr.svg"

export default function Footer() {
  return (
    <footer className="text-center py-4 border border-solid border-b-0 border-r-0 border-l-0 border-footer">
      <a className="text-primary font-medium" href="">
        ¿Cómo puedo contribuir al proyecto?
      </a>
      <p className="font-bold mt-4">
        NOMBRE DEL PROYECTO no esta afiliado al gobierno ni a ningún partido
        politico. NOMBRE DEL PROYECTO no guarda ningún tipo de información del
        usuario. Todo voto practicado en esta plataforma es completamente
        anónimo y privado
      </p>
      <p className="mt-2">
        El código de este proyecto es totalmente público y puedes verlo{" "}
        <a
          className="text-primary font-medium"
          href="https://github.com/Code4PuertoRico/papeleta-pr"
        >
          aquí
        </a>
        .
      </p>
      <p className="font-light text-sm mt-10">
        Hecho con 🤎 desde PR y la diaspora.
      </p>
      <img className="h-16 w-16 mx-auto mt-4" src={Code4PR} alt="" />
    </footer>
  )
}
