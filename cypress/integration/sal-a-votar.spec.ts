describe("Sal a votar", () => {
  it("visiting /sal-a-votar", () => {
    cy.visit("/sal-a-votar")

    cy.findByTestId("voto-ausente-y-adelantado")
  })
})
