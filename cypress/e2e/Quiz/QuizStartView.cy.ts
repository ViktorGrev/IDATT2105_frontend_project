describe('Start page for a quiz', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
        cy.get('#username').type('Alice');
        cy.get('#password').type('Alice1');
        cy.get('form').submit();
        cy.wait(1000);
        cy.visit('http://localhost:5173/quiz/1');
      });


    it('Find quiz when search', () => {
       
    });
});