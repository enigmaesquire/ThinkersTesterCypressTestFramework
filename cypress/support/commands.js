// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add("getAPIToken", () => {
    let user
    cy.fixture("validUser.json").then((data) => {
        user = data
        const validUser = user.validUser;
        const userCredentials = {
            email: validUser.username, 
            password: validUser.password, 
        }

      cy.request({
        method: "POST",
        url:`/users/login`,
        body: userCredentials,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("token");
  
        Cypress.config("userToken", response.body.token);
      });
    });
  });
  