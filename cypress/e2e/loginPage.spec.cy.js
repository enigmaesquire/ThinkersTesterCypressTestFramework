import { LoginPage } from "../pageObjects/loginPage";
import { SignUpPage } from "../pageObjects/signUpPage";
import { ContactListPage } from "../pageObjects/contactListPage";
import { ApiLinkPage } from "../pageObjects/apiLinkPage";

/// <reference types="cypress" />
const loginPage = new LoginPage();
const signUpPage = new SignUpPage();
const contactListPage = new ContactListPage();
const apiLinkPage = new ApiLinkPage();
let users;

beforeEach(() => {
  cy.visit("/");
});
describe("Check default page layout of Login page ", () => {
  it("Confirming default page elements appear when immediately landing on login page", () => {
    loginPage.validateElementDisplayed(loginPage.emailTextbox());
    loginPage.validateElementDisplayed(loginPage.passwordTextbox());
    loginPage.validateElementDisplayed(loginPage.submitButton());
    loginPage.validateElementDisplayed(loginPage.signUpButton());
    loginPage.validateElementDisplayed(loginPage.apiLink());
    loginPage.validateElementDisplayed(loginPage.emailTextbox());
  });
});
describe("Login successfully to Contact List page", () => {
  it("Enter valid Username and Password and verify title of page is Contact List", () => {
    cy.fixture("validUser.json").then((data) => {
      users = data;

      const validUser = users.validUser;
      loginPage.loginToContactList(validUser.username, validUser.password);
      cy.title().should("eq", contactListPage.title);
    });
  });
});

describe("Negative Login page ", () => {
  it("Validation error message displayed when logging in with invalid credentials", () => {
    cy.fixture("invalidUser.json").then((data) => {
      users = data;

      const invalidUser = users.invalidUser;
      loginPage.loginToContactList(invalidUser.username, invalidUser.password);
      loginPage.validateElementDisplayed(loginPage.loginValidationError());
    });
  });

  it("Validation error message is not displayed when immediately landing on login page", () => {
    loginPage.validateElementNotDisplayed(loginPage.loginValidationError());
  });
});

describe("Access the Signup Page from login page", () => {
  it("Click signup page button and verify title of page is Add User", () => {
    loginPage.signUpButton().click();
    cy.title().should("eq", signUpPage.title);
  });
  /* it("Click api hyperlink and verify title of page is Contact List Documentation", () => {
    loginPage.apiLink().click();
    cy.url().should("eq", apiLinkPage.url);
  }); */
});
