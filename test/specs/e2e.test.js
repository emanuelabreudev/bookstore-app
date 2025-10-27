const LoginPage = require("../pageobjects/login.page");
const ShopPage = require("../pageobjects/shop.page");
const assert = require("assert");

describe("BookStore - Teste End-to-End Completo", () => {
  it("✅ SUCESSO: Fluxo completo - Login, Busca, Adicionar ao Carrinho e Finalizar Compra", async () => {
    // Passo 1: Abrir aplicação
    await LoginPage.open();
    await browser.pause(500);

    // Passo 2: Realizar login
    await LoginPage.login("admin", "senha123");
    const successMessage = await LoginPage.getSuccessMessageText();
    assert.ok(successMessage.includes("sucesso"));

    await browser.pause(2000);
    const isLoggedIn = await LoginPage.isLoggedIn();
    assert.strictEqual(isLoggedIn, true);

    // Passo 3: Verificar produtos exibidos
    const initialProductCount = await ShopPage.getProductCount();
    assert.strictEqual(initialProductCount, 6);

    // Passo 4: Buscar produto específico
    await ShopPage.search("Clean Code");
    const searchResultCount = await ShopPage.getProductCount();
    assert.strictEqual(searchResultCount, 1);

    // Passo 5: Adicionar produto ao carrinho
    await ShopPage.addProductToCart("Clean Code");
    let cartCount = await ShopPage.getCartItemCount();
    assert.strictEqual(cartCount, 1);

    // Passo 6: Limpar busca e adicionar mais produtos
    await ShopPage.search("");
    await browser.pause(500);

    await ShopPage.addProductToCart("Refactoring");
    await ShopPage.addProductToCart("Test Driven Development");

    cartCount = await ShopPage.getCartItemCount();
    assert.strictEqual(cartCount, 3);

    // Passo 7: Verificar total do carrinho
    const totalText = await ShopPage.getCartTotalText();
    // Clean Code (89.90) + Refactoring (95.00) + TDD (78.90) = 263.80
    assert.ok(totalText.includes("263,80"));

    // Passo 8: Remover um produto
    await ShopPage.removeProductFromCart("Refactoring");
    cartCount = await ShopPage.getCartItemCount();
    assert.strictEqual(cartCount, 2);

    // Passo 9: Finalizar compra
    await ShopPage.checkout();
    const alertText = await ShopPage.getAlertText();
    assert.ok(alertText.includes("Compra finalizada com sucesso"));
    assert.ok(alertText.includes("168,80")); // 89.90 + 78.90

    await ShopPage.acceptAlert();
    await browser.pause(500);

    // Passo 10: Verificar carrinho vazio após compra
    cartCount = await ShopPage.getCartItemCount();
    assert.strictEqual(cartCount, 0);

    const finalTotal = await ShopPage.getCartTotalText();
    assert.ok(finalTotal.includes("0,00"));
  });

  it("❌ FALHA: Fluxo com erro - Tentativa de compra sem login", async () => {
    // Tentar acessar diretamente sem login
    await LoginPage.open();

    const isLoginVisible = await LoginPage.loginSection.isDisplayed();
    assert.strictEqual(isLoginVisible, true);

    const isMainContentVisible = await LoginPage.mainContent.isDisplayed();
    assert.strictEqual(isMainContentVisible, false);
  });

  it("❌ FALHA: Fluxo com erro - Login incorreto e correção", async () => {
    await LoginPage.open();

    // Tentativa com credenciais erradas
    await LoginPage.login("admin", "senhaerrada");
    const errorMessage = await LoginPage.getErrorMessageText();
    assert.ok(errorMessage.includes("inválidos"));

    // Correção e login bem-sucedido
    await LoginPage.login("admin", "senha123");
    await browser.pause(2000);

    const isLoggedIn = await LoginPage.isLoggedIn();
    assert.strictEqual(isLoggedIn, true);
  });

  it("✅ SUCESSO: Fluxo de busca e adição múltipla do mesmo produto", async () => {
    await LoginPage.open();
    await LoginPage.login("admin", "senha123");
    await browser.pause(2000);

    // Buscar produto
    await ShopPage.search("JavaScript");
    const productCount = await ShopPage.getProductCount();
    assert.strictEqual(productCount, 1);

    // Adicionar o mesmo produto 3 vezes
    await ShopPage.addProductToCart("JavaScript: The Good Parts");
    await browser.pause(300);
    await ShopPage.addProductToCart("JavaScript: The Good Parts");
    await browser.pause(300);
    await ShopPage.addProductToCart("JavaScript: The Good Parts");

    // Deve ter apenas 1 item no carrinho (mesmo produto)
    const cartCount = await ShopPage.getCartItemCount();
    assert.strictEqual(cartCount, 1);

    // Mas com valor multiplicado (65.50 * 3 = 196.50)
    const totalText = await ShopPage.getCartTotalText();
    assert.ok(totalText.includes("196,50"));
  });

  it("✅ SUCESSO: Fluxo de navegação completa pelos produtos", async () => {
    await LoginPage.open();
    await LoginPage.login("admin", "senha123");
    await browser.pause(2000);

    // Verificar todos os produtos
    const allProducts = await ShopPage.getAllProducts();
    assert.strictEqual(allProducts.length, 6);

    // Buscar por diferentes termos
    await ShopPage.search("Martin");
    let searchCount = await ShopPage.getProductCount();
    assert.ok(searchCount >= 2);

    await ShopPage.search("Test");
    searchCount = await ShopPage.getProductCount();
    assert.ok(searchCount >= 1);

    // Voltar a mostrar todos
    await ShopPage.search("");
    const finalCount = await ShopPage.getProductCount();
    assert.strictEqual(finalCount, 6);
  });
});
