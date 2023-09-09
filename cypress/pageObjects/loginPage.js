import { MainPage } from "./mainPage";

export class LoginPage extends MainPage {
  constructor() {
    super("/", "Contact List App");
  }
  emailTextbox() {
    return cy.get("#email");
  }

  passwordTextbox() {
    return cy.get("#password");
  }

  submitButton() {
    return cy.get("#submit");
  }

  signUpButton() {
    return cy.get("#signup");
  }

  apiLink() {
    return cy.get("a");
  }

  loginValidationError() {
    return cy.get("#error");
  }
  loginToContactList(email, password) {
    this.emailTextbox().clear().click().type(email);
    this.passwordTextbox().clear().click().type(password);
    this.submitButton().click();
  }
}
