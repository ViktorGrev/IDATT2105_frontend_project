describe('Start page for a quiz', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
        cy.get('#username').type('Alice');
        cy.get('#password').type('Alice1');
        cy.get('form').submit();
        cy.wait(1000);
        cy.visit('http://localhost:5173/settings');
      });
  
    it('Correct info is loaded in', () => {
        //Checks if correct username
        cy.get('[data-testid="username-textarea"]').should('contain', /alice/i);

        cy.get('.container').contains(/alice/i);

        cy.get('.blueButton');
    });
    
    it('Can change username', () => {
        cy.get('[data-testid="username-textarea"]').should('contain', /alice/i);
    });
  });