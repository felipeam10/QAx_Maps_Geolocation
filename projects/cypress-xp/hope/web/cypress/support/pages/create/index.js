import popup from '../components/popup';

class CreatePage {

    constructor() {
        this.popup = popup;
    }

    go() {
        cy.visit('http://localhost:3000/orphanages/create');
        
        cy.get('legend')
            .should('be.visible')
            .should('have.text', 'Cadastro');
    }

    form(orphanageData) {
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
    }

    submit() {
        cy.get('.save-button')
            .click();
    }


}

export default new CreatePage();