describe('Start page for a quiz', () => {
  beforeEach(() => {
      cy.visit('http://localhost:5173/login');
      cy.get('#username').type('Alice');
      cy.get('#password').type('Alice1');
      cy.get('form').submit();
      cy.wait(1000);
      cy.visit('http://localhost:5173/quiz/1');
    });

    it('Quizz info is loaded in', () => {
      cy.get('.wrapper').contains(/Test title/i);
      cy.get('.wrapper').contains(/user1/i);
      cy.get('.wrapper').contains(/3 questions/i);
      cy.get('.wrapper').contains(/Average score/i);
      cy.get('.wrapper').contains(/medium/i);
    });

    it('Can edit and delete when correct user is logged in', () => {
      cy.visit('http://localhost:5173/login');
      cy.get('#username').type('User1');
      cy.get('#password').type('User1');
      cy.get('form').submit();
      cy.wait(1000);
      cy.visit('http://localhost:5173/quiz/1');
      cy.contains('button', /edit/i);
      cy.contains('button', /delete/i);
    });

    it('Can not edit and delete when correct user is logged in', () => {
      cy.contains('button', /edit/i).should('not.exist');
      cy.contains('button', /delete/i).should('not.exist');
    });

    it('Can click play quiz', () => {
      cy.get('.playButton').click();
      cy.url().should('include', '/play');
    });

    it('Leaderboard loads in with names', () => {
      cy.get('#leaderboard').contains(/gogogo/i);
    });

    it('Recent attempts loads in with attempts', () => {
      cy.get('#recent').contains(/Test title/i);
    });
});