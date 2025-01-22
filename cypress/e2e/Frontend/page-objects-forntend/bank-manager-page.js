export class BankManagerPage {

  addCustomer(name, postalCode) {
    const [firstName, lastName] = name.split(' ');
    cy.contains('button', 'Add Customer').click();
    cy.get('input[ng-model="fName"]').type(firstName);
    cy.get('input[ng-model="lName"]').type(lastName);
    cy.get('input[ng-model="postCd"]').type(postalCode);
    cy.get('button.btn.btn-default').click();
    cy.wait(1000);
  }

  verifyCustomerExists(name) {
    cy.contains('button', 'Customers').click();
    const [firstName, lastName] = name.split(' ');
    cy.get('table').contains('td', firstName).should('exist');
    cy.get('table').contains('td', lastName).should('exist');
  }

  deleteCustomer(name) {
    const [firstName, lastName] = name.split(' ');
    cy.get('table').contains('td', firstName).should('exist').parent('tr').contains('td', lastName).parent('tr')
      .within(() => {
        cy.contains('button', 'Delete').click();
      });
  }

  verifyCustomerDoesNotExist(name) {
    cy.get('table').contains('td', name).should('not.exist');
  }
}
