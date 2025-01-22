import { LoginPage } from '../page-objects-forntend/login-page.js';
import { BankManagerPage } from '../page-objects-forntend/bank-manager-page.js';


describe('Bank Manager Customer Management Test', () => {
  const loginPage = new LoginPage();
  const bankManagerPage = new BankManagerPage();

  const customerName = "John Wick";
  const postalCode = "888300";

  beforeEach(() => {
    cy.visit(`${Cypress.env('way2automation_URL')}/angularjs-protractor/banking/#/login`);
  });

  it('Login as Bank Manager, add a customer, verify and delete', () => {
    loginPage.loginAsBankManager();
    bankManagerPage.addCustomer(customerName, postalCode);
    bankManagerPage.verifyCustomerExists(customerName);
    bankManagerPage.deleteCustomer(customerName);
    bankManagerPage.verifyCustomerDoesNotExist(customerName);
  });
});
