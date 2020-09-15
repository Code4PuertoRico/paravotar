import React from "react"

import { Machine } from "xstate"
import { useMachine } from "@xstate/react"
import { animated, useSpring } from "react-spring"
import i18next from "i18next"

import { Typography, Tab, Card, Link } from "../../../components"
import VotoIntegro from "../../../assets/images/voto-integro.png"
import VotoMixto from "../../../assets/images/voto-mixto.png"
import VotoXCandidatura from "../../../assets/images/voto-x-candidatura.png"
import VotoXNomiacionDirecta from "../../../assets/images/voto-x-nominacion-directa.png"
import Switch from "../../../components/switch"
import Case from "../../../components/case"

const getVoteTypes = () => {
  return [
    {
      id: "integro",
      name: i18next.t("practice.undivided"),
      description: i18next.t("practice.undivided-vote-rules"),
      example: VotoIntegro,
    },
    {
      id: "mixto",
      name: i18next.t("practice.mixed"),
      description: i18next.t("practice.mixed-vote-rules"),
      example: VotoMixto,
    },
    {
      id: "candidatura",
      name: i18next.t("practice.candidacy"),
      description: i18next.t("practice.candidacy-vote-rules"),
      example: VotoXCandidatura,
    },
    {
      id: "nominacion",
      name: i18next.t("practice.write-in"),
      description: i18next.t("practice.write-in-rules"),
      example: VotoXNomiacionDirecta,
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
        NOMINACION_VOTE_TOGGLED: "nominacion",
      },
    },
    mixto: {
      on: {
        INTEGRO_VOTE_TOGGLED: "integro",
        CANDIDATURA_VOTE_TOGGLED: "candidatura",
        NOMINACION_VOTE_TOGGLED: "nominacion",
      },
    },
    candidatura: {
      on: {
        INTEGRO_VOTE_TOGGLED: "integro",
        MIXTO_VOTE_TOGGLED: "mixto",
        NOMINACION_VOTE_TOGGLED: "nominacion",
      },
    },
    nominacion: {
      on: {
        INTEGRO_VOTE_TOGGLED: "integro",
        MIXTO_VOTE_TOGGLED: "mixto",
        CANDIDATURA_VOTE_TOGGLED: "candidatura",
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
      <div className="mt-6 overflow-x-auto relative">
        <img
          className="max-w-xl md:max-w-none md:w-full"
          src={example}
          alt=""
        />
      </div>
      <div className="mx-auto w-full lg:w-2/3">
        <Typography className="italic text-xs mt-2" tag="p" variant="p">
          {i18next.t("practice.ballot-example-disclaimer")}
        </Typography>
      </div>
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
        {i18next.t("practice.how-to-vote")}
      </Typography>
      <Typography
        tag="h3"
        variant="h2"
        weight="base"
        className="font-normal mt-4"
      >
        {i18next.t("practice.type-of-votes")}
      </Typography>
      <Card className="pt-5 mt-8 ml-0">
        <div className="border border-separator border-t-0 border-l-0 border-r-0 inline-flex overflow-x-scroll md:justify-center">
          {voteTypes.map((vote, index) => {
            return (
              <Tab
                key={`${vote.id}-${index}`}
                isActive={state.matches(vote.id.toLowerCase())}
                onClick={() => send(`${vote.id.toUpperCase()}_VOTE_TOGGLED`)}
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
            <Case value="nominacion">
              <VoteType
                description={voteTypes[3].description}
                example={voteTypes[3].example}
              />
            </Case>
          </Switch>
        </animated.div>
      </Card>
      <div className="w-full mx-auto lg:w-2/3">
        <Typography tag="p" variant="p" className="mt-4">
          {i18next.t("practice.the-information-presented")}{" "}
          <Link
            to="https://aldia.microjuris.com/2020/07/24/como-se-vota-un-resumen-de-los-cambios-tras-el-nuevo-codigo-electoral/"
            target="_blank"
          >
            {i18next.t("practice.article")}
          </Link>{" "}
          {i18next.t("practice.published-by")}{" "}
          <Link to="https://aldia.microjuris.com/" target="_blank">
            Microjuris
          </Link>{" "}
          {i18next.t("practice.with-the")}{" "}
          <Link to="https://www.aclu.org/" target="_blank">
            {i18next.t("practice.aclu-long")}
          </Link>{" "}
          ({i18next.t("practice.aclu-short")}).
        </Typography>
      </div>
    </>
  )
}
