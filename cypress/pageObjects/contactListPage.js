import { MainPage } from "./mainPage";

export class ContactListPage extends MainPage {

  constructor(){
    super("/contactList","My Contacts")
      }
  emailTextbox() {
    return cy.get("#email");
  }

  logoutButton() {
    return cy.get("#password");
  }

  addNewContactButton() {
    return cy.get("#submit");
  }

}
