import data from '../fixtures/orphaneges.json';
import createPage from '../support/pages/create'; 
import popup from '../support/pages/components/popup';
import mapPage from '../support/pages/maps';
import { map } from 'leaflet';

describe('Mapa', () => {
  
  it('Should be choose a orphanage in the map', () => {
    const orphanageData = data.map;
    
    cy.deleteMany({name: orphanageData.name}, {collection: 'orphanages'});

    cy.postOrphanage(orphanageData);
    
    cy.openOrphanage(orphanageData.name);


    cy.contains('h1', orphanageData.name)
      .should('be.visible');

  });

  
});