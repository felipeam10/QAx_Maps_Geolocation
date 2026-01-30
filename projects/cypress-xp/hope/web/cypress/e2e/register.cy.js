import data from '../fixtures/orphaneges.json';
import createPage from '../support/pages/create'; 
import popup from '../support/pages/components/popup';
import mapPage from '../support/pages/maps';
import { map } from 'leaflet';

describe('Cadastro Orfanatos', () => {
  
  it('should be able to register a mew orphanage', () => {
    const orphanageData = data.create;

    cy.deleteMany({name: orphanageData.name}, {collection: 'orphanages'});

    cy.goToCreate();
    cy.createOrphanage(orphanageData);
    cy.popupHaveText('Orfanato cadastrado com sucesso.');

  });

  it('should not to register a mew orphanage when his name is duplicated', () => {
    const orphanageData = data.duplicate;

    cy.deleteMany({name: orphanageData.name}, {collection: 'orphanages'});

    // First registration
    cy.postOrphanage(orphanageData);


    //second registration with the same name
    cy.wait(2000); //wait for 2 seconds to avoid overlapping alerts
    
    cy.goToCreate();
    cy.createOrphanage(orphanageData);

    cy.popupHaveText('Já existe um cadastro com o nome: ' + orphanageData.name);

  });
  
});