class LoginPage {
  get inputUsername() {
    return $("#username");
  }

  get inputPassword() {
    return $("#password");
  }

  get btnLogin() {
    return $("#login-btn");
  }

  get errorMessage() {
    return $("#login-error");
  }

  get successMessage() {
    return $("#login-success");
  }

  get loginSection() {
    return $("#login-section");
  }

  get mainContent() {
    return $("#main-content");
  }

  async open() {
    await browser.url("/index.html");
  }

  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnLogin.click();
  }

  async getErrorMessageText() {
    await this.errorMessage.waitForDisplayed({ timeout: 3000 });
    return await this.errorMessage.getText();
  }

  async getSuccessMessageText() {
    await this.successMessage.waitForDisplayed({ timeout: 3000 });
    return await this.successMessage.getText();
  }

  async isLoggedIn() {
    await browser.pause(1500);
    return await this.mainContent.isDisplayed();
  }
}

module.exports = new LoginPage();
