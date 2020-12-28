describe("Inscribete", () => {
  it("visiting /inscribete", () => {
    cy.visit("/inscribete")

    cy.findByTestId("tarjeta-electoral").should("exist")
    cy.findByTestId("juntas-de-inscripcion-permanentes").should("exist")
    cy.findByTestId("recordatorio").should("exist")
    cy.findByTestId("electoral-status").should("exist")
  })
})
