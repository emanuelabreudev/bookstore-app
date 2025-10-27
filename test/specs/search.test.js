const LoginPage = require("../pageobjects/login.page");
const ShopPage = require("../pageobjects/shop.page");
const assert = require("assert");

describe("BookStore - Testes de Busca de Produtos", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login("admin", "senha123");
    await browser.pause(2000);
  });

  it("✅ SUCESSO: Deve buscar produto por título", async () => {
    await ShopPage.search("Clean Code");

    const productCount = await ShopPage.getProductCount();
    assert.strictEqual(productCount, 1);

    const product = await ShopPage.getProductByTitle("Clean Code");
    assert.notStrictEqual(product, null);
  });

  it("✅ SUCESSO: Deve buscar produto por autor", async () => {
    await ShopPage.search("Martin Fowler");

    const productCount = await ShopPage.getProductCount();
    assert.strictEqual(productCount, 1);

    const product = await ShopPage.getProductByTitle("Refactoring");
    assert.notStrictEqual(product, null);
  });

  it("✅ SUCESSO: Deve buscar múltiplos produtos com termo genérico", async () => {
    await ShopPage.search("Martin");

    const productCount = await ShopPage.getProductCount();
    assert.ok(productCount >= 2);
  });

  it("❌ FALHA: Deve retornar zero produtos para busca inexistente", async () => {
    await ShopPage.search("Livro que não existe");

    const productCount = await ShopPage.getProductCount();
    assert.strictEqual(productCount, 0);
  });

  it("✅ SUCESSO: Deve mostrar todos produtos ao limpar busca", async () => {
    await ShopPage.search("Clean Code");
    let productCount = await ShopPage.getProductCount();
    assert.strictEqual(productCount, 1);

    await ShopPage.search("");
    productCount = await ShopPage.getProductCount();
    assert.strictEqual(productCount, 6);
  });

  it("✅ SUCESSO: Busca deve ser case-insensitive", async () => {
    await ShopPage.search("clean code");

    const productCount = await ShopPage.getProductCount();
    assert.strictEqual(productCount, 1);

    const product = await ShopPage.getProductByTitle("Clean Code");
    assert.notStrictEqual(product, null);
  });

  it("✅ SUCESSO: Deve exibir todos os produtos inicialmente", async () => {
    const productCount = await ShopPage.getProductCount();
    assert.strictEqual(productCount, 6);
  });

  it("✅ SUCESSO: Campo de busca deve estar visível", async () => {
    const isVisible = await ShopPage.searchInput.isDisplayed();
    assert.strictEqual(isVisible, true);
  });

  it("✅ SUCESSO: Botão de busca deve estar funcional", async () => {
    const isEnabled = await ShopPage.searchButton.isEnabled();
    assert.strictEqual(isEnabled, true);
  });

  it("✅ SUCESSO: Deve buscar por parte do título", async () => {
    await ShopPage.search("JavaScript");

    const productCount = await ShopPage.getProductCount();
    assert.strictEqual(productCount, 1);

    const product = await ShopPage.getProductByTitle(
      "JavaScript: The Good Parts"
    );
    assert.notStrictEqual(product, null);
  });
});
