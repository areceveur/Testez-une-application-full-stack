import '../support/commands';

describe('Session list', () => {
  it('Should return the list of sessions', () => {
    cy.login('yoga@studio.com', 'test!1234');
    cy.visit('/sessions');
    cy.get('.item').should('be.visible');
  });
})
