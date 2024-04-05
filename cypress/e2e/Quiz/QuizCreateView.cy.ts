describe('Login functionality', () => {

      it('Test attempting to create a listing without a user redirects to login', () => {
        cy.visit('http://localhost:5173/create');
        cy.wait(1000);
        cy.url().should('include', '/login');
      });

      it('Sucessfuly creating a quiz', () => {
        //Login to get userToken
        cy.visit('http://localhost:5173/login');
        cy.get('#username').type('Alice');
        cy.get('#password').type('Alice1');
        cy.get('form').submit();
        cy.wait(1000);

        //Testing create
        cy.visit('http://localhost:5173/create');
        cy.get('#quizTitle').type('Test Quiz');
        cy.get('#description').type('Description text');
        cy.get('#category').select('CALCULUS');

        cy.get('.tagInput').type('History');
        cy.get('.titleButton').contains('Apply Tag').click();

        cy.get('.tagsDisplay').should('contain', 'History');

        cy.get('#question').type('What if?');
        
        cy.get('.answersField').each(($el) => {
          cy.wrap($el).type('yes');
        });

        cy.get('.createButton').click();

        cy.url().should('include', '/quiz');
    });
});