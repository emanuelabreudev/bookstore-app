const LoginPage = require("../pageobjects/login.page");
const ShopPage = require("../pageobjects/shop.page");
const assert = require("assert");

describe("BookStore - Testes de Produtos", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login("admin", "senha123");
    await browser.pause(2000);
  });

  it("✅ SUCESSO: Deve exibir informações do produto corretamente", async () => {
    const product = await ShopPage.getProductByTitle("Clean Code");
    assert.notStrictEqual(product, null);

    const author = await product.$(".author");
    const authorText = await author.getText();
    assert.strictEqual(authorText, "Robert C. Martin");

    const price = await product.$(".price");
    const priceText = await price.getText();
    assert.ok(priceText.includes("89,90"));
  });

  it("✅ SUCESSO: Produto com estoque deve ter botão habilitado", async () => {
    const product = await ShopPage.getProductByTitle("Clean Code");
    const button = await product.$("button");

    const isEnabled = await button.isEnabled();
    assert.strictEqual(isEnabled, true);

    const buttonText = await button.getText();
    assert.strictEqual(buttonText, "Adicionar ao Carrinho");
  });

  it("❌ FALHA: Produto sem estoque deve ter botão desabilitado", async () => {
    const product = await ShopPage.getProductByTitle("Design Patterns");
    const button = await product.$("button");

    const isEnabled = await button.isEnabled();
    assert.strictEqual(isEnabled, false);

    const buttonText = await button.getText();
    assert.strictEqual(buttonText, "Indisponível");
  });

  it('✅ SUCESSO: Produto sem estoque deve mostrar mensagem "Esgotado"', async () => {
    const product = await ShopPage.getProductByTitle("Design Patterns");
    const stockInfo = await product.$(".stock");

    const stockText = await stockInfo.getText();
    assert.strictEqual(stockText, "Esgotado");

    const hasClass = await stockInfo.getAttribute("class");
    assert.ok(hasClass.includes("out-of-stock"));
  });

  it("✅ SUCESSO: Todos os produtos devem ter ícones", async () => {
    const products = await ShopPage.getAllProducts();

    for (const product of products) {
      const icon = await product.$(".book-icon");
      const isDisplayed = await icon.isDisplayed();
      assert.strictEqual(isDisplayed, true);
    }
  });

  it("✅ SUCESSO: Todos os produtos devem ter preços", async () => {
    const products = await ShopPage.getAllProducts();

    for (const product of products) {
      const price = await product.$(".price");
      const priceText = await price.getText();
      assert.ok(priceText.includes("R$"));
    }
  });

  it("✅ SUCESSO: Deve exibir a quantidade correta de produtos", async () => {
    const productCount = await ShopPage.getProductCount();
    assert.strictEqual(productCount, 6);
  });

  it("✅ SUCESSO: Produtos devem ter informação de estoque", async () => {
    const product = await ShopPage.getProductByTitle("Refactoring");
    const stockInfo = await product.$(".stock");

    const stockText = await stockInfo.getText();
    assert.ok(
      stockText.includes("Em estoque") || stockText.includes("Esgotado")
    );
  });

  it("✅ SUCESSO: Card do produto deve ter todas as informações", async () => {
    const product = await ShopPage.getProductByTitle("Test Driven Development");

    const title = await product.$("h3");
    const author = await product.$(".author");
    const price = await product.$(".price");
    const stock = await product.$(".stock");
    const button = await product.$("button");

    assert.ok(await title.isDisplayed());
    assert.ok(await author.isDisplayed());
    assert.ok(await price.isDisplayed());
    assert.ok(await stock.isDisplayed());
    assert.ok(await button.isDisplayed());
  });

  it("✅ SUCESSO: Preços devem estar formatados corretamente", async () => {
    const products = await ShopPage.getAllProducts();

    for (const product of products) {
      const price = await product.$(".price");
      const priceText = await price.getText();

      const priceRegex = /R\$\s*\d+[,\.]\d{2}/;
      assert.ok(priceRegex.test(priceText));
    }
  });
});
