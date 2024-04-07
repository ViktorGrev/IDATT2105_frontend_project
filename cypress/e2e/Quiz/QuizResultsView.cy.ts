describe('Start page for a quiz', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
        cy.get('#username').type('Alice');
        cy.get('#password').type('Alice1');
        cy.get('form').submit();
        cy.wait(1000);
        cy.visit('http://localhost:5173/result/70');
      });
  
    it('Quizz result is loaded in', () => {
        cy.get('.title').contains(/Test/i);
        cy.get('.scoreText').contains(/you/i);
        cy.get('.scoreText').contains(/0 correct/i);
        cy.get('.scoreText').contains(/1 wrong/i);
        cy.get('.choiceButtons').contains(/again/i);
        cy.get('.choiceButtons').contains(/leave/i);
        cy.get('.content').contains(/describe/i);
        cy.get('.content').contains(/how/i);
        cy.get('.content').contains(/good/i);
        cy.get('.content').contains(/bad/i);
        cy.get('.content').contains(/true/i);
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