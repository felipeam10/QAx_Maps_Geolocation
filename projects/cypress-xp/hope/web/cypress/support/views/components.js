Cypress.Commands.add('popupHaveText', (text) => {
    cy.get('.swal2-html-container')
        .should('be.visible')
        .should('have.text', text);
});