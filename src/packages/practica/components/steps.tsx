import { ReactNode } from "react"
import { Button, Link, Typography } from "../../../components"

type StepProps = {
  children: ReactNode
}

function StepTitle({ children }: StepProps) {
  return (
    <Typography tag="p" variant="h4" className="font-semibold">
      {children}
    </Typography>
  )
}

function StepDescription({ children }: StepProps) {
  return (
    <Typography tag="p" variant="p" className="text-sm">
      {children}
    </Typography>
  )
}

function Step({ children }: StepProps) {
  return <li className="text-left p-2 practice-step relative">{children}</li>
}

Step.Title = StepTitle
Step.Description = StepDescription

export default function Steps(props: { onStart: () => void }) {
  return (
    <div className="mx-auto lg:w-3/4">
      <Typography tag="p" variant="h3" className="uppercase">
        Vamos a guiarte por el proceso de practicar tu voto
      </Typography>
      <Typography tag="p" variant="p">
        Sigue los siguientes pasos...
      </Typography>
      <ol className="ml-8 mt-6">
        <Step>
          <Step.Title>Busca tus papeletas.</Step.Title>
          <Step.Description>
            Escoge tu pueblo con número de precinto o entra tu número electoral.
            Con esta información buscaremos las papeletas que verás en tu
            colegio electoral el día de las elecciones.
            <br />
            <br />
            Si no conoces tu número de precinto puedes buscarlo en{" "}
            <Link to="https://consulta.ceepur.org/" target="_blank">
              Consulta por la Comisión Estatal de Elecciones
            </Link>
            .
          </Step.Description>
        </Step>
        <Step>
          <Step.Title>Escoge la papeleta que quieres practicar.</Step.Title>
          <Step.Description>
            Escoger entre la papeleta estatal, municipal o legislativa para que
            conozcas a tus candidatos antes del día de las elecciones.
          </Step.Description>
        </Step>
        <Step>
          <Step.Title>Practica tu voto.</Step.Title>
          <Step.Description>
            Practica tu voto en la papeleta estatal, municipal o legislativa.
            Mientras escoges tus votos la aplicación te notificará sobre
            cualquier error que invalide tu papeleta mientras escoges a tus
            candidatos.
          </Step.Description>
        </Step>
        <Step>
          <Step.Title>Mira los resultados.</Step.Title>
          <Step.Description>
            Conoce qué tipo de voto emitiste, por cuantos candidatos votaste y
            por quién votaste. Luego, escoge otra papeleta y practica de nuevo.
          </Step.Description>
        </Step>
        <Step>
          <Step.Title>Descarga tu papeleta.</Step.Title>
          <Step.Description>
            Opcionalmente, puedes descargar la papeleta que practicaste en
            formato PDF para que la utilizes como referencia el día de las
            elecciones.
          </Step.Description>
        </Step>
      </ol>
      <Button
        className="mt-8 w-full"
        variant="primary"
        onClick={props.onStart}
        data-testid="start-practice"
      >
        Comenzar a practicar
      </Button>
      <Typography className="text-sm mt-6" tag="p" variant="p">
        Para Votar no almacena ningún tipo de información personal ni rastrea a
        los usuarios que utilizen la página. Todo voto practicado es
        completamente anónimo y seguro.
      </Typography>
      <Typography className="text-xs italic mt-4" tag="p" variant="p">
        Si confrontas problemas utilizando Para Votar puedes utilizar{" "}
        <Link to="https://www.practicatuvoto.com/" target="_blank">
          Practica tu voto
        </Link>{" "}
        para conocer a tus candidatos y practicar tu voto.
      </Typography>
    </div>
  )
}
