import { createServer, Response } from "miragejs"
import "wicg-inert"

import "./src/styles/typography.css"
import "./src/styles/global.css"
import "./src/styles/ReactToastify.css"

export const onClientEntry = () => {
  if (window.Cypress) {
    // If your app makes requests to domains other than / (the current domain), add them
    // here so that they are also proxied from your app to the handleFromCypress function.
    // For example: let otherDomains = ["https://my-backend.herokuapp.com/"]
    const otherDomains = [
      "https://cdn.paravotar.org/",
      "https://api.paravotar.org/",
    ]
    const methods = ["get", "put", "patch", "post", "delete"]

    createServer({
      environment: "test",
      logging: true,
      routes() {
        for (const domain of ["/", ...otherDomains]) {
          for (const method of methods) {
            this[method](`${domain}*`, async (schema, request) => {
              const [status, headers, body] = await window.handleFromCypress(
                request
              )

              return new Response(status, headers, body)
            })
          }
        }
      },
    })
  }
}
