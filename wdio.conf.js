exports.config = {
  runner: "local",

  specs: ["./test/specs/**/*.js"],

  exclude: [],

  maxInstances: 1,

  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: [
          "--headless",
          "--disable-gpu",
          "--window-size=1920,1080",
          "--no-sandbox",
          "--disable-dev-shm-usage",
        ],
      },
      acceptInsecureCerts: true,
    },
  ],

  logLevel: "info",

  bail: 0,

  baseUrl: "http://localhost:8080",

  waitforTimeout: 10000,

  connectionRetryTimeout: 120000,

  connectionRetryCount: 3,

  services: [
    "chromedriver",
    [
      "visual",
      {
        // Pasta onde as imagens de baseline serão salvas
        baselineFolder: "./test/visual/baseline/",
        // Pasta onde as imagens atuais serão salvas
        actualFolder: "./test/visual/actual/",
        // Pasta onde as diferenças serão salvas
        diffFolder: "./test/visual/diff/",
        // Formato dos arquivos de imagem
        formatImageName: "{tag}-{browserName}-{width}x{height}",
        // Salvar automaticamente baseline se não existir
        autoSaveBaseline: true,
        // Criar relatórios JSON
        createJsonReportFiles: true,
        // Pasta para relatórios JSON
        jsonFolder: "./visual-report/",
        // Tolerância de diferença (0 = exatamente igual, 100 = qualquer diferença)
        savePerInstance: true,
        // Opções de comparação padrão
        compare: {
          // Ignorar antialiasing
          ignoreAntialiasing: true,
          // Ignorar cores
          ignoreColors: false,
          // Algoritmo de comparação (pixelmatch)
          rawMisMatchPercentage: true,
        },
      },
    ],
  ],

  framework: "mocha",

  reporters: ["spec"],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },

  before: function (capabilities, specs) {
    browser.maximizeWindow();
  },
};
