import { Machine } from "xstate"
import { useMachine } from "@xstate/react"
import { animated, useSpring } from "react-spring"
import { useTranslation } from "react-i18next"
import { TFunction } from "i18next"

import { Typography, Tab, Card, Link } from "../../../components"
import VotoIntegro from "../../../assets/images/voto-integro.png"
import VotoMixto from "../../../assets/images/voto-mixto.png"
import VotoXCandidatura from "../../../assets/images/voto-x-candidatura.png"
import VotoXNomiacionDirecta from "../../../assets/images/voto-x-nominacion-directa.png"
import LegislativaVotoIntegro from "../../../assets/images/legislativa-voto-integro.png"
import LegislativaVotoMixto from "../../../assets/images/legislativa-voto-mixto.png"
import LegislativaVotoXCandidatura from "../../../assets/images/legislativa-voto-x-candidatura.png"
import LegislativaVotoXNominacionDirecta from "../../../assets/images/legislativa-voto-x-nominacion-directa.png"
import MunicipalVotoIntegro from "../../../assets/images/municipal-voto-integro.png"
import MunicipalVotoMixto from "../../../assets/images/municipal-voto-mixto.png"
import MunicipalVotoXCandidatura from "../../../assets/images/municipal-voto-x-candidatura.png"
import MunicipalVotoXNominacionDirecta from "../../../assets/images/municipal-voto-x-nominacion-directa.png"
import Switch from "../../../components/switch"
import Case from "../../../components/case"

const getBallotTypes = (t: TFunction<"translation", undefined>) => {
  return [
    {
      id: "estatal",
      name: t("practice.governmental"),
      description: t("practice.governmental-description"),
      votes: [
        {
          id: "integro",
          name: t("practice.undivided"),
          description: t("practice.undivided-vote-rules"),
          example: VotoIntegro,
        },
        {
          id: "mixto",
          name: t("practice.mixed"),
          description: t("practice.mixed-vote-rules"),
          example: VotoMixto,
        },
        {
          id: "candidatura",
          name: t("practice.candidacy"),
          description: t("practice.candidacy-vote-rules"),
          example: VotoXCandidatura,
        },
        {
          id: "nominacion",
          name: t("practice.write-in"),
          description: t("practice.write-in-rules"),
          example: VotoXNomiacionDirecta,
        },
      ],
    },
    {
      id: "legislativa",
      name: t("practice.legislative"),
      description: t("practice.legislative-description"),
      votes: [
        {
          id: "integro",
          name: t("practice.undivided"),
          description: t("practice.undivided-vote-rules"),
          example: LegislativaVotoIntegro,
        },
        {
          id: "mixto",
          name: t("practice.mixed"),
          description: t("practice.mixed-vote-rules"),
          example: LegislativaVotoMixto,
        },
        {
          id: "candidatura",
          name: t("practice.candidacy"),
          description: t("practice.candidacy-vote-rules"),
          example: LegislativaVotoXCandidatura,
        },
        {
          id: "nominacion",
          name: t("practice.write-in"),
          description: t("practice.write-in-rules"),
          example: LegislativaVotoXNominacionDirecta,
        },
      ],
    },
    {
      id: "municipal",
      name: t("practice.municipal"),
      description: t("practice.municipal-description"),
      votes: [
        {
          id: "integro",
          name: t("practice.undivided"),
          description: t("practice.undivided-vote-rules"),
          example: MunicipalVotoIntegro,
        },
        {
          id: "mixto",
          name: t("practice.mixed"),
          description: t("practice.mixed-vote-rules"),
          example: MunicipalVotoMixto,
        },
        {
          id: "candidatura",
          name: t("practice.candidacy"),
          description: t("practice.candidacy-vote-rules"),
          example: MunicipalVotoXCandidatura,
        },
        {
          id: "nominacion",
          name: t("practice.write-in"),
          description: t("practice.write-in-rules"),
          example: MunicipalVotoXNominacionDirecta,
        },
      ],
    },
  ]
}

const ballotTypeMachine = Machine({
  id: "ballotTypeMachine",
  initial: "estatal",
  states: {
    estatal: {
      on: {
        LEGISLATIVA_VOTE_TOGGLED: "legislativa",
        MUNICIPAL_VOTE_TOGGLED: "municipal",
      },
    },
    legislativa: {
      on: {
        ESTATAL_VOTE_TOGGLED: "estatal",
        MUNICIPAL_VOTE_TOGGLED: "municipal",
      },
    },
    municipal: {
      on: {
        ESTATAL_VOTE_TOGGLED: "estatal",
        LEGISLATIVA_VOTE_TOGGLED: "legislativa",
      },
    },
  },
})

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

type Vote = {
  id: string
  name: string
  description: string
  example: string
}

function VoteType({
  description,
  example,
}: {
  description: string
  example: string
}) {
  const { t } = useTranslation();

  return (
    <>
      <Typography className="mt-4 text-left" tag="p" variant="p">
        {description}
      </Typography>
      <div className="mt-6 overflow-x-auto relative -mx-6">
        <img
          className="max-w-xl md:max-w-none md:w-full"
          src={example}
          alt=""
        />
      </div>
      <div className="mx-auto w-full lg:w-2/3">
        <Typography className="italic text-xs mt-2" tag="p" variant="p">
          {t("practice.ballot-example-disclaimer")}
        </Typography>
      </div>
    </>
  )
}

function VoteTypes({ votes }: { votes: Vote[] }) {
  const [state, send] = useMachine(voteTypesMachine)
  const props = useSpring({ opacity: 1, from: { opacity: 0 } })

  return (
    <div className="mt-8">
      <div className="flex overflow-y-scroll md:grid md:grid-cols-4 md:gap-4">
        {votes.map((vote, index) => {
          return (
            <button
              key={`${vote.id}-${index}`}
              className={`px-4 py-2 rounded text-center font-semibold tracking-wide mr-4 md:mr-0 hover:bg-primary hover:text-white ${
                state.matches(vote.id.toLowerCase())
                  ? "bg-primary text-white"
                  : "border border-primary text-primary bg-white"
              }`}
              onClick={() => send(`${vote.id.toUpperCase()}_VOTE_TOGGLED`)}
            >
              {vote.name}
            </button>
          )
        })}
      </div>
      <animated.div style={props}>
        <Switch state={state}>
          <Case value="integro">
            <VoteType
              description={votes[0].description}
              example={votes[0].example}
            />
          </Case>
          <Case value="mixto">
            <VoteType
              description={votes[1].description}
              example={votes[1].example}
            />
          </Case>
          <Case value="candidatura">
            <VoteType
              description={votes[2].description}
              example={votes[2].example}
            />
          </Case>
          <Case value="nominacion">
            <VoteType
              description={votes[3].description}
              example={votes[3].example}
            />
          </Case>
        </Switch>
      </animated.div>
    </div>
  )
}

export default function HowToVote() {
  const [state, send] = useMachine(ballotTypeMachine)
  const { t } = useTranslation();
  const ballotTypes = getBallotTypes(t)
  const props = useSpring({ opacity: 1, from: { opacity: 0 } })

  return (
    <>
      <Typography tag="h2" variant="h3" className="uppercase">
        {t("practice.how-to-vote")}
      </Typography>
      <Typography
        tag="h3"
        variant="h2"
        weight="base"
        className="font-normal mt-4"
      >
        {t("practice.type-of-votes")}
      </Typography>
      <Card className="pt-5 mt-8 ml-0">
        <div className="border border-separator border-t-0 border-l-0 border-r-0 inline-flex overflow-x-scroll md:justify-center">
          {ballotTypes.map((vote, index) => {
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
            <Case value="estatal">
              <div>
                <Typography className="mt-8 text-left" tag="p" variant="p">
                  {ballotTypes[0].description}
                </Typography>
                <VoteTypes votes={ballotTypes[0].votes} />
              </div>
            </Case>
            <Case value="legislativa">
              <div>
                <Typography className="mt-8 text-left" tag="p" variant="p">
                  {ballotTypes[1].description}
                </Typography>
                <VoteTypes votes={ballotTypes[1].votes} />
              </div>
            </Case>
            <Case value="municipal">
              <div>
                <Typography className="mt-8 text-left" tag="p" variant="p">
                  {ballotTypes[2].description}
                </Typography>
                <VoteTypes votes={ballotTypes[2].votes} />
              </div>
            </Case>
          </Switch>
        </animated.div>
      </Card>
      <div className="w-full mx-auto lg:w-2/3">
        <Typography tag="p" variant="p" className="mt-4">
          {t("practice.the-information-presented")}{" "}
          <Link
            to="https://aldia.microjuris.com/2020/07/24/como-se-vota-un-resumen-de-los-cambios-tras-el-nuevo-codigo-electoral/"
            target="_blank"
          >
            {t("practice.article")}
          </Link>{" "}
          {t("practice.published-by")}{" "}
          <Link to="https://aldia.microjuris.com/" target="_blank">
            Microjuris
          </Link>{" "}
          {t("practice.with-the")}{" "}
          <Link to="https://www.aclu.org/" target="_blank">
            {t("practice.aclu-long")}
          </Link>{" "}
          ({t("practice.aclu-short")}).
        </Typography>
      </div>
    </>
  )
}
