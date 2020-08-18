import React from "react"

import { Machine } from "xstate"
import { useMachine } from "@xstate/react"
import { animated, useSpring } from "react-spring"

import { Typography, Tab, Card } from "../../../components"
import VotoIntegro from "../../../assets/images/voto-integro.png"
import VotoMixto from "../../../assets/images/voto-mixto.png"
import VotoXCandidatura from "../../../assets/images/voto-x-candidatura.png"
import Switch from "../../../components/switch"
import Case from "../../../components/case"

const getVoteTypes = () => {
  return [
    {
      name: "Integro",
      description:
        "El voto íntegro será válido cuando se haga una sola marca dentro del rectángulo en blanco bajo la insignia del partido político de preferencia, y no se hagan más marcas en la papeleta.",
      example: VotoIntegro,
    },
    {
      name: "Mixto",
      description:
        "El voto mixto será válido cuando la persona votante coloque una marca válida o equis “X” dentro del rectángulo en blanco que está debajo de la insignia del partido político de preferencia, coloque al menos una equis “X” dentro del rectángulo en blanco que está al lado de un candidato(a) dentro de la columna de esa insignia y coloque también otra equis “X” dentro del rectángulo en blanco al lado de cualquier candidato en la columna de otro partido o candidato independiente.",
      example: VotoMixto,
    },
    {
      name: "Candidatura",
      description:
        "Los votos por candidatura serán válidos cuando se haga una marca válida dentro del rectángulo en blanco al lado del nombre de cada candidato o candidata de su preferencia, o cuando se escriba el nombre completo de otra persona en el encasillado de la columna de nominación directa que corresponda a la candidatura y también debe hacer una marca válida dentro del rectángulo en blanco al lado de cada nombre escrito.",
      example: VotoXCandidatura,
    },
  ]
}

const voteTypesMachine = Machine({
  id: "voteTypesMachine",
  initial: "integro",
  states: {
    integro: {
      on: {
        MIXTO_VOTE_TOGGLED: "mixto",
        CANDIDATURA_VOTE_TOGGLED: "candidatura",
      },
    },
    mixto: {
      on: {
        INTEGRO_VOTE_TOGGLED: "integro",
        CANDIDATURA_VOTE_TOGGLED: "candidatura",
      },
    },
    candidatura: {
      on: {
        INTEGRO_VOTE_TOGGLED: "integro",
        MIXTO_VOTE_TOGGLED: "mixto",
      },
    },
  },
})

function VoteType({
  description,
  example,
}: {
  description: string
  example: string
}) {
  return (
    <>
      <Typography className="mt-8 text-left" tag="p" variant="p">
        {description}
      </Typography>
      <img className="mt-6" src={example} alt="" />
      <Typography className="italic text-xs mt-2" tag="p" variant="p">
        Esto es una papeleta modelo. Actualizaremos este recurso con la papeleta
        original una vez la CEE publique la papeleta.
      </Typography>
    </>
  )
}

export default function HowToVote() {
  const [state, send] = useMachine(voteTypesMachine)
  const voteTypes = getVoteTypes()
  const props = useSpring({ opacity: 1, from: { opacity: 0 } })

  return (
    <>
      <Typography tag="h2" variant="h3" className="uppercase">
        ¿Cómo votar?
      </Typography>
      <Typography
        tag="h3"
        variant="h2"
        weight="base"
        className="font-normal mt-4"
      >
        Conoce los distintos tipos de votos que puedes ejercer el día de las
        elecciones
      </Typography>
      <Card className="mt-8 ml-0">
        <div className="flex justify-center border border-separator border-t-0 border-l-0 border-r-0 overflow-x-scroll">
          {voteTypes.map((vote, index) => {
            return (
              <Tab
                key={`${vote.name}-${index}`}
                isActive={state.matches(vote.name.toLowerCase())}
                onClick={() => send(`${vote.name.toUpperCase()}_VOTE_TOGGLED`)}
              >
                <Typography
                  tag="h4"
                  variant="h4"
                  className="text-center uppercase mt-2 tracking-wide"
                >
                  {vote.name}
                </Typography>
              </Tab>
            )
          })}
        </div>
        <animated.div style={props}>
          <Switch state={state}>
            <Case value="integro">
              <VoteType
                description={voteTypes[0].description}
                example={voteTypes[0].example}
              />
            </Case>
            <Case value="mixto">
              <VoteType
                description={voteTypes[1].description}
                example={voteTypes[1].example}
              />
            </Case>
            <Case value="candidatura">
              <VoteType
                description={voteTypes[2].description}
                example={voteTypes[2].example}
              />
            </Case>
          </Switch>
        </animated.div>
      </Card>
    </>
  )
}
