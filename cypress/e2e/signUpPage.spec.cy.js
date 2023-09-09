import { SignUpPage } from "../pageObjects/signUpPage";
import { ContactListPage } from "../pageObjects/contactListPage";
import { LoginPage } from "../pageObjects/loginPage";
import { faker } from "@faker-js/faker";

/// <reference types="cypress" />
const signUpPage = new SignUpPage();
const loginPage = new LoginPage();
const contactListPage = new ContactListPage();

beforeEach(() => {
  cy.visit("/addUser");
});
describe("Check default page layout of signUp page ", () => {
  it("Confirming default page elements appear when immediately landing on sign up page", () => {
    signUpPage.validateElementDisplayed(signUpPage.firstNameTextbox());
    signUpPage.validateElementDisplayed(signUpPage.lastNameTextbox());
    signUpPage.validateElementDisplayed(signUpPage.emailTextbox());
    signUpPage.validateElementDisplayed(signUpPage.passwordTextbox());
    signUpPage.validateElementDisplayed(signUpPage.submitButton());
    signUpPage.validateElementDisplayed(signUpPage.cancelButton());
  });
});
describe("Successfully add a new User", () => {
  it("Fill in all mandatory fields and click submit button ", () => {
    const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const emailAddress = faker.internet.email();
const userPassword = faker.internet.password();
    signUpPage.addNewUser(firstName, lastName,emailAddress, userPassword);
    cy.title().should("eq", contactListPage.title);
    cy.request({
      method: "POST",
      url:`/users/login`,
      body: {
      email: emailAddress, 
      password: userPassword, 
  },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("token");

      let userToken = response.body.token;

      cy.request({
        method: "DELETE",
        url: '/users/me', 
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        cy.log("User deleted successfully.");
      });
    });

  });
});

describe("Negative Signup page tests ", () => {
  it("Validation error message when filling all of the mandatory fields except first name and clicking submit", () => {
    signUpPage.addNewUser(
      " ",
      faker.person.lastName(),
      faker.internet.email(),
      "Qwertyuiop"
    );
    signUpPage.validateElementDisplayed(signUpPage.validationError());
    signUpPage
      .validationError()
      .should(
        "have.text",
        "User validation failed: firstName: Path `firstName` is required."
      );
  });

  it("Validation error message when filling all of the mandatory fields except last name and clicking submit", () => {
    signUpPage.addNewUser(
      faker.person.firstName(),
      " ",
      faker.internet.email(),
      "Qwertyuiop"
    );
    signUpPage.validateElementDisplayed(signUpPage.validationError());
    signUpPage
      .validationError()
      .should(
        "have.text",
        "User validation failed: lastName: Path `lastName` is required."
      );
  });

  it("Validation error message when filling all of the mandatory fields except email address and clicking submit", () => {
    signUpPage.addNewUser(
      faker.person.firstName(),
      faker.person.lastName(),
      " ",
      "Qwertyuiop"
    );

    signUpPage.validateElementDisplayed(signUpPage.validationError());
    signUpPage
      .validationError()
      .should("have.text", "User validation failed: email: Email is invalid");
  });

  it("Validation error message when filling all of the mandatory fields except password and clicking submit", () => {
    signUpPage.addNewUser(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.internet.email(),
      " "
    );
    signUpPage.validateElementDisplayed(signUpPage.validationError());
    signUpPage
      .validationError()
      .should(
        "have.text",
        "User validation failed: password: Path `password` is required."
      );
  });
});

describe("Return to Login Page", () => {
  it("Click on cancel button and verify title of page is Contact List App", () => {
    signUpPage.cancelButton().click();
    cy.title().should("eq", loginPage.title);
  });
});
