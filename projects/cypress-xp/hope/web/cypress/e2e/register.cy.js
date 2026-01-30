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

  context('required fields validation', () => {

    it('should not register if the field name is empty', () => {
      const orphanageData = data.required;

      delete orphanageData.name;
      
      cy.goToCreate();
      cy.createOrphanage(orphanageData);
      
      // label[contains(text(), "Nome")]/..//small

      cy.alertHaveText('Nome', 'Campo obrigatório');
      
    });

    it('should not register if the field description is empty', () => {
      const orphanageData = data.required;

      delete orphanageData.description;
      
      cy.goToCreate();
      cy.createOrphanage(orphanageData);
      
      // label[contains(text(), "Nome")]/..//small

      cy.alertHaveText('Sobre', 'Campo obrigatório');
      
    });

    it('should not register if the field photos is empty', () => {
      const orphanageData = data.required;

      delete orphanageData.image;
      
      cy.goToCreate();
      cy.createOrphanage(orphanageData);
      
      // label[contains(text(), "Nome")]/..//small

      cy.alertHaveText('Fotos', 'Envie pelo menos uma foto');
      
    });

    it('should not register if the field opening hours is empty', () => {
      const orphanageData = data.required;

      delete orphanageData.opening_hours;

      cy.goToCreate();
      cy.createOrphanage(orphanageData);
      
      // label[contains(text(), "Nome")]/..//small

      cy.alertHaveText('Horário de funcinamento', 'Campo obrigatório');
      
    });

    it('should not register if the required fields is empty', () => {
      const orphanageData = data.required;

      delete orphanageData.name;
      delete orphanageData.description;
      delete orphanageData.image;
      delete orphanageData.opening_hours;

      cy.goToCreate();
      cy.createOrphanage(orphanageData);
      
      // label[contains(text(), "Nome")]/..//small

      cy.alertHaveText('Nome', 'Campo obrigatório');
      cy.alertHaveText('Sobre', 'Campo obrigatório');
      cy.alertHaveText('Fotos', 'Envie pelo menos uma foto');
      cy.alertHaveText('Horário de funcinamento', 'Campo obrigatório');
      
    });
  
  });
  
});