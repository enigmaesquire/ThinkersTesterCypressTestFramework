/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
//need to add one change
beforeEach(() => {
  cy.getAPIToken();
});

describe("API", () => {
  it("Get user profile", () => {
    cy.getAPIToken();
    cy.request({
      method: "GET",
      url: "/users/me",
      headers: {
        Authorization: `Bearer ${Cypress.config("userToken")}`,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      const responseBodyJSON = JSON.stringify(response.body, null, 2);
      cy.log("Response Body:", responseBodyJSON);
    });
  });

  it("Add new user ", () => {
    const newUserDetails = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: "myPassword",
    };
    cy.getAPIToken();
    cy.request({
      method: "POST",
      url: "/users",
      headers: {
        Authorization: `Bearer ${Cypress.config("userToken")}`,
      },
      body: newUserDetails,
    }).then((response) => {
      expect(response.status).to.equal(201);
      const responseBodyJSON = JSON.stringify(response.body, null, 2);
      cy.log("Response Body:", responseBodyJSON);
    });
  });
});
