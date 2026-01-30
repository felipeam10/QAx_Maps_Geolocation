Cypress.Commands.add('openOrphanage', (name) => {

    const popup = '.leaflet-popup-content'

    cy.visit('http://localhost:3000/map');

    cy.get('.leaflet-marker-icon').as('mapList');

    cy.get('@mapList').each((element, index, list) => {
      cy.get('@mapList')
        .eq(index)
        .click({force: true});
        cy.wait(1000);
        cy.get(popup).as('divName');
        cy.get('@divName')
          .invoke('text')
          .then((txt)=> {
            cy.log(txt);
            if(txt === name){
              cy.get('@mapList')
                .eq(index)
                .as('foundItem');
              cy.log('Found orphanage - ' + name);
            }
          })
    })

    cy.get('@foundItem')
      .click({force: true});

    cy.contains(popup, name)
        .find('a')
        .click({force: true});
});

