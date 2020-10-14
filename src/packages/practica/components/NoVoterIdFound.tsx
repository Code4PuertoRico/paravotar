import React from "react"
import { Button, Typography } from "../../../components"

interface NoVoterIdFoundProps {
  send: any
}

export const NoVoterIdFound: React.FunctionComponent<NoVoterIdFoundProps> = ({
  send,
}) => {
  return (
    <div>
      <Typography tag="h2" variant="h4" className="font-bold text-red mt-1">
        Oops! No logramos encontrar tu información.
      </Typography>

      <Typography tag="p" variant="p" className="mt-4">
        Puede intentar de nuevo o si conoce su numero de precinto puede
        ingresarlo
      </Typography>
      <div className="grid grid-cols-1 gap-4 mt-6 lg:grid-cols-2">
        <div className="w-full my-1">
          <Button className="block w-full" onClick={() => send("RETRY")}>
            Número de tarjeta electoral
          </Button>
        </div>
        <div className="w-full my-1">
          <Button
            className="block w-full"
            onClick={() => send("ENTER_VOTING_CENTER")}
          >
            Número de precinto
          </Button>
        </div>
      </div>
    </div>
  )
}
