BookStore - Testes End-to-End Completo
✓ SUCESSO: Fluxo completo - Login, Busca, Adicionar ao Carrinho e Finalizar Compra

BookStore - Testes Visuais de Regressão
✓ VISUAL: Deve capturar tela completa da página de login
📊 Diferença visual: 0%
✓ VISUAL: Deve capturar grid de produtos
📊 Diferença visual produtos: 0%
✓ VISUAL: Deve capturar carrinho com produtos
📊 Diferença visual carrinho cheio: 0%

45 passing (2m 15s)

```

---

## 📸 Testes Visuais - Novidade!

### O que são Testes Visuais?

Testes visuais comparam capturas de tela da sua aplicação com imagens de referência (baseline) para detectar mudanças visuais não intencionais. É como ter um "diff visual" automático!

### Como Funcionam os Testes Visuais?

1. **Primeira Execução**: Cria imagens de baseline (referência)
2. **Execuções Seguintes**: Compara com a baseline e reporta diferenças
3. **Detecção**: Qualquer mudança visual é identificada e quantificada

### Recursos dos Testes Visuais

- ✅ **Captura de Página Completa**: Screenshots com scroll automático
- ✅ **Captura de Elementos**: Screenshots de componentes específicos
- ✅ **Comparação Pixel-Perfect**: Detecta até pequenas mudanças
- ✅ **Múltiplas Resoluções**: Testa mobile, tablet e desktop
- ✅ **Relatórios Interativos**: Visualize diferenças lado a lado
- ✅ **Ignorar Elementos Dinâmicos**: Exclua timestamps, ads, etc.
- ✅ **Tolerância Configurável**: Ajuste sensibilidade da comparação

### Estrutura das Capturas Visuais

```

test/visual/
├── baseline/ # 📸 Imagens de referência (o padrão esperado)
│ ├── login-page-full-chrome-1366x768.png
│ ├── products-grid-chrome-1366x768.png
│ └── cart-empty-chrome-1366x768.png
│
├── actual/ # 📷 Capturas dos testes atuais
│ └── (mesmos nomes)
│
└── diff/ # 🔍 Diferenças detectadas (só quando há mudança)
└── login-page-full-chrome-1366x768.png # Destaca o que mudou

````

### Exemplos de Testes Visuais Implementados

#### 1. Captura de Página Completa
```javascript
// Captura e compara página inteira
await browser.saveFullPageScreen('login-page-full');
const diff = await browser.checkFullPageScreen('login-page-full');
console.log(`Diferença: ${diff}%`); // 0% = idêntico
````

#### 2. Captura de Elemento Específico

```javascript
// Captura apenas um botão
const button = await $("#login-btn");
await browser.saveElement(button, "login-button");
const diff = await browser.checkElement(button, "login-button");
```

#### 3. Teste Responsivo

```javascript
// Testar em mobile
await browser.setWindowSize(375, 667);
await browser.saveFullPageScreen("mobile-view");

// Testar em desktop
await browser.setWindowSize(1920, 1080);
await browser.saveFullPageScreen("desktop-view");
```

#### 4. Usando Matchers

```javascript
// Comparação com expect
await expect(browser).toMatchFullPageSnapshot("homepage");

// Com tolerância de 5%
await expect(element).toMatchElementSnapshot("card", 5);
```

### Casos de Uso Práticos

| Caso de Uso                   | Exemplo                                             |
| ----------------------------- | --------------------------------------------------- |
| **Detecção de Regressão CSS** | Alguém mudou um padding/margin sem querer           |
| **Validação de Layout**       | Verificar se elementos estão alinhados corretamente |
| **Teste Cross-Browser**       | Garantir consistência entre Chrome, Firefox, Safari |
| **Teste Responsivo**          | Validar layouts mobile, tablet e desktop            |
| **Mudanças de Design**        | Revisar alterações visuais antes de deploy          |
| **Componentes Isolados**      | Testar botões, cards, modais individualmente        |

### Comandos Rápidos

```bash
# Executar testes visuais
npm run test:visual

# Gerar relatório HTML
npm run visual:report

# Visualizar relatório
npm run visual:serve
# Abra: http://localhost:8080
```

### Visualizando o Relatório Visual

O relatório HTML interativo mostra:

- ✅ Lista de todos os testes executados
- 📊 Porcentagem de diferença para cada teste
- 🖼️ Visualização lado a lado: Baseline vs Atual vs Diff
- 🔍 Zoom nas áreas com diferenças
- 📈 Estatísticas gerais dos testes

### Atualizando Baselines

Quando você **intencionalmente** muda o design:

1. Delete as baselines antigas:

```bash
rm -rf test/visual/baseline/*
```

2. Execute os testes novamente para criar novas baselines:

```bash
npm run test:visual
```

3. As novas capturas se tornam a referência

---

## 🎓 Para a Apresentação do Seminário

### Demonstração Prática Sugerida:

1. **Mostrar a Aplicação Web**

   - Abrir no navegador: `http://localhost:8080`
   - Fazer login manual: admin / senha123
   - Navegar pela loja, adicionar produtos, buscar, etc.

2. **Executar Testes Funcionais**

   - Rodar: `npm test`
   - Mostrar os testes passando em tempo real
   - Explicar cada tipo de teste

3. **Executar Testes Visuais** ⭐ **DESTAQUE!**

   - Rodar: `npm run test:visual`
   - Explicar criação de baselines
   - Mostrar comparação visual
   - Demonstrar detecção de mudanças

4. **Visualizar Relatório Visual** 📸

   - Gerar: `npm run visual:report`
   - Servir: `npm run visual:serve`
   - Abrir navegador e explorar relatório interativo
   - Mostrar imagens lado a lado

5. **Demonstrar Detecção de Regressão** 🔍

   - Modificar CSS da aplicação (mudar uma cor, tamanho, etc)
   - Executar testes visuais novamente
   - Mostrar a diferença detectada
   - Explorar imagem de diff destacando mudanças

6. **Mostrar o Código dos Testes**

   - Abrir arquivos em `test/specs/`
   - Explicar estrutura de um teste visual
   - Mostrar comandos: `saveElement`, `checkScreen`, etc
   - Demonstrar matchers visuais

7. **Vantagens do WebdriverIO + Visual Testing**
   - ✅ Simples de configurar
   - ✅ Detecção automática de regressões visuais
   - ✅ Relatórios interativos e intuitivos
   - ✅ Suporta múltiplos browsers e resoluções
   - ✅ Integração com CI/CD
   - ✅ Reduz testes manuais de UI
   - ✅ Aumenta confiança em deploys

---

## 🔧 Configurações do WebdriverIO

O arquivo `wdio.conf.js` contém:

- **Runner**: local (executa no navegador local)
- **Browser**: Chrome em modo headless
- **Framework**: Mocha para assertions
- **Reporter**: Spec (saída detalhada no terminal)
- **Visual Service**: Configuração de testes visuais ⭐
  - Pasta de baselines
  - Pasta de capturas atuais
  - Pasta de diferenças
  - Formato de nomes de arquivo
  - Criação automática de baselines
  - Geração de relatórios JSON
- **Timeouts**: Configurados para garantir estabilidade

---

## 💡 Credenciais de Teste

**Usuário:** `admin`  
**Senha:** `senha123`

---

## 📝 Arquivos Importantes

| Arquivo                                | Descrição                         |
| -------------------------------------- | --------------------------------- |
| `index.html`                           | Aplicação web de e-commerce       |
| `wdio.conf.js`                         | Configuração do WebdriverIO       |
| `test/specs/visual.test.js`            | Testes visuais básicos            |
| `test/specs/visual-regression.test.js` | Testes avançados de regressão     |
| `VISUAL-COMMANDS.md`                   | Guia completo de comandos visuais |

---

## 🎯 Recursos Demonstrados

### Testes Funcionais

- ✅ Login e autenticação
- ✅ Busca de produtos
- ✅ Carrinho de compras
- ✅ Fluxos end-to-end
- ✅ Validação de elementos
- ✅ Tratamento de erros

### Testes Visuais ⭐

- 📸 Screenshots de página completa
- 🖼️ Screenshots de elementos específicos
- 📱 Testes responsivos (mobile/tablet/desktop)
- 🔍 Detecção de regressão visual
- 🎨 Comparação de estados (hover, erro, sucesso)
- 📊 Relatórios visuais interativos
- 🎭 Matchers visuais com expect
- ⚙️ Opções avançadas (ignorar elementos, tolerância)

---

## 🚀 Próximos Passos

Após dominar este projeto, explore:

- Integração com CI/CD (GitHub Actions, Jenkins)
- Testes em múltiplos browsers (Firefox, Safari, Edge)
- Testes mobile nativos com Appium
- Testes de API com SuperTest
- Testes de performance com Lighthouse
- Visual regression testing com Percy

---

## 📚 Documentação Adicional

- [WebdriverIO Oficial](https://webdriver.io/)
- [Visual Testing Guide](https://webdriver.io/docs/visual-testing)
- [WebdriverIO Visual Service](https://github.com/webdriverio-community/wdio-image-comparison-service)
- [Mocha Framework](https://mochajs.org/)

---

## 🎉 Pronto para Apresentar!

Este projeto demonstra de forma prática e completa o uso do WebdriverIO para automação de testes web, incluindo:

- ✅ Testes funcionais com casos de sucesso e falha
- ✅ Padrão Page Object Model
- ✅ Testes End-to-End completos
- ⭐ **Testes visuais de regressão**
- 📊 **Relatórios visuais interativos**

**Diferencial**: Além dos testes funcionais tradicionais, este projeto inclui **testes visuais automatizados** que detectam mudanças não intencionais na interface, aumentando drasticamente a cobertura de testes e confiança em deploys!# 📚 WebdriverIO Demo - BookStore E-commerce

Projeto de demonstração prática de testes automatizados com **WebdriverIO** para apresentação em seminário.

## 🎯 Objetivo

Demonstrar na prática o uso da ferramenta WebdriverIO para automação de testes web, incluindo:

- ✅ Casos de teste com **sucesso**
- ❌ Casos de teste com **falha**
- 🔄 Testes End-to-End completos
- 📦 Padrão Page Object Model

---

## 🚀 Instalação

### Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- Google Chrome instalado

### Passo 1: Clonar/Criar estrutura do projeto

```bash
mkdir webdriverio-bookstore-demo
cd webdriverio-bookstore-demo
```

### Passo 2: Instalar dependências

```bash
npm init -y
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter chromedriver wdio-chromedriver-service
```

### Passo 3: Estrutura de pastas

```
webdriverio-bookstore-demo/
├── index.html                    # Aplicação web
├── package.json                  # Dependências
├── wdio.conf.js                  # Configuração WebdriverIO
├── test/
│   ├── pageobjects/
│   │   ├── login.page.js         # Page Object Login
│   │   └── shop.page.js          # Page Object Loja
│   ├── specs/
│   │   ├── login.test.js         # Testes de Login
│   │   ├── cart.test.js          # Testes de Carrinho
│   │   ├── search.test.js        # Testes de Busca
│   │   ├── products.test.js      # Testes de Produtos
│   │   ├── e2e.test.js           # Testes End-to-End
│   │   ├── visual.test.js        # Testes Visuais ⭐
│   │   └── visual-regression.test.js  # Regressão Visual ⭐
│   └── visual/                   # Capturas visuais ⭐
│       ├── baseline/             # Imagens de referência
│       ├── actual/               # Capturas atuais
│       └── diff/                 # Diferenças detectadas
└── visual-report/                # Relatórios visuais ⭐
    ├── output.json
    └── html/
```

---

## ▶️ Como Executar

### 1. Iniciar servidor local da aplicação

```bash
npm run serve
```

A aplicação estará disponível em: `http://localhost:8080`

### 2. Executar todos os testes

Em outro terminal:

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

# Apenas testes Visuais ⭐ NOVO!
npm run test:visual
```

### 4. Executar testes visuais e gerar relatório 📸

```bash
# 1. Executar testes visuais
npm run test:visual

# 2. Gerar relatório HTML visual
npm run visual:report

# 3. Visualizar relatório no navegador
npm run visual:serve
```

Abra: `http://localhost:8080` para ver o relatório visual interativo!

---

## 🧪 Tipos de Testes Implementados

### ✅ Testes de Login (login.test.js)

- Login com credenciais válidas (SUCESSO)
- Login com usuário inválido (FALHA)
- Login com senha inválida (FALHA)
- Login com campos vazios (FALHA)
- Validação de elementos visíveis

### 🛒 Testes de Carrinho (cart.test.js)

- Adicionar produto ao carrinho (SUCESSO)
- Adicionar múltiplos produtos (SUCESSO)
- Remover produto do carrinho (SUCESSO)
- Cálculo de total correto (SUCESSO)
- Finalizar compra (SUCESSO)
- Finalizar com carrinho vazio (FALHA)

### 🔍 Testes de Busca (search.test.js)

- Buscar por título (SUCESSO)
- Buscar por autor (SUCESSO)
- Buscar com termo inexistente (FALHA)
- Busca case-insensitive (SUCESSO)
- Limpar busca e mostrar todos produtos (SUCESSO)

### 📦 Testes de Produtos (products.test.js)

- Validar informações do produto (SUCESSO)
- Produto com estoque disponível (SUCESSO)
- Produto sem estoque (FALHA ESPERADA)
- Validar formatação de preços (SUCESSO)
- Exibir ícones e informações completas (SUCESSO)

### 🔄 Testes End-to-End (e2e.test.js)

- Fluxo completo de compra (SUCESSO)
- Fluxo com erro de autenticação (FALHA)
- Adição múltipla do mesmo produto (SUCESSO)
- Navegação completa pela loja (SUCESSO)

### 📸 Testes Visuais (visual.test.js) **NOVO!**

- Captura de tela completa de páginas
- Comparação visual de elementos específicos
- Testes de responsividade (mobile, tablet, desktop)
- Detecção de regressão visual
- Comparação de estados (hover, erro, sucesso)
- Testes com matchers visuais

### 🎨 Testes de Regressão Visual (visual-regression.test.js) **NOVO!**

- Simulação de mudanças visuais
- Comparação entre estados diferentes
- Testes com áreas ignoradas
- Multi-resolução
- Performance visual
- Consistência de temas e cores

---

## 📊 Resultados Esperados

### Exemplo de saída dos testes:

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

## 🎓 Para a Apresentação do Seminário

### Demonstração Prática Sugerida:

1. **Mostrar a Aplicação Web**

   - Abrir no navegador: `http://localhost:8080`
   - Fazer login manual: admin / senha123
   - Navegar pela loja, adicionar produtos, buscar, etc.

2. **Executar Testes Automatizados**

   - Rodar: `npm test`
   - Mostrar os testes passando em tempo real
   - Explicar cada tipo de teste

3. **Mostrar o Código dos Testes**

   - Abrir arquivos em `test/specs/`
   - Explicar estrutura de um teste
   - Mostrar Page Object Model

4. **Demonstrar Teste com Falha Proposital**

   - Modificar credenciais de login no teste
   - Executar e mostrar falha
   - Corrigir e mostrar sucesso

5. **Vantagens do WebdriverIO**
   - Simples de configurar
   - Suporta múltiplos browsers
   - Sintaxe clara e intuitiva
   - Integração com CI/CD
   - Comunidade ativa

---

## 🔧 Configurações do WebdriverIO

O arquivo `wdio.conf.js` contém:

- **Runner**: local (executa no navegador local)
- **Browser**: Chrome em modo headless
- **Framework**: Mocha para assertions
- **Reporter**: Spec (saída detalhada no terminal)
- **Timeouts**: Configurados para garantir estabilidade

---

## 💡 Credenciais de Teste

**Usuário:** `admin`  
**Senha:** `senha123`

---

## 📝 Notas Importantes

- Os testes são executados em **modo headless** (sem abrir janela do browser)
- Para ver os testes rodando com interface visual, remova `--headless` do `wdio.conf.js`
- Cada teste é independente e limpa o estado anterior
- Page Objects facilitam manutenção dos testes

---

## 🎉 Pronto para Apresentar!

Este projeto demonstra de forma prática e completa o uso do WebdriverIO para automação de testes web, com casos de sucesso e falha reais.
