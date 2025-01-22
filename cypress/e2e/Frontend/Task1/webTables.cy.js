import WebTablesPage from '../page-objects-forntend/WebTablesPage.js';

describe('Web tables Tests', () => {
    const webTablesPage = new WebTablesPage();

    beforeEach(() => {
        cy.visit(`${Cypress.env('way2automation_URL')}/angularjs-protractor/webtables`);
    });

    it('Edit Mark Novak role', () => {
        webTablesPage.getEditButtonForUser('Mark Novak').click();
        webTablesPage.getRoleDropdown().select('Sales Team');
        webTablesPage.getSaveButton().click();
        webTablesPage.getUserRoleColumn('Mark Novak')
            .should('contain.text', 'Sales Team');
    });

    it('Change test user company', () => {
        webTablesPage.getEditButtonForUser('test test').click();
        webTablesPage.getCompanyLabel('Company AAA').click();
        webTablesPage.getSaveButton().click();
        cy.reload();
        cy.wait(1000);
        webTablesPage.getUserCompanyColumn('test test')
            .should('contain.text', 'Company BBB');
    });
});
