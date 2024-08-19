describe('Register spec', () => {
  it('Disable submit button if required fields are missing', () => {
    cy.visit('/register');

    cy.get('input[formControlName=firstName]').clear();
    cy.get('input[formControlName=lastName]').clear();
    cy.get('input[formControlName=email]').clear;
    cy.get('input[formControlName=password]').clear();

    cy.get('button[type=submit]').should('be.disabled');

  });

  it('Register with successfully valid data', () => {
    cy.visit('/register');

    cy.intercept('POST', '/api/auth/register', {
      statusCode: 200,
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'yoga@studio.com',
        admin: false
      },
    }).as('registerUser');

    cy.get('input[formControlName=firstName]').type("John")
    cy.get('input[formControlName=lastName]').type("Doe")
    cy.get('input[formControlName=email]').type("john@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!5678"}{enter}{enter}`)


  })
})
