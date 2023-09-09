import { MainPage } from "./mainPage";

export class SignUpPage extends MainPage {

  constructor(){
    super("/addUser","Add User")
      }

  emailTextbox() {
    return cy.get("#email");
  }

  passwordTextbox() {
    return cy.get("#password");
  }

  firstNameTextbox() {
    return cy.get("#firstName");
  }

  lastNameTextbox() {
    return cy.get("#lastName");
  }

  submitButton() {
    return cy.get("#submit");
  }

  cancelButton() {
    return cy.get("#cancel");
  }

  validationError() {
    return cy.get('#error');
}
  addNewUser(firstName, lastname, email, password) {
    this.firstNameTextbox().clear().click().type(firstName);
    this.lastNameTextbox().clear().click().type(lastname);
    this.emailTextbox().clear().click().type(email);
    this.passwordTextbox().clear().click().type(password);
    this.submitButton().click();
  }
}
