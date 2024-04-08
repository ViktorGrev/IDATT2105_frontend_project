describe('Search', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
        cy.get('#username').type('Alice');
        cy.get('#password').type('Alice1');
        cy.get('form').submit();
        cy.wait(1000);
      });


   //Testing if search for quizz works
   it('Find quiz when search with input field', () => {
      cy.visit('http://localhost:5173/search');
      cy.get('#searchField').type('ntnu{enter}');
      cy.get('#searchedQuizzes').contains(/ntnu/i)
   });

   //Testing if search for user works
    it('Find user when search with input field', () => {
      cy.visit('http://localhost:5173/search');
      cy.get('#searchField').type('Alice{enter}');
      cy.get('#searchedUsers').contains(/alice/i)
   });    

   //Testing category buttons
    it('Find quiz when search with category buttons', () => {
      cy.visit('http://localhost:5173/search');
      cy.get('#categorybutton').click();
      //Confirm that quizzes pop up
      cy.get('#searchedQuizzes').contains('Quizz')
   });
});