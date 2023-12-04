import { Button, Typography } from "../../../components"

type BallotSelectorProps = {
  selectState: () => void
  selectMunicipal: () => void
  selectLegislative: () => void
}

export default function BallotSelector(props: BallotSelectorProps) {
  return (
    <div className="mx-auto lg:w-3/4">
      <Typography tag="p" variant="h4">
        Escoge por cuál papeleta comenzar
      </Typography>
      <Button
        className="w-full block mt-4 mb-2"
        onClick={props.selectState}
        data-testid="state-ballot"
      >
        Papeleta estatal
      </Button>
      <Button
        className="w-full block my-2"
        onClick={props.selectLegislative}
        data-testid="legislative-ballot"
      >
        Papeleta legislativa
      </Button>
      <Button
        className="w-full block my-2"
        onClick={props.selectMunicipal}
        data-testid="municipal-ballot"
      >
        Papeleta municipal
      </Button>
    </div>
  )
}
