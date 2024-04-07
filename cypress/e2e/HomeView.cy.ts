describe('Home functionality', () => {
    beforeEach(() => {
        //Logging in to get valid user token
        cy.visit('http://localhost:5173/login');
        cy.get('#username').type('Alice');
        cy.get('#password').type('Alice1');

        cy.get('form').submit();
      });

    
    it('Checking if content loads in', () => {
        cy.get('#item').contains('Loading');

        cy.wait(5000);

        cy.get('#item').contains('title');

        cy.get('#testId').contains('title');
    });

    it('Testing if redirect to quizzes work for recent quizzes played', () => {
        cy.wait(5000)

        cy.get('#item').click();

        cy.url().should('include', '/quiz');
    })

    it('Testing if redirect to quizzes work for recent top quizzes', () => {
        cy.wait(500)

        cy.get('#testId').click();

        cy.url().should('include', '/quiz');
    })
});