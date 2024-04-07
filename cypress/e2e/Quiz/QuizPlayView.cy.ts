describe('Login functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
        cy.get('#username').type('Alice');
        cy.get('#password').type('Alice1');
        cy.get('form').submit();
        cy.wait(1000);
      });

    //Testing if fields contains correct info
    it('Checking if test loads in', () => {
        cy.visit('http://localhost:5173/play/1')

        //checking if title has come correctly
        cy.get('.title').contains(/Test title/i);

        //Checking of question 1 has come in correcetly
        cy.get('.card').contains(/describe/i);
        

        //Checking of question 2 and 3 has come in correcetly
        cy.get('.card').contains(/how/i);
        cy.get('.card').contains(/good/i);
        cy.get('.card').contains(/bad/i);
        cy.get('.card').contains(/true/i);

        cy.get('.submit-btn').contains(/submit/i);
    });

    //Testing if fields contains correct info
    it('Checking sending of test', () => {
        cy.visit('http://localhost:5173/play/1')

        //checking if title has come correctly
        cy.get('input[type="text"]').type('test');

        cy.contains('button', /good/i).click();

        cy.contains('button', /true/i).click();

        cy.get('.submit-btn').click();
        cy.url().should('include', '/result');
    });
});