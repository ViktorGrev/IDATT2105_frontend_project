describe('Start page for a quiz', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
        cy.get('#username').type('Alice');
        cy.get('#password').type('Alice1');
        cy.get('form').submit();
        cy.wait(1000);
        cy.visit('http://localhost:5173/result/1');
      });

    it('Can press again and get redirected', () => {
        cy.get('.choiceButtons').contains(/again/i).click();
        cy.url().should('include', '/quiz');
    });

    it('Can press leave and get redirected', () => {
        cy.get('.choiceButtons').contains(/leave/i).click();
        cy.url().should('include', '/');
    });
  });