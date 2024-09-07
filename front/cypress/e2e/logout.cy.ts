describe('Logout spec', () => {
  it('Should login successfully', () => {
    cy.visit('/login')
    cy.get('input[formControlName=email]').type("yoga@studio.com");
    cy.get('input[formControlName=password]').type("test!1234");
    cy.get('button[type="submit"]').click();
  });

  it('Should logout successfully', () => {
    cy.get('mat-toolbar').contains('Logout').click();
  })
})
