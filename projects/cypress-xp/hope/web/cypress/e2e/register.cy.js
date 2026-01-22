import data from '../fixtures/orphaneges.json';
//import { faker } from '@faker-js/faker';

describe('Cadastro Orfanatos', () => {
  
  it('should be able to register a mew orphanage', () => {
    const orphanageData = data.create;

    cy.deleteMany({name: orphanageData.name}, {collection: 'orphanages'});

    cy.visitWithMockGeolocation('http://localhost:3000/orphanages/create');
    cy.get('legend')
        .should('be.visible')
        .should('have.text', 'Cadastro');

    cy.setMapPosition(orphanageData.position);
    
    cy.get('input[name="name"]')
        .type(orphanageData.name);
    
    cy.get('#description')
        .type(orphanageData.description);

    cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/images/kids-playground-1.png', { force: true });

    cy.get('#opening_hours')
        .type(orphanageData.opening_hours);

    cy.contains('button', orphanageData.open_on_weekends)
        .click();
    
    cy.get('.save-button')
        .click();

    cy.get('.swal2-html-container')
        .should('be.visible')
        .should('have.text', 'Orfanato cadastrado com sucesso.');

  });

  it.only('should not to register a mew orphanage when his name is duplicated', () => {
    const orphanageData = data.duplicate;

    cy.deleteMany({name: orphanageData.name}, {collection: 'orphanages'});

    // First registration
    cy.visitWithMockGeolocation('http://localhost:3000/orphanages/create');
    cy.get('legend')
        .should('be.visible')
        .should('have.text', 'Cadastro');

    cy.setMapPosition(orphanageData.position);
    
    cy.get('input[name="name"]')
        .type(orphanageData.name);
    
    cy.get('#description')
        .type(orphanageData.description);

    cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/images/kids-playground-1.png', { force: true });

    cy.get('#opening_hours')
        .type(orphanageData.opening_hours);

    cy.contains('button', orphanageData.open_on_weekends)
        .click();
    
    cy.get('.save-button')
        .click();

    //second registration with the same name
    cy.wait(5000); //wait for 2 seconds to avoid overlapping alerts
    cy.visitWithMockGeolocation('http://localhost:3000/orphanages/create');
    cy.get('legend')
        .should('be.visible')
        .should('have.text', 'Cadastro');

    cy.setMapPosition(orphanageData.position);
    
    cy.get('input[name="name"]')
        .type(orphanageData.name);
    
    cy.get('#description')
        .type(orphanageData.description);

    cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/images/kids-playground-1.png', { force: true });

    cy.get('#opening_hours')
        .type(orphanageData.opening_hours);

    cy.contains('button', orphanageData.open_on_weekends)
        .click();
    
    cy.get('.save-button')
        .click();

    cy.get('.swal2-html-container')
        .should('be.visible')
        .should('have.text', 'Já existe um cadastro com o nome: ' + orphanageData.name);

  });
});