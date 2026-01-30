Cypress.Commands.add('goToCreate', () => {
    cy.visit('http://localhost:3000/orphanages/create');
        
    cy.get('legend')
        .should('be.visible')
        .should('have.text', 'Cadastro');
});

Cypress.Commands.add('createOrphanage', (orphanageData) => {
    
    cy.setMapPosition(orphanageData.position);

    cy.get('input[name="name"]')
        .type(orphanageData.name);

    cy.get('#description')
        .type(orphanageData.description);

    cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/images/' + orphanageData.image, { force: true });

    cy.get('#opening_hours')
        .type(orphanageData.opening_hours);

    cy.contains('button', orphanageData.open_on_weekends)
        .click();
    
    cy.get('.save-button')
        .click();
});