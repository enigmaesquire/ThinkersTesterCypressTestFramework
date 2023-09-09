import { MainPage } from "./mainPage";

export class AddContactPage extends MainPage {

    constructor(){
    super("/addContact","Add Contact")
      }

  firstNameTextbox() {
    return cy.get("#email");
  }

  logoutButton() {
    return cy.get("#password");
  }

  lastNameTextbox() {
    return cy.get("#submit");
  }

  dateOfBirthTextbox() {
    return cy.get("#signup");
  }

  emailTextbox() {
    return cy.get('a');
  }

  streetAddress1Textbox() {
    return cy.get('a');
  }
  streetAddress2Textbox() {
    return cy.get('a');
  }
  cityTextbox() {
    return cy.get('a');
  }

  stateProvinceTextbox() {
    return cy.get('a');
  }

  postalCodeTextbox() {
    return cy.get('a');
  }
  countryTextbox() {
    return cy.get('a');
  }

  submit() {
    return cy.get("#submit");
  }

  cancel() {
    return cy.get("#cancel");
  }
}
