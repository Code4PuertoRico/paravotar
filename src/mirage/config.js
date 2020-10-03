import { Server } from "miragejs"

export function makeServer({ environment = "test" } = {}) {
  const server = new Server({
    urlPrefix: "https://api.paravotar.org",
    environment,

    routes() {
      this.get("/consulta", () => {
        return {
          numeroElectoral: "6362919",
          precinto: "082",
          unidad: "10",
          estatus: "Activo",
          papeletas: {
            estatal:
              "https://paravotar.s3.amazonaws.com/papeletas/2016/gobernador-y-comisionado-residente/data.json",
            legislativa:
              "https://paravotar.s3.amazonaws.com/papeletas/2016/091-patillas/data.json",
            municipal:
              "https://paravotar.s3.amazonaws.com/papeletas/2016/patillas/data.json",
          },
        }
      })

      this.passthrough("https://paravotar.s3.amazonaws.com/**")
    },
  })

  return server
}
