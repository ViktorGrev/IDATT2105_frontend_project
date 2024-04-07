describe('Start page for a quiz', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
        cy.get('#username').type('Alice');
        cy.get('#password').type('Alice1');
        cy.get('form').submit();
        cy.wait(1000);
        cy.visit('http://localhost:5173/yourLibrary');
      });
  
      it('Quizzes load in', () => {
        cy.wait(1000);
        cy.get('.contentBox').contains(/test/i);
        cy.get('.quizz');
      });

      it('Quizzes redirect you', () => {
        cy.wait(500);
        cy.get('.quizz').contains(/test/i).click();
        cy.url().should('include', '/quiz');
      });
  });