describe('Login spec', () => {
  it('Login successfully', () => {
    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true
      },
    })

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []).as('session')

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

    cy.url().should('include', '/sessions')
  });

  it('Displays error on incorrect login/password', () => {
    cy.visit('/login');

    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      body: {
        error: 'Invalid credentials',
      },
    });

    cy.get('input[formControlName=email]').type("wrong@studio.com");
    cy.get('input[formControlName=password]').type("wrongpassword{enter}{enter}");

    cy.get('.error').should('be.visible').and('contain', 'An error occurred');
  });

  it('Shows error and disable submit button if required fields are missing', () => {
    cy.visit('/login');
    cy.get('input[formControlName=email]').clear();
    cy.get('input[formControlName=password]').clear();

    cy.get('button[type=submit]').should('be.disabled');
  })
});
