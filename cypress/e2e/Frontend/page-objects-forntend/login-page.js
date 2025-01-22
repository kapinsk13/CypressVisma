export class LoginPage {

  loginAsBankManager() {
    cy.contains('button', 'Bank Manager Login').click();
  }
}