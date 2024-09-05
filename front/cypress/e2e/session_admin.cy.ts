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
    cy.get('input[formControlName="email"]').type("yoga@studio.com");
    cy.get('input[formControlName="password"]').type("test!1234");
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/sessions')
    cy.get('.item').should('be.visible');
  });

  it('Should test the button create', () => {
    cy.get('button[routerLink="create"]').click();
  })

  it('Should fill the form and create a session', () => {
    cy.get('input[formControlName="name"]').type("Session de Yoga");
    cy.get('input[formControlName="date"]').type(formattedDate);
    cy.get('mat-select[formControlName="teacher_id"]').click();
    cy.get('mat-option').contains("Margot DELAHAYE").click();
    cy.get('mat-select[formControlName="teacher_id"]').should('have.text', "Margot DELAHAYE");
    cy.get('textarea[formControlName="description"]').type("Session de yoga avec Margot Delahaye");
    cy.get('button[type="submit"]').click();
  })

  it('Should display a detailed session', () => {
    cy.contains('mat-card', "Session de Yoga").within(() => {
      cy.contains('button', 'Detail').click();
    });
  });

  it('Should go back to the session list', () => {
    cy.contains("button", "back").click()
  })

  it('Should edit the session', () => {
    cy.contains('mat-card', "Session de Yoga").within(() => {
      cy.contains('button', 'Edit').click();
    })
  });

  it('Should replace one of the blank of the form', () => {
    cy.get('textarea[formControlName="description"]').clear();
    cy.get('textarea[formControlName="description"]').type("Session de yoga updated");
    cy.get('button[type="submit"]').click();
  })

  it('Should display again a detailed session', () => {
    cy.contains('mat-card', "Session de Yoga").within(() => {
      cy.contains('button', 'Detail').click();
    });
  })

  it('Should delete the session', () => {
    cy.contains("button", "Delete").should('be.visible');
    cy.contains("button", "Delete").click();
  })

})
