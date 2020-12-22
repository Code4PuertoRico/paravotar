describe("Practica", () => {
  it("visiting /practica", () => {
    cy.visit("/practica")

    cy.findByTestId("practica-tu-voto")
  })

  it("root route should redirect to /practica", () => {
    cy.visit("/")

    cy.url().should("eq", `${Cypress.config().baseUrl}/practica`)
  })
})
