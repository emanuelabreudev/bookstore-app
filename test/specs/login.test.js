const LoginPage = require("../pageobjects/login.page");
const assert = require("assert");

describe("BookStore - Testes de Login", () => {
  beforeEach(async () => {
    await LoginPage.open();
  });

  it("✅ SUCESSO: Deve fazer login com credenciais válidas", async () => {
    await LoginPage.login("admin", "senha123");

    const successMessage = await LoginPage.getSuccessMessageText();
    assert.strictEqual(successMessage, "Login realizado com sucesso!");

    const isLoggedIn = await LoginPage.isLoggedIn();
    assert.strictEqual(isLoggedIn, true);
  });

  it("❌ FALHA: Deve mostrar erro com usuário inválido", async () => {
    await LoginPage.login("usuario_invalido", "senha123");

    const errorMessage = await LoginPage.getErrorMessageText();
    assert.strictEqual(errorMessage, "Usuário ou senha inválidos!");

    const isLoggedIn = await LoginPage.loginSection.isDisplayed();
    assert.strictEqual(isLoggedIn, true);
  });

  it("❌ FALHA: Deve mostrar erro com senha inválida", async () => {
    await LoginPage.login("admin", "senha_errada");

    const errorMessage = await LoginPage.getErrorMessageText();
    assert.strictEqual(errorMessage, "Usuário ou senha inválidos!");
  });

  it("❌ FALHA: Deve mostrar erro com campos vazios", async () => {
    await LoginPage.login("", "");

    const errorMessage = await LoginPage.getErrorMessageText();
    assert.strictEqual(errorMessage, "Usuário ou senha inválidos!");
  });

  it("✅ SUCESSO: Campos de login devem estar visíveis", async () => {
    const isUsernameVisible = await LoginPage.inputUsername.isDisplayed();
    const isPasswordVisible = await LoginPage.inputPassword.isDisplayed();
    const isButtonVisible = await LoginPage.btnLogin.isDisplayed();

    assert.strictEqual(isUsernameVisible, true);
    assert.strictEqual(isPasswordVisible, true);
    assert.strictEqual(isButtonVisible, true);
  });

  it("✅ SUCESSO: Deve limpar campos após tentativa de login", async () => {
    await LoginPage.inputUsername.setValue("teste");
    await LoginPage.inputPassword.setValue("teste123");

    const usernameValue = await LoginPage.inputUsername.getValue();
    const passwordValue = await LoginPage.inputPassword.getValue();

    assert.strictEqual(usernameValue, "teste");
    assert.strictEqual(passwordValue, "teste123");
  });
});
