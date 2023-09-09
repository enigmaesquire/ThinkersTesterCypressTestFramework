export class MainPage {
    constructor(url, title) {
      this.url = url;
      this.title = title;
    }
  
    validateElementDisplayed(element) {
      element.should("be.visible");
    }
    validateElementNotDisplayed(element) {
        element.should("not.be.visible");
      }
  }
  