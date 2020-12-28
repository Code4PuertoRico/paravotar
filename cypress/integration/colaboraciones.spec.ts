describe("Colaboraciones", () => {
  it("visiting /colaboraciones", () => {
    cy.visit("/colaboraciones")

    cy.findByTestId("proyecto-85").should("exist")
    cy.findByTestId("quien-me-representa").should("exist")
    cy.findByTestId("tu-voto-no-se-deja").should("exist")
    cy.findByTestId("microjuris").should("exist")
    cy.findByTestId("practica-tu-voto").should("exist")
  })
})
