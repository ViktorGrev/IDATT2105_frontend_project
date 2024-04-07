describe('Page not found', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/notanurl');
      });


    it('Pagenot found when wrong url', () => {
        cy.get('#errorMessage').should('contain', '404');
        cy.url().should('include', '/notanurl');
    });
});