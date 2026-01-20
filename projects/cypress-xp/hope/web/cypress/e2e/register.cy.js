import data from '../fixtures/orphaneges.json';
//import { faker } from '@faker-js/faker';

describe('Cadastro Orfanatos', () => {
  
  it('should be able to register a mew orphanage', () => {
    //cy.visit('http://localhost:3000/orphanages/create');
    
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

  });
});

Cypress.Commands.add('setMapPosition', (position) => {
  window.localStorage.setItem('hope-qa:latitude', position.latitude);
  window.localStorage.setItem('hope-qa:longitude', position.longitude);
});

Cypress.Commands.add('visitWithMockGeolocation', (url, latitude = -23.5276158, longitude = -46.6810411) => {
  const mockGeolocation = (win, latitude, longitude) => {
    cy.stub(win.navigator.geolocation, 'getCurrentPosition', cb => {
      return cb({ coords: { latitude, longitude } });
    });
  };
  cy.visit(url, {
    onBeforeLoad: win => {
      mockGeolocation(win, latitude, longitude);
    }
  });
});