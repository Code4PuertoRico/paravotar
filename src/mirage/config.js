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
            estatal: "/papeletas/2016/gobernador-y-comisionado-residente",
            legislativa: "/papeletas/2016/091-patillas",
            municipal: "/papeletas/2016/patillas",
          },
        }
      })

      this.passthrough("https://paravotar.s3.amazonaws.com/**")
    },
  })

  return server
}
