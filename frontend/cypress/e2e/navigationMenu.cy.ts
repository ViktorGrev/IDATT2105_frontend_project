describe('Menu Component Tests', () => {
    it('Does not show the dropdown menu when userToken is null', () => {
        // Simulate userToken being null by ensuring sessionStorage does not have userToken
        cy.visit('http://localhost:5173/', {
          onBeforeLoad: (window) => {
            window.sessionStorage.clear();
          },
        });
      
        // Try to find the Dropdown Menu trigger. This assumes the element is not removed from the DOM but is hidden.
        // Adjust the selector based on how your application manages the dropdown visibility.
        cy.get('#showDrop').should('not.exist');
      
        // Alternatively, if your application removes the element from the DOM, you could assert its non-existence directly:
        cy.get('.drop-menu').should('not.exist');
      });
      
  });
  
  