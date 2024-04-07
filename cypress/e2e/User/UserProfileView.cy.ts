describe('Start page for a quiz', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
        cy.get('#username').type('Alice');
        cy.get('#password').type('Alice1');
        cy.get('form').submit();
        cy.wait(1000);
        cy.visit('http://localhost:5173/profile/Alice');
      });
  
    it('Can click on recent quizzes played and get redirected', () => {
        //Checks if correct username
        cy.get('.Name').contains(/alice/i)

        cy.wait(1000)

        cy.get('#item').click();

        cy.url().should('include', '/quiz');
    });
    
    it('Can click on recent attempts and get redirected', () => {
        //Checks if correct username
        cy.wait(1000)

        cy.get('.list').contains(/total attempts/i)

        cy.get('.list li').contains(/test/i).click();
        cy.url().should('include', '/result');
      });
  });