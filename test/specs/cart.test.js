const LoginPage = require("../pageobjects/login.page");
await ShopPage.addProductToCart("Refactoring");
await ShopPage.addProductToCart("Test Driven Development");

const cartCount = await ShopPage.getCartItemCount();
assert.strictEqual(cartCount, 3);
it("Deve remover produto do carrinho", async () => {
  await ShopPage.clearCart();
  await ShopPage.addProductToCart("Clean Code");
  let isInCart = await ShopPage.isProductInCart("Clean Code");
  assert.strictEqual(isInCart, true);
  await ShopPage.removeProductFromCart("Clean Code");
  isInCart = await ShopPage.isProductInCart("Clean Code");
  assert.strictEqual(isInCart, false);
});

it("Deve calcular o total do carrinho corretamente", async () => {
  await ShopPage.clearCart();
  await ShopPage.addProductToCart("Clean Code"); // R$ 89.90
  await ShopPage.addProductToCart("Refactoring"); // R$ 95.00
  const totalText = await ShopPage.getCartTotalText();
  assert.ok(totalText.includes("184.90"));
});

it("Carrinho deve estar vazio inicialmente", async () => {
  await ShopPage.clearCart();
  const cartCount = await ShopPage.getCartItemCount();
  assert.strictEqual(cartCount, 0);
  const totalText = await ShopPage.getCartTotalText();
  assert.ok(totalText.includes("0,00") || totalText.includes("0.00"));
});

it("Não deve permitir finalizar compra com carrinho vazio", async () => {
  await ShopPage.clearCart();
  await ShopPage.checkout();
  const alertText = await ShopPage.getAlertText();
  assert.ok(alertText.toLowerCase().includes("carrinho vazio"));
  await ShopPage.acceptAlert();
});

it("Deve finalizar compra com sucesso", async () => {
  await ShopPage.clearCart();
  await ShopPage.addProductToCart("Clean Code");
  await ShopPage.addProductToCart("JavaScript: The Good Parts");
  await ShopPage.checkout();
  const alertText = await ShopPage.getAlertText();
  assert.ok(alertText.includes("Compra finalizada com sucesso"));
  await ShopPage.acceptAlert();
  const cartCount = await ShopPage.getCartItemCount();
  assert.strictEqual(cartCount, 0);
});

it("Deve adicionar o mesmo produto múltiplas vezes e manter quantidade", async () => {
  await ShopPage.clearCart();
  await ShopPage.addProductToCart("Clean Code");
  await browser.pause(200);
  await ShopPage.addProductToCart("Clean Code");
  const cartCount = await ShopPage.getCartItemCount(); // itens distintos
  const quantity = await ShopPage.getProductQuantityInCart("Clean Code");
  assert.strictEqual(cartCount, 1);
  assert.strictEqual(quantity, 2);
});

it("Total deve atualizar ao remover produtos", async () => {
  await ShopPage.clearCart();
  await ShopPage.addProductToCart("Clean Code");
  await ShopPage.addProductToCart("Refactoring");
  let totalText = await ShopPage.getCartTotalText();
  assert.ok(totalText.includes("184.90"));
  await ShopPage.removeProductFromCart("Clean Code");
  totalText = await ShopPage.getCartTotalText();
  assert.ok(totalText.includes("95.00") || totalText.includes("95,00"));
});
