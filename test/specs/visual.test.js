const LoginPage = require("../pageobjects/login.page");
const ShopPage = require("../pageobjects/shop.page");

describe("BookStore - Testes Visuais de Regressão", () => {
  describe("Testes Visuais - Página de Login", () => {
    beforeEach(async () => {
      await LoginPage.open();
      await browser.pause(1000);
    });

    it("✅ VISUAL: Deve capturar tela completa da página de login", async () => {
      // Captura a página completa de login
      await browser.saveFullPageScreen("login-page-full", {
        fullPageScrollTimeout: 3000,
      });

      // Comparação visual - na primeira execução cria baseline
      const result = await browser.checkFullPageScreen("login-page-full", {
        fullPageScrollTimeout: 3000,
      });

      console.log(`📊 Diferença visual: ${result}%`);
    });

    it("✅ VISUAL: Deve capturar apenas a viewport da página de login", async () => {
      // Captura apenas a viewport visível
      await browser.saveScreen("login-viewport");

      // Comparação
      const result = await browser.checkScreen("login-viewport");
      console.log(`📊 Diferença visual viewport: ${result}%`);
    });

    it("✅ VISUAL: Deve capturar o formulário de login isoladamente", async () => {
      const loginForm = await $("#login-section");

      // Salvar elemento específico
      await browser.saveElement(loginForm, "login-form-element");

      // Comparar elemento
      const result = await browser.checkElement(
        loginForm,
        "login-form-element"
      );

      console.log(`📊 Diferença visual do formulário: ${result}%`);
    });

    it("✅ VISUAL: Deve capturar estado de erro no login", async () => {
      // Provocar erro de login
      await LoginPage.login("invalid", "wrong");
      await browser.pause(500);

      // Capturar tela com mensagem de erro
      await browser.saveScreen("login-error-state");

      const result = await browser.checkScreen("login-error-state");
      console.log(`📊 Diferença visual com erro: ${result}%`);
    });

    it("✅ VISUAL: Deve capturar botão de login com hover", async () => {
      const loginButton = await LoginPage.btnLogin;

      // Mover mouse para o botão (hover)
      await loginButton.moveTo();
      await browser.pause(300);

      // Capturar estado hover
      await browser.saveElement(loginButton, "login-button-hover");

      const result = await browser.checkElement(
        loginButton,
        "login-button-hover"
      );

      console.log(`📊 Diferença visual hover: ${result}%`);
    });
  });

  describe("Testes Visuais - Loja de Produtos", () => {
    beforeEach(async () => {
      await LoginPage.open();
      await LoginPage.login("admin", "senha123");
      await browser.pause(2000);
    });

    it("✅ VISUAL: Deve capturar página completa da loja", async () => {
      // Página completa com scroll
      await browser.saveFullPageScreen("shop-full-page", {
        fullPageScrollTimeout: 3000,
      });

      const result = await browser.checkFullPageScreen("shop-full-page", {
        fullPageScrollTimeout: 3000,
      });

      console.log(`📊 Diferença visual loja: ${result}%`);
    });

    it("✅ VISUAL: Deve capturar grid de produtos", async () => {
      const productsGrid = await $("#products");

      await browser.saveElement(productsGrid, "products-grid");

      const result = await browser.checkElement(productsGrid, "products-grid");

      console.log(`📊 Diferença visual produtos: ${result}%`);
    });

    it("✅ VISUAL: Deve capturar card individual de produto", async () => {
      const firstProduct = await ShopPage.getProductByTitle("Clean Code");

      await browser.saveElement(firstProduct, "product-card-clean-code");

      const result = await browser.checkElement(
        firstProduct,
        "product-card-clean-code"
      );

      console.log(`📊 Diferença visual card: ${result}%`);
    });

    it("✅ VISUAL: Deve capturar produto sem estoque", async () => {
      const outOfStock = await ShopPage.getProductByTitle("Design Patterns");

      await browser.saveElement(outOfStock, "product-out-of-stock");

      const result = await browser.checkElement(
        outOfStock,
        "product-out-of-stock"
      );

      console.log(`📊 Diferença visual sem estoque: ${result}%`);
    });

    it("✅ VISUAL: Deve capturar barra de busca", async () => {
      const searchSection = await $(".search-section");

      await browser.saveElement(searchSection, "search-bar");

      const result = await browser.checkElement(searchSection, "search-bar");

      console.log(`📊 Diferença visual busca: ${result}%`);
    });
  });

  describe("Testes Visuais - Carrinho de Compras", () => {
    beforeEach(async () => {
      await LoginPage.open();
      await LoginPage.login("admin", "senha123");
      await browser.pause(2000);
    });

    it("✅ VISUAL: Deve capturar carrinho vazio", async () => {
      const cartSection = await $(".cart-section");

      await browser.saveElement(cartSection, "cart-empty");

      const result = await browser.checkElement(cartSection, "cart-empty");

      console.log(`📊 Diferença visual carrinho vazio: ${result}%`);
    });

    it("✅ VISUAL: Deve capturar carrinho com produtos", async () => {
      // Adicionar produtos
      await ShopPage.addProductToCart("Clean Code");
      await ShopPage.addProductToCart("Refactoring");
      await browser.pause(500);

      const cartSection = await $(".cart-section");

      await browser.saveElement(cartSection, "cart-with-products");

      const result = await browser.checkElement(
        cartSection,
        "cart-with-products"
      );

      console.log(`📊 Diferença visual carrinho cheio: ${result}%`);
    });

    it("✅ VISUAL: Deve capturar item individual no carrinho", async () => {
      await ShopPage.addProductToCart("Clean Code");
      await browser.pause(500);

      const cartItem = await $(".cart-item");

      await browser.saveElement(cartItem, "cart-item-single");

      const result = await browser.checkElement(cartItem, "cart-item-single");

      console.log(`📊 Diferença visual item: ${result}%`);
    });

    it("✅ VISUAL: Deve capturar total do carrinho", async () => {
      await ShopPage.addProductToCart("Clean Code");
      await ShopPage.addProductToCart("JavaScript: The Good Parts");
      await browser.pause(500);

      const cartTotal = await $("#cart-total");

      await browser.saveElement(cartTotal, "cart-total-display");

      const result = await browser.checkElement(
        cartTotal,
        "cart-total-display"
      );

      console.log(`📊 Diferença visual total: ${result}%`);
    });
  });

  describe("Testes Visuais - Resultados de Busca", () => {
    beforeEach(async () => {
      await LoginPage.open();
      await LoginPage.login("admin", "senha123");
      await browser.pause(2000);
    });

    it("✅ VISUAL: Deve capturar resultado de busca com 1 produto", async () => {
      await ShopPage.search("Clean Code");
      await browser.pause(500);

      const productsGrid = await $("#products");

      await browser.saveElement(productsGrid, "search-result-single");

      const result = await browser.checkElement(
        productsGrid,
        "search-result-single"
      );

      console.log(`📊 Diferença visual busca única: ${result}%`);
    });

    it("✅ VISUAL: Deve capturar resultado de busca sem produtos", async () => {
      await ShopPage.search("Livro Inexistente");
      await browser.pause(500);

      const productsGrid = await $("#products");

      await browser.saveElement(productsGrid, "search-no-results");

      const result = await browser.checkElement(
        productsGrid,
        "search-no-results"
      );

      console.log(`📊 Diferença visual sem resultados: ${result}%`);
    });

    it("✅ VISUAL: Deve capturar campo de busca preenchido", async () => {
      const searchInput = await ShopPage.searchInput;
      await searchInput.setValue("JavaScript");
      await browser.pause(300);

      await browser.saveElement(searchInput, "search-input-filled");

      const result = await browser.checkElement(
        searchInput,
        "search-input-filled"
      );

      console.log(`📊 Diferença visual input preenchido: ${result}%`);
    });
  });

  describe("Testes Visuais - Estados Interativos", () => {
    beforeEach(async () => {
      await LoginPage.open();
      await LoginPage.login("admin", "senha123");
      await browser.pause(2000);
    });

    it("✅ VISUAL: Deve capturar hover em produto", async () => {
      const product = await ShopPage.getProductByTitle("Clean Code");

      // Mover mouse para o produto
      await product.moveTo();
      await browser.pause(300);

      await browser.saveElement(product, "product-hover-state");

      const result = await browser.checkElement(product, "product-hover-state");

      console.log(`📊 Diferença visual hover produto: ${result}%`);
    });

    it("✅ VISUAL: Deve capturar botão de checkout", async () => {
      await ShopPage.addProductToCart("Clean Code");
      await browser.pause(500);

      const checkoutBtn = await $("#checkout-btn");

      await browser.saveElement(checkoutBtn, "checkout-button");

      const result = await browser.checkElement(checkoutBtn, "checkout-button");

      console.log(`📊 Diferença visual checkout: ${result}%`);
    });

    it("✅ VISUAL: Deve capturar botão de remover do carrinho", async () => {
      await ShopPage.addProductToCart("Clean Code");
      await browser.pause(500);

      const removeBtn = await $(".remove-btn");

      await browser.saveElement(removeBtn, "remove-button");

      const result = await browser.checkElement(removeBtn, "remove-button");

      console.log(`📊 Diferença visual remover: ${result}%`);
    });
  });

  describe("Testes Visuais - Responsividade", () => {
    it("✅ VISUAL: Deve capturar layout mobile (375x667)", async () => {
      // Definir viewport mobile
      await browser.setWindowSize(375, 667);
      await LoginPage.open();
      await browser.pause(1000);

      await browser.saveFullPageScreen("mobile-login-page");

      const result = await browser.checkFullPageScreen("mobile-login-page");
      console.log(`📊 Diferença visual mobile: ${result}%`);
    });

    it("✅ VISUAL: Deve capturar layout tablet (768x1024)", async () => {
      await browser.setWindowSize(768, 1024);
      await LoginPage.open();
      await LoginPage.login("admin", "senha123");
      await browser.pause(2000);

      await browser.saveFullPageScreen("tablet-shop-page");

      const result = await browser.checkFullPageScreen("tablet-shop-page");
      console.log(`📊 Diferença visual tablet: ${result}%`);
    });

    it("✅ VISUAL: Deve capturar layout desktop (1920x1080)", async () => {
      await browser.setWindowSize(1920, 1080);
      await LoginPage.open();
      await LoginPage.login("admin", "senha123");
      await browser.pause(2000);

      await browser.saveFullPageScreen("desktop-shop-page");

      const result = await browser.checkFullPageScreen("desktop-shop-page");
      console.log(`📊 Diferença visual desktop: ${result}%`);
    });
  });

  describe("Testes Visuais - Usando Matchers", () => {
    beforeEach(async () => {
      await LoginPage.open();
      await LoginPage.login("admin", "senha123");
      await browser.pause(2000);
    });

    it("✅ VISUAL: Usar matcher para comparar tela completa", async () => {
      // Usando matcher - deve ter 0% de diferença
      await expect(browser).toMatchFullPageSnapshot("shop-page-matcher");
    });

    it("✅ VISUAL: Usar matcher com tolerância de 5%", async () => {
      const productsGrid = await $("#products");

      // Permite até 5% de diferença
      await expect(productsGrid).toMatchElementSnapshot(
        "products-grid-tolerance",
        5
      );
    });

    it("✅ VISUAL: Usar matcher para viewport", async () => {
      await expect(browser).toMatchScreenSnapshot("shop-viewport-matcher");
    });

    it("✅ VISUAL: Comparar elemento específico com matcher", async () => {
      const cartSection = await $(".cart-section");

      await expect(cartSection).toMatchElementSnapshot("cart-section-matcher");
    });
  });
});
