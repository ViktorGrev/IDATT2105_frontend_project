describe('Signup functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/signup');
      });


    it('failed login due to no matching passwords', () => {
        cy.get('#username').type('Alice');
        cy.get('#password').type('Alice');
        cy.get('#confirmPassword').type('Alice1');

        cy.get('form').submit();

        cy.get('#passwordError').should('contain', 'Password do not match');
    });

    it('failed login due to wrong password format', () => {
        cy.get('#username').type('Alice');
        cy.get('#password').type('Alice');
        cy.get('#confirmPassword').type('Alice');

        cy.get('form').submit();

        cy.get('#passwordError').should('contain', 'Password must contain at least one lowercase letter one uppercase letter and one digit');
    });

    it('failed login due to no username', () => {
        cy.get('#username').type(' ');
        cy.get('#password').type('Alice1');
        cy.get('#confirmPassword').type('Alice1');

        cy.get('form').submit();

        cy.get('#passwordError').should('contain', 'Username must be between 4 and 16 characters');
    });

    it('failed login due to no username, password, confirmpassword', () => {
        cy.get('form').submit();

        cy.get('#passwordError').should('contain', 'Password is empty');
    });
});