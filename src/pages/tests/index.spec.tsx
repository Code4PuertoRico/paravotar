import React from "react"
import { render } from "@testing-library/react"
import IndexPage from "../practica-tu-voto"

describe("Example test", () => {
  it("renders title", () => {
    const { queryAllByText } = render(<IndexPage />)
    expect(queryAllByText("Pratica Tu Voto")).toBeDefined()
  })
})
