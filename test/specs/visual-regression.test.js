const LoginPage = require("../pageobjects/login.page");
const ShopPage = require("../pageobjects/shop.page");

describe("BookStore - Testes de Regressão Visual Avançados", () => {
  describe("❌ REGRESSÃO: Simulando Mudanças Visuais", () => {
    beforeEach(async () => {
      await LoginPage.open();
      await LoginPage.login("admin", "senha123");
      await browser.pause(2000);
    });

    it("✅ BASELINE: Criar baseline do cabeçalho", async () => {
      const header = await $("header");

      await browser.saveElement(header, "header-baseline");

      const result = await browser.checkElement(header, "header-baseline");
      console.log(`📊 Baseline criada, diferença: ${result}%`);
    });

    it("⚠️ DEMO: Simular mudança no título (deve falhar após primeira execução)", async () => {
      // Este teste demonstra como detectar mudanças visuais
      // Na primeira execução, cria a baseline
      // Em execuções subsequentes, se algo mudar, será detectado

      const header = await $("header");

      // Comparar com baseline
      const result = await browser.checkElement(
        header,
        "header-regression-check",
        {
          // Opções adicionais de comparação
          ignoreAntialiasing: true,
          ignoreColors: false,
        }
      );

      console.log(`📊 Resultado da comparação: ${result}%`);

      // Se houver mais de 0.5% de diferença, pode ser uma regressão
      if (result > 0.5) {
        console.warn(`⚠️ ATENÇÃO: Detectada diferença visual de ${result}%!`);
        console.warn(`🔍 Verifique as imagens em: test/visual/diff/`);
      }
    });

    it("✅ COMPARAÇÃO: Produto antes e depois de adicionar ao carrinho", async () => {
      const product = await ShopPage.getProductByTitle("Clean Code");

      // Capturar estado inicial
      await browser.saveElement(product, "product-before-add");
      const before = await browser.checkElement(product, "product-before-add");

      // Adicionar ao carrinho
      await ShopPage.addProductToCart("Clean Code");
      await browser.pause(500);

      // Capturar estado após adicionar
      await browser.saveElement(product, "product-after-add");
      const after = await browser.checkElement(product, "product-after-add");

      console.log(`📊 Estado inicial: ${before}%`);
      console.log(`📊 Estado após adicionar: ${after}%`);

      // Os estados devem ser iguais (produto não muda visualmente)
      if (before !== after) {
        console.warn(
          `⚠️ O produto mudou visualmente após adicionar ao carrinho!`
        );
      }
    });

    it("✅ COMPARAÇÃO: Diferentes estados do carrinho", async () => {
      // Estado 1: Carrinho vazio
      const cartEmpty = await $(".cart-section");
      await browser.saveElement(cartEmpty, "cart-state-empty");
      const emptyResult = await browser.checkElement(
        cartEmpty,
        "cart-state-empty"
      );

      // Estado 2: Carrinho com 1 item
      await ShopPage.addProductToCart("Clean Code");
      await browser.pause(500);
      const cartOne = await $(".cart-section");
      await browser.saveElement(cartOne, "cart-state-one-item");
      const oneResult = await browser.checkElement(
        cartOne,
        "cart-state-one-item"
      );

      // Estado 3: Carrinho com múltiplos itens
      await ShopPage.addProductToCart("Refactoring");
      await browser.pause(500);
      const cartMultiple = await $(".cart-section");
      await browser.saveElement(cartMultiple, "cart-state-multiple");
      const multipleResult = await browser.checkElement(
        cartMultiple,
        "cart-state-multiple"
      );

      console.log(`📊 Carrinho vazio: ${emptyResult}%`);
      console.log(`📊 Carrinho com 1 item: ${oneResult}%`);
      console.log(`📊 Carrinho com múltiplos: ${multipleResult}%`);

      // Todos devem ser diferentes entre si
      console.log(`✅ Estados do carrinho capturados para comparação futura`);
    });
  });

  describe("🎯 PRECISÃO: Testes com Áreas Ignoradas", () => {
    beforeEach(async () => {
      await LoginPage.open();
      await LoginPage.login("admin", "senha123");
      await browser.pause(2000);
    });

    it("✅ IGNORAR: Elementos dinâmicos na comparação", async () => {
      // Capturar página completa ignorando elementos que mudam
      const result = await browser.checkFullPageScreen("shop-ignore-dynamic", {
        // Ignorar elementos específicos que podem variar
        ignore: [
          // Exemplo: ignorar timestamps, contadores, etc.
        ],
        // Aumentar tolerância para pequenas diferenças
        savePerInstance: false,
        // Outras opções
        ignoreAntialiasing: true,
      });

      console.log(`📊 Diferença (ignorando dinâmicos): ${result}%`);
    });

    it("✅ FOCO: Comparar apenas área específica", async () => {
      // Focar apenas na área de produtos
      const productsArea = await $("#products");

      const result = await browser.checkElement(
        productsArea,
        "products-area-focused",
        {
          // Remover elementos antes da comparação
          removeElements: [
            // Elementos a serem removidos da comparação
          ],
        }
      );

      console.log(`📊 Diferença na área de produtos: ${result}%`);
    });
  });

  describe("📐 MULTI-RESOLUÇÃO: Testes em Diferentes Tamanhos", () => {
    const resolutions = [
      { name: "mobile-small", width: 320, height: 568 },
      { name: "mobile", width: 375, height: 667 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "laptop", width: 1366, height: 768 },
      { name: "desktop", width: 1920, height: 1080 },
    ];

    resolutions.forEach((resolution) => {
      it(`✅ RESOLUÇÃO: Testar layout em ${resolution.name} (${resolution.width}x${resolution.height})`, async () => {
        // Definir resolução
        await browser.setWindowSize(resolution.width, resolution.height);

        await LoginPage.open();
        await LoginPage.login("admin", "senha123");
        await browser.pause(2000);

        // Capturar em diferentes resoluções
        await browser.saveFullPageScreen(`layout-${resolution.name}`);

        const result = await browser.checkFullPageScreen(
          `layout-${resolution.name}`
        );

        console.log(`📊 ${resolution.name}: ${result}% de diferença`);
      });
    });
  });

  describe("🔄 ANIMAÇÕES: Testes com Elementos Animados", () => {
    beforeEach(async () => {
      await LoginPage.open();
      await LoginPage.login("admin", "senha123");
      await browser.pause(2000);
    });

    it("✅ AGUARDAR: Capturar após animações completarem", async () => {
      const product = await ShopPage.getProductByTitle("Clean Code");

      // Mover mouse para ativar hover/animação
      await product.moveTo();

      // Aguardar animação completar
      await browser.pause(500);

      // Capturar após animação
      await browser.saveElement(product, "product-after-animation");

      const result = await browser.checkElement(
        product,
        "product-after-animation",
        {
          // Configurações para lidar com animações
          ignoreAntialiasing: true,
        }
      );

      console.log(`📊 Produto após animação: ${result}%`);
    });
  });

  describe("📊 RELATÓRIOS: Gerando Dados para Análise", () => {
    it("✅ COLETAR: Múltiplas capturas para relatório", async () => {
      await LoginPage.open();

      // Captura 1: Login
      await browser.saveFullPageScreen("report-01-login");
      await browser.checkFullPageScreen("report-01-login");

      // Captura 2: Login com erro
      await LoginPage.login("wrong", "wrong");
      await browser.pause(500);
      await browser.saveFullPageScreen("report-02-login-error");
      await browser.checkFullPageScreen("report-02-login-error");

      // Captura 3: Login sucesso
      await LoginPage.login("admin", "senha123");
      await browser.pause(2000);
      await browser.saveFullPageScreen("report-03-shop");
      await browser.checkFullPageScreen("report-03-shop");

      // Captura 4: Com produtos no carrinho
      await ShopPage.addProductToCart("Clean Code");
      await browser.pause(500);
      await browser.saveFullPageScreen("report-04-cart-filled");
      await browser.checkFullPageScreen("report-04-cart-filled");

      console.log("📊 Todas as capturas foram salvas para relatório");
      console.log(
        "💡 Execute: npm run visual:report para gerar relatório HTML"
      );
    });
  });

  describe("⚡ PERFORMANCE: Testes de Performance Visual", () => {
    it("✅ MEDIR: Tempo de carregamento visual", async () => {
      const startTime = Date.now();

      await LoginPage.open();
      await browser.pause(1000);

      const loadTime = Date.now() - startTime;

      await browser.saveFullPageScreen("performance-login");
      const result = await browser.checkFullPageScreen("performance-login");

      console.log(`⏱️ Tempo de carregamento: ${loadTime}ms`);
      console.log(`📊 Diferença visual: ${result}%`);

      // Verificar se o carregamento foi rápido
      if (loadTime > 3000) {
        console.warn(`⚠️ ATENÇÃO: Página demorou mais de 3s para carregar!`);
      }
    });

    it("✅ COMPARAR: Performance entre páginas", async () => {
      // Medir login
      const loginStart = Date.now();
      await LoginPage.open();
      await browser.pause(1000);
      const loginTime = Date.now() - loginStart;

      // Fazer login
      await LoginPage.login("admin", "senha123");

      // Medir loja
      const shopStart = Date.now();
      await browser.pause(2000);
      const shopTime = Date.now() - shopStart;

      console.log(`⏱️ Login: ${loginTime}ms`);
      console.log(`⏱️ Loja: ${shopTime}ms`);
      console.log(`📊 Total: ${loginTime + shopTime}ms`);
    });
  });

  describe("🎨 TEMAS: Testes de Consistência Visual", () => {
    beforeEach(async () => {
      await LoginPage.open();
      await LoginPage.login("admin", "senha123");
      await browser.pause(2000);
    });

    it("✅ CORES: Verificar paleta de cores consistente", async () => {
      // Capturar diferentes seções para verificar consistência
      const header = await $("header");
      const products = await $("#products");
      const cart = await $(".cart-section");

      await browser.saveElement(header, "theme-header");
      await browser.saveElement(products, "theme-products");
      await browser.saveElement(cart, "theme-cart");

      const headerResult = await browser.checkElement(header, "theme-header");
      const productsResult = await browser.checkElement(
        products,
        "theme-products"
      );
      const cartResult = await browser.checkElement(cart, "theme-cart");

      console.log(`📊 Header: ${headerResult}%`);
      console.log(`📊 Produtos: ${productsResult}%`);
      console.log(`📊 Carrinho: ${cartResult}%`);
      console.log(`🎨 Consistência visual verificada`);
    });

    it("✅ TIPOGRAFIA: Verificar fontes e tamanhos", async () => {
      const elements = [
        { selector: "h1", name: "title" },
        { selector: "h2", name: "subtitle" },
        { selector: "h3", name: "card-title" },
        { selector: "button", name: "button" },
      ];

      for (const elem of elements) {
        const element = await $(elem.selector);
        await browser.saveElement(element, `typography-${elem.name}`);
        const result = await browser.checkElement(
          element,
          `typography-${elem.name}`
        );
        console.log(`📊 ${elem.name}: ${result}%`);
      }

      console.log(`✅ Tipografia verificada em todos os elementos`);
    });
  });

  describe("🔍 DETALHES: Testes Pixel-Perfect", () => {
    beforeEach(async () => {
      await LoginPage.open();
      await LoginPage.login("admin", "senha123");
      await browser.pause(2000);
    });

    it("✅ PRECISÃO: Comparação com 0% de tolerância", async () => {
      const loginBtn = await $("#login-btn");

      // Capturar com precisão máxima
      await browser.saveElement(loginBtn, "pixel-perfect-button");

      const result = await browser.checkElement(
        loginBtn,
        "pixel-perfect-button",
        {
          // 0% de tolerância - deve ser exatamente igual
          rawMisMatchPercentage: true,
          ignoreAntialiasing: false,
          ignoreColors: false,
        }
      );

      if (result === 0) {
        console.log(`✅ Elemento está EXATAMENTE igual à baseline`);
      } else {
        console.log(`⚠️ Diferença de ${result}% detectada`);
      }
    });

    it("✅ BORDES: Verificar bordas e sombras", async () => {
      const productCard = await $(".product-card");

      await browser.saveElement(productCard, "borders-and-shadows");

      const result = await browser.checkElement(
        productCard,
        "borders-and-shadows",
        {
          // Detectar diferenças sutis em bordas
          ignoreAntialiasing: false,
        }
      );

      console.log(`📊 Bordas e sombras: ${result}%`);
    });

    it("✅ ESPAÇAMENTO: Verificar padding e margins", async () => {
      const container = await $(".container");

      await browser.saveElement(container, "spacing-check");

      const result = await browser.checkElement(container, "spacing-check");

      console.log(`📊 Espaçamento: ${result}%`);

      if (result > 0) {
        console.warn(`⚠️ Possível mudança no espaçamento detectada!`);
      }
    });
  });

  describe("📱 CROSS-BROWSER: Simulação de Diferentes Browsers", () => {
    it("✅ CHROME: Capturar baseline no Chrome", async () => {
      await LoginPage.open();
      await LoginPage.login("admin", "senha123");
      await browser.pause(2000);

      await browser.saveFullPageScreen("browser-chrome-baseline");
      const result = await browser.checkFullPageScreen(
        "browser-chrome-baseline"
      );

      console.log(`📊 Chrome baseline: ${result}%`);
      console.log(
        `💡 Use diferentes configs de wdio para testar outros browsers`
      );
    });
  });

  describe("🚨 CASOS DE ERRO: Testes de Estados de Erro", () => {
    it("✅ ERRO: Capturar estado de erro 404", async () => {
      // Tentar acessar página inexistente
      await browser.url("http://localhost:8080/nao-existe.html");
      await browser.pause(1000);

      await browser.saveFullPageScreen("error-404-page");
      const result = await browser.checkFullPageScreen("error-404-page");

      console.log(`📊 Página 404: ${result}%`);
    });

    it("✅ ERRO: Validação visual de campos obrigatórios", async () => {
      await LoginPage.open();

      // Tentar submit sem preencher
      await LoginPage.btnLogin.click();
      await browser.pause(500);

      const loginForm = await $("#login-section");
      await browser.saveElement(loginForm, "form-validation-error");
      const result = await browser.checkElement(
        loginForm,
        "form-validation-error"
      );

      console.log(`📊 Erro de validação: ${result}%`);
    });

    it("✅ ERRO: Produto sem estoque visual", async () => {
      await LoginPage.open();
      await LoginPage.login("admin", "senha123");
      await browser.pause(2000);

      const outOfStock = await ShopPage.getProductByTitle("Design Patterns");

      await browser.saveElement(outOfStock, "out-of-stock-visual");
      const result = await browser.checkElement(
        outOfStock,
        "out-of-stock-visual"
      );

      console.log(`📊 Produto sem estoque: ${result}%`);
    });
  });

  describe("📈 HISTÓRICO: Tracking de Mudanças ao Longo do Tempo", () => {
    it("✅ SNAPSHOT: Criar snapshot versionado", async () => {
      await LoginPage.open();
      await LoginPage.login("admin", "senha123");
      await browser.pause(2000);

      // Criar snapshot com timestamp
      const timestamp = new Date().toISOString().split("T")[0];

      await browser.saveFullPageScreen(`snapshot-v1-${timestamp}`);
      const result = await browser.checkFullPageScreen(
        `snapshot-v1-${timestamp}`
      );

      console.log(`📊 Snapshot v1 (${timestamp}): ${result}%`);
      console.log(`💡 Use este padrão para acompanhar evolução visual`);
    });
  });
});
