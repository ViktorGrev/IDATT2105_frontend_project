describe('Login functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
        cy.get('#username').type('Alice');
        cy.get('#password').type('Alice1');
        cy.get('form').submit();
        cy.wait(1000);
      });

    //Testing if fields contains correct info
    it('Find quiz when search with input field', () => {
        cy.visit('http://localhost:5173/edit');

        cy.wait(2000);

        cy.get('#quizTitle').should('have.value', 'WW2-Viktor');
        cy.get('#description').should('have.value', 'About ww2');

        cy.get('#category').should('have.value', 'ENGINEERING');

        cy.get('#tagInput').should('have.value', '');
        cy.get('#question').contains(/Question/i);
        cy.get('#category').should('have.value', 'ENGINEERING');
    });
});