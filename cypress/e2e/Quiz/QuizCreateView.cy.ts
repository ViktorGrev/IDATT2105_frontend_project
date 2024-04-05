describe('Login functionality', () => {

      it('Test attempting to create a listing without a user redirects to login', () => {
        cy.visit('http://localhost:5173/create');
        cy.wait(1000);
        cy.url().should('include', '/login');
      });

      it('failed login due to wrong username and password', () => {
        cy.visit('http://localhost:5173/create');
        cy.get('#quizTitle').type('Test Quiz');
        cy.get('#description').type('Description text');
        cy.get('#category').select('CALCULUS');

        cy.get('.tagInput').type('History');
        cy.get('.titleButton').contains('Apply Tag').click();

        cy.get('.tagsDisplay').should('contain', 'History');

        cy.get('.addQuestionButton').click();
        cy.get('.createButton').click();
    });
});