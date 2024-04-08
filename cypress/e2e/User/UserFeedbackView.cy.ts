describe('Start page for a quiz', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
        cy.get('#username').type('Alice');
        cy.get('#password').type('Alice1');
        cy.get('form').submit();
        cy.wait(1000);
        cy.visit('http://localhost:5173/feedback');
      });
  
      it('submits the form with valid data and shows success message', () => {
        cy.visit('http://localhost:5173/feedback');
    
        // Fill in email
        cy.get('input[type="email"]').type('test@example.com');
    
        // Fill in message
        cy.get('textarea[name="comment[text]"]').type('This is a test feedback message.');
    
        // Submit the form
        cy.get('form').submit();
    
        // Ensure the submission status message appears
        cy.contains('Feedback has been sent!').should('be.visible');
      });

      it('shows error message if form submission fails', () => {
        cy.visit('http://localhost:5173/feedback'); // Adjust the URL if needed
    
        // Fill in email
        cy.get('input[type="email"]').type('invalidemail'); 
    
        // Fill in message
        cy.get('textarea[name="comment[text]"]').type('This is a test feedback message.');
    
        // Submit the form
        cy.get('form').submit();
    
        cy.contains(/must be a well-formed email address/i).should('be.visible'); 
      });
  });