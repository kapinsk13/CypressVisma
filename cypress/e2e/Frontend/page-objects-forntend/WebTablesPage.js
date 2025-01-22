class WebTablesPage {

  getRowByName(name) {
    return cy.contains('tr', name);
  }

  getEditButtonForUser(name) {
    const nameWithoutSpaces = name.replace(/\s+/g, '');
        return cy.contains('tr', nameWithoutSpaces).find('button').contains('Edit');
  }

  getRoleDropdown() {
    return cy.get('select[name="RoleId"]');
  }

  getSaveButton() {
    return cy.contains('button', 'Save');
  }

  getCompanyLabel(companyName) {
    return cy.contains('label', companyName);
  }

  getUserCompanyColumn(name) {
      const nameWithoutSpaces = name.replace(/\s+/g, '');
      return this.getRowByName(nameWithoutSpaces).within(() => {
        return cy.get('td:nth-child(5)');
      });
    }

  getUserRoleColumn(name) {
       const nameWithoutSpaces = name.replace(/\s+/g, '');
       return this.getRowByName(nameWithoutSpaces).within(() => {
         return cy.get('td:nth-child(6)');
       });
     }
}

export default WebTablesPage;
