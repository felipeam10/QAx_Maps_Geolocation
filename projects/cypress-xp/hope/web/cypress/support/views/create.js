Cypress.Commands.add('goToCreate', (position) => {
    cy.visit('/orphanages/create', position.latitude, position.longitude);
        
    cy.get('legend')
        .should('be.visible')
        .should('have.text', 'Cadastro');
});

Cypress.Commands.add('createOrphanage', (orphanageData) => {
    
    cy.setMapPosition(orphanageData.position);

    cy.get('input[name="name"]').as('fieldName');
    cy.get('#description').as('fieldDescription');
    cy.get('input[type="file"]').as('fieldImage');
    cy.get('#opening_hours').as('fieldOpeningHours');
    
    orphanageData.name ? cy.get('@fieldName').type(orphanageData.name) : cy.log('Empty field: name');
    orphanageData.description ? cy.get('@fieldDescription').type(orphanageData.description) : cy.log('Empty field: description');
    orphanageData.image ? cy.get('@fieldImage').selectFile('cypress/fixtures/images/' + orphanageData.image, { force: true }) : cy.log('Empty field: image');
    orphanageData.opening_hours ? cy.get('@fieldOpeningHours').type(orphanageData.opening_hours) : cy.log('Empty field: opening_hours');

    cy.contains('button', orphanageData.open_on_weekends ? 'Sim' : 'Não')
        .click();
    
    cy.get('.save-button')
        .click();
});