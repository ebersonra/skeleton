# Skeleton App

Estrutura base minimalista para novos projetos Node.js com Express, incluindo arquitetura em camadas, testes automatizados e pipeline de CI/CD.

## 🏗️ Arquitetura

### Estrutura de Camadas
```
src/
├── models/          # Camada de dados e estruturas
├── services/        # Regras de negócio e lógica reutilizável  
├── controllers/     # Orquestração de requisições HTTP
├── routes/          # Definição de endpoints da API
├── tests/           # Suíte completa de testes
│   ├── unit/        # Testes unitários isolados
│   ├── integration/ # Testes de integração entre camadas
│   └── e2e/         # Testes end-to-end da API
└── server.js        # Ponto de entrada da aplicação
```

### Stack Tecnológica
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Testes:** Jest + Supertest
- **Linting:** ESLint 9+ (flat config)
- **Deploy:** Netlify
- **CI/CD:** GitHub Actions

## 🚀 Início Rápido

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm start                    # Inicia servidor (porta 4000)
npm run test                 # Executa todos os testes
npm run test:watch          # Modo watch para testes
netlify dev                 # Preview local (porta 8888)
```

### Qualidade de Código
```bash
npx eslint .                # Análise estática
npm run test:unit           # Testes unitários
npm run test:integration    # Testes de integração  
npm run test:e2e           # Testes end-to-end
```

## 🧪 Estratégia de Testes

| Tipo | Escopo | Objetivo | Ferramentas |
|------|--------|----------|-------------|
| **Unit** | Função isolada | Lógica específica | Jest |
| **Integration** | Múltiplas camadas | Fluxo entre componentes | Jest + Mocks |
| **E2E** | Sistema completo | Comportamento da API | Jest + Supertest |

### Cobertura Atual
- ✅ Health endpoint (`/api/health`)
- ✅ Middleware de segurança (Helmet, CORS)
- ✅ Tratamento de erros (404)
- ✅ Arquivos estáticos

## 🔧 Configurações

### Middlewares Incluídos
- **Helmet:** Headers de segurança
- **CORS:** Configurável via `CORS_ORIGIN`
- **Compression:** Compressão gzip
- **Static Files:** Servidos de `public/`

### Variáveis de Ambiente
```bash
PORT=4000                    # Porta do servidor
CORS_ORIGIN=*               # Origem permitida para CORS
```

### ESLint
- Configuração flat config (ESLint 9+)
- Regras específicas para testes Jest
- Suporte completo a Node.js globals

## 🚢 Deploy e CI/CD

### Automação GitHub Actions
O workflow `.github/workflows/build_and_deploy.yml` executa:

1. **Build:** `npm ci && npm run build`
2. **Release:** Cria tag baseada na versão do `package.json`
3. **Deploy:** Publica `public/` na Netlify

### Configuração Necessária
Defina os seguintes secrets no GitHub:
```bash
NETLIFY_AUTH_TOKEN          # Token de autenticação
NETLIFY_SITE_ID            # ID do site na Netlify
```

### Netlify
- **Build:** Automatizado via `netlify.toml`
- **Publish:** Diretório `public/`
- **Dev:** `netlify dev` roda na porta 8888

## 📁 Estrutura Completa

```
skeleton/
├── .github/
│   ├── workflows/build_and_deploy.yml  # CI/CD pipeline
│   └── copilot-instructions.md         # Guia para AI agents
├── public/
│   └── index.html                      # Frontend estático
├── src/
│   ├── controllers/healthController.js # Endpoint de health
│   ├── models/exampleModel.js         # Modelo de exemplo
│   ├── routes/index.js                # Roteamento da API
│   ├── services/exampleService.js     # Lógica de negócio
│   ├── tests/                         # Suíte de testes
│   └── server.js                      # Aplicação Express
├── eslint.config.js                   # Configuração ESLint
├── netlify.toml                       # Configuração Netlify
└── package.json                       # Dependências e scripts
```

## 💡 Convenções

### Camadas
- **Models:** Apenas acesso/representação de dados
- **Services:** Lógica de negócio, sem HTTP
- **Controllers:** Thin layer, delega para services
- **Routes:** Apenas mapeamento endpoint → controller

### Adicionando Funcionalidades
1. **Nova API:** Route → Controller → Service → Model
2. **Novos testes:** Seguir padrão unit/integration/e2e
3. **Configurações:** Usar variáveis de ambiente

## 📚 Referências

- **Endpoint exemplo:** `GET /api/health`
- **Server class:** `src/server.js`
- **Testes:** `src/tests/*/`
- **Deploy:** `.github/workflows/`
