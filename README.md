# 📚 WebdriverIO Demo — BookStore E-commerce (Ajustado)

> Projeto de demonstração prática de testes automatizados com **WebdriverIO**. Inclui testes funcionais, end-to-end e testes visuais (regressão visual).

---

## 🎯 Objetivo

Demonstrar na prática o uso do WebdriverIO para automação de testes web, cobrindo:

- Testes funcionais (login, busca, carrinho, produtos)
- Testes End-to-End completos
- Padrão Page Object Model
- Testes visuais (captura e comparação de screenshots)

---

## 🔍 Recursos demonstrados

### Testes funcionais

- Login e autenticação
- Busca de produtos
- Carrinho de compras
- Fluxos end-to-end
- Validação de elementos e tratamento de erros

### Testes visuais ⭐

- Captura de página completa (com scroll automático)
- Captura de elementos específicos (botões, cards, modais)
- Comparação pixel-perfect (detecção de pequenas mudanças)
- Multi-resolução (mobile / tablet / desktop)
- Ignorar elementos dinâmicos (timestamps, ads)
- Tolerância configurável
- Relatórios interativos lado a lado (baseline / atual / diff)

---

## 🧭 Estrutura do projeto

```
webdriverio-bookstore-demo/
├── index.html                    # Aplicação web (front-end estático)
├── package.json                  # Dependências e scripts
├── wdio.conf.js                  # Configuração do WebdriverIO
├── test/
│   ├── pageobjects/
│   │   ├── login.page.js         # Page Object: Login
│   │   └── shop.page.js          # Page Object: Loja
│   ├── specs/
│   │   ├── login.test.js         # Testes de Login
│   │   ├── cart.test.js          # Testes de Carrinho
│   │   ├── search.test.js        # Testes de Busca
│   │   ├── products.test.js      # Testes de Produtos
│   │   ├── e2e.test.js           # Testes End-to-End
│   │   ├── visual.test.js        # Testes Visuais
│   │   └── visual-regression.test.js  # Regressão Visual
│   └── visual/                   # Capturas visuais
│       ├── baseline/             # 📸 Imagens de referência (baseline)
│       ├── actual/               # 📷 Capturas dos testes atuais
│       └── diff/                 # 🔍 Diferenças detectadas (quando houver)
└── visual-report/                # Relatórios visuais
    ├── output.json
    └── html/
```

### Exemplo de arquivos visuais na `baseline/`

```
login-page-full-chrome-1366x768.png
products-grid-chrome-1366x768.png
cart-empty-chrome-1366x768.png
```

---

## 🚀 Instalação

### Pré-requisitos

- Node.js (v14+)
- npm ou yarn
- Google Chrome (para execução local)

### Instalação de dependências

```bash
npm init -y
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter chromedriver wdio-chromedriver-service
```

---

## ▶️ Como executar

### 1. Iniciar servidor local da aplicação

```bash
npm run serve
```

A aplicação estará disponível em: `http://localhost:8080`

### 2. Executar todos os testes (funcionais + visuais)

```bash
npm test
```

### 3. Executar testes específicos

```bash
# Apenas testes de Login
npm run test:login

# Apenas testes de Carrinho
npm run test:cart

# Apenas testes de Busca
npm run test:search

# Apenas testes Visuais
npm run test:visual
```

### 4. Executar testes visuais e gerar relatório

```bash
# 1. Executar testes visuais (gera capturas em test/visual/actual)
npm run test:visual

# 2. Gerar relatório HTML visual (gera arquivos em visual-report/html)
npm run visual:report

# 3. Servir/visualizar relatório no navegador
npm run visual:serve
# Abra: http://localhost:8080 (ou outra porta configurada)
```

---

## 📸 Testes Visuais — Conceito e Funcionamento

Testes visuais comparam capturas de tela da sua aplicação com imagens de referência (baseline) para detectar mudanças visuais não intencionais.

**Como funcionam**:

1. **Primeira execução**: cria imagens de baseline (referência).
2. **Execuções seguintes**: comparam as capturas atuais com a baseline e reportam diferenças.
3. **Detecção**: qualquer mudança visual é identificada e quantificada (porcentagem / diff).

**Recursos**:

- Captura de página completa
- Captura de elementos específicos
- Comparação pixel-perfect
- Múltiplas resoluções
- Relatórios interativos
- Ignorar elementos dinâmicos
- Tolerância configurável

---

## 🔧 Exemplos de uso (snippets)

### 1. Captura de Página Completa

```javascript
// Captura e compara página inteira
await browser.saveFullPageScreen("login-page-full");
const diff = await browser.checkFullPageScreen("login-page-full");
console.log(`Diferença: ${diff}%`); // 0% = idêntico
```

### 2. Captura de Elemento Específico

```javascript
// Captura apenas um botão
const button = await $("#login-btn");
await browser.saveElement(button, "login-button");
const diff = await browser.checkElement(button, "login-button");
```

### 3. Teste Responsivo

```javascript
// Testar em mobile
await browser.setWindowSize(375, 667);
await browser.saveFullPageScreen("mobile-view");

// Testar em desktop
await browser.setWindowSize(1920, 1080);
await browser.saveFullPageScreen("desktop-view");
```

### 4. Usando Matchers

```javascript
// Comparação com expect
await expect(browser).toMatchFullPageSnapshot("homepage");

// Com tolerância de 5%
await expect(element).toMatchElementSnapshot("card", 5);
```

---

## 🧾 Exemplos e Casos de Uso Práticos

| Caso de Uso                   | Exemplo                                             |
| ----------------------------- | --------------------------------------------------- |
| **Detecção de Regressão CSS** | Alguém mudou um padding/margin sem querer           |
| **Validação de Layout**       | Verificar se elementos estão alinhados corretamente |
| **Teste Cross-Browser**       | Garantir consistência entre Chrome, Firefox, Safari |
| **Teste Responsivo**          | Validar layouts mobile, tablet e desktop            |
| **Mudanças de Design**        | Revisar alterações visuais antes de deploy          |
| **Componentes Isolados**      | Testar botões, cards, modais individualmente        |

---

## 🧪 Tipos de Testes Implementados (resumo)

- **Login**: casos de sucesso e falha (credenciais válidas/ inválidas/ campos vazios).
- **Carrinho**: adicionar/remover produtos, cálculo de total, finalizar compra.
- **Busca**: buscas por título/autor, termo inexistente, case-insensitive.
- **Produtos**: validação de informações, estoque, formatação de preços.
- **E2E**: fluxo completo de compra, navegação, cenários com erro.
- **Visuais**: capturas completas/elementos, responsividade, estados (hover/erro/sucesso).
- **Regressão Visual**: simulação de mudanças, áreas ignoradas, performance visual.

---

## 📝 Saída de exemplo dos testes

```
BookStore - Testes de Login
    ✓ SUCESSO: Deve fazer login com credenciais válidas
    ✓ FALHA: Deve mostrar erro com usuário inválido
    ✓ FALHA: Deve mostrar erro com senha inválida

BookStore - Testes do Carrinho de Compras
    ✓ SUCESSO: Deve adicionar produto ao carrinho
    ✓ SUCESSO: Deve calcular o total do carrinho corretamente
    ✓ SUCESSO: Deve finalizar compra com sucesso
    ✓ FALHA: Não deve permitir finalizar compra com carrinho vazio

21 passing (45s)
```

---

## ⚙️ Configurações importantes (`wdio.conf.js`)

Resumo do que está configurado no `wdio.conf.js`:

- Runner: local (execução no navegador local)
- Browser: Chrome (headless por padrão — remova `--headless` para ver a UI)
- Framework: Mocha
- Reporter: Spec (saída detalhada no terminal)
- Visual Service: configuração de testes visuais (pastas de baseline/actual/diff, formato de nomes, geração de relatórios JSON)
- Timeouts: configurados para aumentar estabilidade

---

## 🔐 Credenciais de teste

**Usuário:** `admin`
**Senha:** `senha123`

---

## 💡 Notas importantes

- Os testes são executados em **modo headless** por padrão.
- Para ver os testes rodando com interface visual, remova `--headless` na configuração do `wdio.conf.js`.
- Cada teste deve ser independente e limpar o estado anterior.
- Page Objects facilitam manutenção e leitura dos testes.

---

## 🚀 Próximos passos / Sugestões de evolução

- Integração com CI/CD (GitHub Actions, Jenkins)
- Execução em múltiplos browsers (Firefox, Safari, Edge)
- Testes mobile nativos com Appium
- Testes de API com SuperTest
- Testes de performance com Lighthouse
- Integração de um serviço de Visual Testing na nuvem (Percy, Applitools)

---

## 📚 Referências e Documentação

- [WebdriverIO Oficial](https://webdriver.io/)
- [WebdriverIO — Visual Testing Guide](https://webdriver.io/docs/visual-testing)
- [wdio-image-comparison-service (GitHub)](https://github.com/webdriverio-community/wdio-image-comparison-service)
- [Mocha Framework](https://mochajs.org/)

---
