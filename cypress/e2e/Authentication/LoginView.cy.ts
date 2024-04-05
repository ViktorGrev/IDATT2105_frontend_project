describe('Login functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
      });


    it('failed login due to wrong username and password', () => {
        cy.get('#username').type('Alice');
        cy.get('#password').type('Alice1');

        cy.get('form').submit();

        cy.get('#passwordError').should('contain', 'User not found');
    });

    it('failed login due to incorrect password format', () => {
        cy.get('#username').type('testUser');
        cy.get('#password').type('wrongFormat');

        cy.get('form').submit();

        cy.get('#passwordError').should('contain', 'Password');
    });

    it('Successful login redirects to /', () => {
        cy.get('#username').type('Gogogo');
        cy.get('#password').type('GoGo1');

        cy.get('form').submit();

        cy.url().should('include', '/');
    });

    it('Successful login and sets userToken in session storage', () => {
        cy.get('#username').type('Gogogo');
        cy.get('#password').type('GoGo1');

        cy.get('form').submit();

        cy.window().should((win) => {
            expect(win.sessionStorage.getItem('userToken')).to.exist;
          });
    });
});