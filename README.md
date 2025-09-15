# 🚀 Skeleton API

Estrutura base moderna e minimalista para novos projetos Node.js com Express, incluindo arquitetura em camadas, testes automatizados, interface espacial interativa e pipeline de CI/CD completo.

## � Visão Geral

Este projeto fornece uma fundação sólida para APIs REST com **arquitetura limpa**, **testes abrangentes** e **deploy automatizado**. Inclui uma interface web moderna com tema espacial que documenta e demonstra todas as funcionalidades da API.

**✨ Destaques:**
- 🏗️ Arquitetura em camadas bem definida (MVC + Services)
- 🧪 Estratégia completa de testes (Unit, Integration, E2E)
- 🎨 Interface web interativa com tema espacial
- 🚢 CI/CD automatizado com GitHub Actions + Netlify
- 🔧 ESLint 9+ com configuração flat moderna
- 🛡️ Middlewares de segurança integrados
- 📱 Interface totalmente responsiva

## 🏗️ Arquitetura

### Estrutura de Camadas
```
src/
├── controllers/     # Orquestração de requisições HTTP (thin layer)
│   └── healthController.js
├── services/        # Lógica de negócio e regras (business logic)
│   └── exampleService.js
├── models/          # Acesso a dados e estruturas (data layer)
│   └── exampleModel.js
├── routes/          # Definição de endpoints e roteamento
│   └── index.js
├── tests/           # Suíte completa de testes organizados
│   ├── unit/        # Testes unitários isolados
│   ├── integration/ # Testes de integração entre camadas
│   └── e2e/         # Testes end-to-end da API completa
└── server.js        # Classe Server e configuração Express
```

### Stack Tecnológica
- **Runtime:** Node.js 18+
- **Framework:** Express.js 4.18+
- **Testes:** Jest 30+ + Supertest 7+
- **Linting:** ESLint 9+ (flat config)
- **Deploy:** Netlify + GitHub Actions
- **Segurança:** Helmet + CORS + Compression
- **Frontend:** HTML5 + CSS3 + JavaScript ES6+

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação e Configuração
```bash
# Clone o repositório
git clone https://github.com/ebersonra/skeleton.git
cd skeleton

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

**🌐 Acesso:**
- **API Backend:** http://localhost:4000
- **Interface Web:** http://localhost:4000 (página inicial com documentação)
- **Health Check:** http://localhost:4000/api/health

### Desenvolvimento
```bash
npm start                    # Servidor em modo desenvolvimento (porta 4000)
npm run test                 # Executa todos os testes (unit + integration + e2e)
npm run test:watch          # Modo watch para desenvolvimento com testes
netlify dev                 # Preview local da versão de produção (porta 8888)
```

### Verificação da Qualidade
```bash
npx eslint .                # Análise estática do código
npm run test:unit           # Apenas testes unitários (rápidos)
npm run test:integration    # Testes de integração entre camadas
npm run test:e2e           # Testes end-to-end do sistema completo
```

## 🧪 Estratégia de Testes Detalhada

A arquitetura de testes segue a **pirâmide de testes** com três níveis bem definidos:

| Tipo | Escopo | Objetivo | Velocidade | Ferramentas | Cobertura |
|------|--------|----------|------------|-------------|-----------|
| **Unit** | Função/método isolado | Lógica específica e edge cases | ⚡ Muito rápida | Jest | Funções puras |
| **Integration** | Múltiplas camadas | Fluxo entre componentes | 🔄 Moderada | Jest + Mocks | Controller → Service → Model |
| **E2E** | Sistema completo | Comportamento real da API | 🐌 Mais lenta | Jest + Supertest | HTTP endpoints completos |

### 📊 Cobertura Atual (16 testes passando)
- ✅ **Health endpoint** (`GET /api/health`) - completo
- ✅ **Middlewares de segurança** (Helmet, CORS, Compression)
- ✅ **Tratamento de erros** (404 para rotas inexistentes)
- ✅ **Servir arquivos estáticos** (`public/` directory)
- ✅ **Parsing de JSON** em requisições
- ✅ **Integração completa** Controller → Service → Model
- ✅ **Mocking e isolamento** de dependências
- ✅ **Tratamento de erros** em todas as camadas

### 🔍 Detalhes dos Testes

**Unit Tests (1 suite, 1 test):**
- `exampleService.test.js`: Testa lógica do serviço isoladamente

**Integration Tests (1 suite, 7 tests):**
- `health.integration.test.js`: Fluxo Controller → Service → Model
- Testa mocking de dependências e propagação de erros
- Valida consistência de dados entre camadas

**E2E Tests (1 suite, 8 tests):**
- `api.test.js`: Testa endpoints HTTP reais
- Headers de segurança e CORS
- Parsing de requisições e serving de arquivos estáticos

## 🔧 Configurações e Middlewares

### Arquitetura da Classe Server
```javascript
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.corsOrigin = process.env.CORS_ORIGIN || '*';
    this.middlewares(); // Configura middleware chain
    this.routes();      // Define roteamento
  }
}
```

### Pipeline de Middlewares (ordem importa!)
1. **Helmet** - Headers de segurança HTTP
2. **CORS** - Cross-Origin Resource Sharing
3. **Compression** - Compressão gzip/deflate
4. **express.json()** - Parser de JSON
5. **express.static()** - Arquivos estáticos (`public/`)
6. **Routes** - Roteamento da API (`/api/*`)
7. **404 Handler** - Catch-all para rotas não encontradas

### Variáveis de Ambiente
```bash
# Arquivo .env (opcional)
PORT=4000                    # Porta do servidor (padrão: 4000)
CORS_ORIGIN=*               # Origem permitida para CORS (padrão: *)
```

### Configuração ESLint 9+ (Flat Config)
```javascript
// eslint.config.js
module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: { /* Node.js globals */ }
    },
    rules: {
      "semi": ["error", "always"],
      "no-unused-vars": "warn"
    }
  },
  {
    files: ["**/*.test.js"],
    plugins: { jest },
    rules: { /* Jest-specific rules */ }
  }
];
```

### Endpoints Disponíveis
| Método | Endpoint | Descrição | Resposta |
|--------|----------|-----------|----------|
| `GET` | `/api/health` | Status da aplicação | `{ status, timestamp, message, version, exampleCount }` |
| `GET` | `/` | Interface web | Página HTML com documentação |
| `GET` | `/*` (static) | Arquivos estáticos | CSS, JS, imagens do `public/` |
| `*` | `*` (outros) | Não encontrado | `{ error: "Not found" }` (404) |

## 🚢 Deploy e CI/CD Automático

### Pipeline GitHub Actions
O workflow `.github/workflows/build_and_deploy.yml` executa automaticamente:

1. **🔍 Trigger:** Push para branch `main`
2. **🏗️ Build:** `npm ci && npm run build` com Node.js 18
3. **🏷️ Release:** Cria tag automática baseada na versão do `package.json`
4. **🚀 Deploy:** Publica diretório `public/` na Netlify

### Configuração de Secrets no GitHub
```bash
# Configurar em: Settings > Secrets and variables > Actions
NETLIFY_AUTH_TOKEN          # Token de autenticação da Netlify
NETLIFY_SITE_ID            # ID único do site na Netlify
```

### Netlify Configuration (`netlify.toml`)
```toml
[build]
  command = "npm run build"  # Comando de build
  publish = "public"         # Diretório publicado

[dev]
  command = "npm start"      # Comando local
  port = 8888               # Porta do preview
  targetPort = 4000         # Porta do servidor backend
```

### Processo de Deploy
1. **Desenvolvimento:** Trabalhe localmente com `npm start`
2. **Versionamento:** Atualize a versão no `package.json`
3. **Commit & Push:** Para a branch `main`
4. **Automático:** GitHub Actions + Netlify fazem o resto

## 🎨 Interface Web - Tema Espacial

A aplicação inclui uma **interface web moderna e interativa** com tema espacial que serve como:
- 📚 **Documentação visual** das APIs
- 🧪 **Testador interativo** de endpoints
- 🚀 **Demonstração** das capacidades do projeto

### Características da Interface
- **🌌 Design espacial imersivo** com planetas, estrelas e galáxias animadas
- **📱 Totalmente responsiva** (mobile-first design)
- **⚡ Performance otimizada** com debouncing e lazy loading
- **🎯 UX moderna** com animações suaves e feedback visual
- **📋 Funcionalidades práticas** como copiar comandos cURL
- **💓 Status em tempo real** da API (ativo/erro/offline)

### Tecnologias Frontend
- **HTML5 semântico** com estrutura acessível
- **CSS3 moderno** com custom properties, grid e flexbox
- **JavaScript ES6+** com modules, async/await e APIs modernas
- **Tipografia:** Google Fonts (Orbitron + Inter)
- **Animações:** CSS animations + transforms + transitions

## 📁 Estrutura Completa do Projeto

```
skeleton/ (19 arquivos principais)
├── .github/
│   ├── workflows/
│   │   └── build_and_deploy.yml    # Pipeline CI/CD automático
│   └── copilot-instructions.md     # Guia para AI coding agents
├── public/                         # Frontend estático (Netlify)
│   ├── index.html                  # Interface espacial interativa
│   ├── favicon.svg                 # Ícone do site
│   ├── css/
│   │   └── styles.css             # CSS moderno com tema espacial
│   └── js/
│       └── main.js                # JavaScript interativo ES6+
├── src/                           # Backend Node.js + Express
│   ├── controllers/
│   │   └── healthController.js    # Controller do endpoint health
│   ├── models/
│   │   └── exampleModel.js       # Modelo de exemplo (in-memory)
│   ├── services/
│   │   └── exampleService.js     # Lógica de negócio
│   ├── routes/
│   │   └── index.js              # Definição de rotas da API
│   ├── tests/                    # Suíte completa de testes
│   │   ├── unit/
│   │   │   └── exampleService.test.js      # Testes unitários
│   │   ├── integration/
│   │   │   └── health.integration.test.js  # Testes de integração
│   │   └── e2e/
│   │       └── api.test.js                 # Testes end-to-end
│   └── server.js                 # Classe Server principal
├── eslint.config.js              # ESLint 9+ flat config
├── netlify.toml                  # Configuração Netlify
├── package.json                  # Dependências e scripts npm
└── README.md                     # Documentação (este arquivo)
```

### 📊 Estatísticas do Projeto
- **📦 Dependências:** 5 production + 7 development
- **🧪 Testes:** 16 testes (3 suites) - 100% passando
- **📝 Código:** ~600 linhas (JS/HTML/CSS)
- **⚙️ Config:** ESLint 9+, Jest 30+, GitHub Actions
- **🎯 Cobertura:** Health API, Security, Static files, Error handling

## 💡 Convenções e Padrões

### 🏗️ Arquitetura em Camadas (Strict Separation)
- **Models (`src/models/`):** 
  - ✅ Apenas acesso/representação de dados
  - ❌ Sem lógica de negócio ou HTTP
  - 📝 Exemplo: `ExampleModel.count()` retorna número simples

- **Services (`src/services/`):** 
  - ✅ Lógica de negócio pura, sem dependências HTTP
  - ✅ Retorna objetos estruturados com timestamps
  - ❌ Não acessa req/res diretamente
  - 📝 Exemplo: `exampleService.getInfo()` com business logic

- **Controllers (`src/controllers/`):** 
  - ✅ Thin layer - apenas orquestração HTTP
  - ✅ Delega toda lógica para services
  - ✅ Exporta função única: `module.exports = (req, res) => {}`
  - 📝 Exemplo: `healthController` só chama service e retorna JSON

- **Routes (`src/routes/`):** 
  - ✅ Apenas mapeamento endpoint → controller
  - ❌ Zero lógica de negócio
  - 📝 Exemplo: `router.get('/health', healthController)`

### 🧪 Padrões de Teste
- **Unit:** Teste funções isoladas com mocks mínimos
- **Integration:** Use `mockRequest()` e `mockResponse()` helpers
- **E2E:** Use `supertest` com instância `Server` (não servidor live)
- **Restore:** Sempre restaure funções originais: `fn = originalFn`

### 📁 Organização de Arquivos
- **Estrutura espelhada:** `src/tests/` espelha `src/`
- **Nomeação:** `*.test.js` para todos os testes
- **Imports:** Use require() consistentemente (CommonJS)

## 🚀 Adicionando Novas Funcionalidades

### 1. 🆕 Nova API Endpoint
```bash
# 1. Defina a rota
echo "router.get('/users', userController);" >> src/routes/index.js

# 2. Crie o controller
cat > src/controllers/userController.js << EOF
const userService = require('../services/userService');
module.exports = (req, res) => {
  const users = userService.getAllUsers();
  res.json(users);
};
EOF

# 3. Implemente o service
cat > src/services/userService.js << EOF
const UserModel = require('../models/userModel');
function getAllUsers() {
  return {
    users: UserModel.findAll(),
    timestamp: new Date().toISOString(),
    total: UserModel.count()
  };
}
module.exports = { getAllUsers };
EOF

# 4. Crie o model
cat > src/models/userModel.js << EOF
const users = [];
function findAll() { return users; }
function count() { return users.length; }
module.exports = { findAll, count };
EOF
```

### 2. 🧪 Adicionar Testes
```bash
# Unit test
echo "test('should return all users', () => { /* test logic */ });" > src/tests/unit/userService.test.js

# Integration test  
echo "test('should integrate user flow', () => { /* integration */ });" > src/tests/integration/user.integration.test.js

# E2E test
echo "test('GET /api/users should return 200', () => { /* e2e */ });" > src/tests/e2e/user.test.js
```

### 3. ⚙️ Configuração de Ambiente
```bash
# Adicionar nova variável de ambiente
echo "DATABASE_URL=postgres://localhost/skeleton" >> .env

# Usar no código
const dbUrl = process.env.DATABASE_URL || 'default_value';
```

## 📚 Referências e Links Úteis

### 🔗 URLs do Projeto
- **🌐 Interface Web:** http://localhost:4000 (página principal com documentação)
- **💓 Health Check:** http://localhost:4000/api/health
- **📖 Repositório:** https://github.com/ebersonra/skeleton
- **🚀 Deploy Netlify:** (configurar após primeiro deploy)

### 📖 Documentação Técnica
- **Endpoint principal:** `GET /api/health` - Retorna status da aplicação
- **Server class:** `src/server.js` - Classe principal Express com middlewares
- **Testes completos:** `src/tests/*/` - Estratégia de 3 camadas
- **Pipeline CI/CD:** `.github/workflows/build_and_deploy.yml`
- **Configuração ESLint:** `eslint.config.js` (flat config moderno)

### 📦 Dependências Principais
- **express@4.18.2** - Framework web minimalista
- **helmet@7.0.0** - Headers de segurança HTTP
- **cors@2.8.5** - Cross-Origin Resource Sharing  
- **compression@1.7.4** - Middleware de compressão
- **dotenv@16.3.1** - Carregamento de variáveis de ambiente

### 🛠️ Dependências de Desenvolvimento
- **jest@30.1.3** - Framework de testes
- **supertest@7.1.4** - Testes HTTP de API
- **eslint@9.35.0** - Linter com configuração flat
- **netlify-cli@22.4.0** - CLI para deploy e desenvolvimento

### 🎯 Casos de Uso Ideais
- **🏗️ Base para APIs REST** com arquitetura limpa
- **🧪 Projeto para aprender testes** (unit/integration/e2e)
- **🚀 Template para CI/CD** com GitHub Actions
- **📚 Demonstração de boas práticas** Node.js + Express
- **🎨 Showcase de interface moderna** com tema espacial

---

## ⭐ Começando Agora

```bash
# Clone e execute em 30 segundos
git clone https://github.com/ebersonra/skeleton.git
cd skeleton
npm install && npm start

# Abra http://localhost:4000 e explore! 🚀
```

**🎉 Pronto!** Você tem uma API REST completa com interface espacial, testes automatizados e pipeline de CI/CD configurado.
