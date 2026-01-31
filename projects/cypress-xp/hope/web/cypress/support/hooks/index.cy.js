describe('Setup', () => {

    before(() => {
        cy.dropCollection('orphanages');
    });

    it('drop succesfully', () => {
        cy.log('Collection dropped succesfully');
    });

});