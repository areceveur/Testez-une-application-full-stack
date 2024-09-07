describe('Session list creation', () => {

  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const today = new Date();
  const formattedDate = formatDateToYYYYMMDD(today);

  it('Should return the list of sessions', () => {
    cy.visit('/login');
    cy.get('input[formControlName="email"]').type("user@test.com");
    cy.get('input[formControlName="password"]').type("test1234");
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/sessions')
    cy.get('.item').should('be.visible');
  });

  it('Should display a detailed session', () => {
    cy.contains('mat-card', "Yoga").within(() => {
      cy.contains('button', 'Detail').click();
    });
  });

  it('Should test the participation button', () => {
    cy.contains('button', "Participate").click();
  })

  it('Should test the unparticipate button', () => {
    cy.contains('button', "Do not participate").click();
  })

  it('Should go back to the session list', () => {
    cy.contains("button", "back").click()
  })

  it('Should display the account session', () => {
    cy.get('mat-toolbar').contains('Account').click();
  })

  it('Should delete the account', () => {
    cy.contains("button", "Delete").should('be.visible');
    cy.contains("button", "Delete").click();
  })

})
