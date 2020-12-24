import { createServer, Request, Serializer } from "miragejs"

import legislativeBallot from "./fixtures/legislative-ballot"
import municipalBallot from "./fixtures/municipal-ballot"
import stateBallot from "./fixtures/state-ballot"

type MakeServerArgs = {
  environment: string
}

export default function makeServer({ environment }: MakeServerArgs) {
  const server = createServer({
    environment: environment || "development",
    logging: true,

    serializers: {
      application: Serializer,
    },

    routes() {
      // API Routes
      this.urlPrefix = "https://api.paravotar.org"

      this.get("/ballots/ByPrecint", () => {
        return {
          estatal: "papeletas/2020/estatal/",
          municipal: "papeletas/2020/aguada/",
          legislativa: "papeletas/2020/aguada-legislativa-038/",
        }
      })

      this.get("/ballots/ByTown")

      this.get("/consulta")

      this.post("/createBallotTask")

      this.get("/getPdfUrl")

      // Public bucket routes
      this.urlPrefix = "https://cdn.paravotar.org"

      this.get("/papeletas/:year/:ballot/data.json", function(
        _,
        request: Request
      ) {
        if (request.params.ballot === "estatal") {
          return stateBallot
        } else if (request.params.ballot.includes("legislativa")) {
          return legislativeBallot
        }

        return municipalBallot
      })

      this.passthrough("http://localhost:8000/**")
    },
  })

  return server
}
