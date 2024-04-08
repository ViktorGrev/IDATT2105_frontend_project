describe('Login functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
        cy.get('#username').type('Alice');
        cy.get('#password').type('Alice1');
        cy.get('form').submit();
        cy.wait(1000);
      });

    //Testing if fields contains correct info
    it('Checking if test can be played', () => {
        cy.visit('http://localhost:5173/play/1')

        //checking if title has come correctly
        cy.get('input[type="text"]').type('trondheim');

        cy.contains('button', /1996/i).click();

        cy.contains('button', /true/i).click();

        cy.get('.submit-btn').click();
        cy.url().should('include', '/result');
    });
});