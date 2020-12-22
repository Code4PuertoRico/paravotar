describe('Colaboraciones', () => {
  it('visiting /colaboraciones', () => {
    cy.visit('/colaboraciones');
    cy.get('[data-testid="proyecto-85"]').should('exist');
    cy.get('[data-testid="quien-me-representa"]').should('exist');
    cy.get('[data-testid="tu-voto-no-se-deja"]').should('exist');
    cy.get('[data-testid="microjuris"]').should('exist');
    cy.get('[data-testid="practica-tu-voto"]').should('exist');
  });
});