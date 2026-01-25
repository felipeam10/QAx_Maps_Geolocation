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
    
    cy.visit('http://localhost:3000/map');
    
    cy.get('.leaflet-marker-icon').as('mapList');
    cy.get('@mapList').each((element, index, list) => {
      cy.get('@mapList')
        .eq(index)
        .click({force: true});
        cy.wait(1000);
        cy.get('.leaflet-popup-content').as('divName');
        cy.get('@divName')
          .invoke('text')
          .then((txt)=> {
            cy.log(txt);
            if(txt === orphanageData.name){
              cy.get('@mapList')
                .eq(index)
                .as('foundItem');
              cy.log('Found orphanage - ' + orphanageData.name);
            }
          })
    })
    cy.get('@foundItem')
      .click({force: true});
    cy.contains('.leaflet-popup-content', orphanageData.name)
      .find('a')
      .click({force: true});
    cy.contains('h1', orphanageData.name)
      .should('be.visible');

  });

  
});