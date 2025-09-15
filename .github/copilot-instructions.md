# Copilot Instructions for AI Coding Agents

## Project Overview
This is a minimalist Node.js + Express skeleton with comprehensive testing, ESLint configuration, automated CI/CD, and a **space-themed interactive frontend**. The architecture follows strict layered separation:
- **Model** (`src/models/`): Data access layer with simple in-memory storage (e.g., `ExampleModel.count()`)
- **Service** (`src/services/`): Business logic layer returning structured data with timestamps
- **Controller** (`src/controllers/`): Thin HTTP handlers that delegate to services (see `healthController.js`)
- **Route** (`src/routes/`): Express router definitions mapping endpoints to controllers
- **Server** (`src/server.js`): Express app class with middleware chain: helmet → cors → compression → json → static
- **Frontend** (`public/`): Space-themed interactive documentation with live API testing

## Critical Workflows
- **Testing:** `npm run test:unit|integration|e2e` - Three-tier test strategy using Jest + Supertest
- **Linting:** `npx eslint .` - ESLint 9+ flat config with Jest-specific rules for test files
- **Development:** `npm start` (port 4000) vs `netlify dev` (port 8888 for static preview)
- **CI/CD:** Auto-release on version bump + Netlify deploy via `.github/workflows/build_and_deploy.yml`
- **Frontend:** Access full documentation at `http://localhost:4000` (serves `public/index.html`)

## Frontend Architecture (Space Theme)
### Interactive Documentation (`public/`)
- **HTML5 Structure:** Semantic sections with space navigation, hero, APIs, docs, architecture
- **CSS Design System:** CSS custom properties with space-themed color palette (`--cosmic-purple`, `--space-black`, etc.)
- **JavaScript Features:** Copy-to-clipboard, smooth scrolling, live API status checks, space animations
- **Responsive Design:** Mobile-first with CSS Grid/Flexbox, breakpoints at 768px and 480px

### Key Frontend Patterns
- **CSS Variables:** Consistent spacing system (`--space-xs` to `--space-3xl`), cosmic color scheme
- **Component Cards:** `.api-card`, `.doc-card`, `.arch-card` with glassmorphism styling
- **Space Animations:** Floating planets, twinkling stars, rotating galaxies with CSS keyframes
- **Interactive Elements:** `.copy-btn` with `data-copy` attribute, real-time API status indicators

## Testing Patterns (Critical for AI Agents)
### Unit Tests (`src/tests/unit/`)
- Test individual functions in isolation
- Example: `exampleService.getInfo()` returns structured object with `status`, `timestamp`, `version`, `exampleCount`

### Integration Tests (`src/tests/integration/`)
- Use `mockResponse()` and `mockRequest()` helpers for Express req/res objects
- Test controller → service → model flow with strategic mocking
- Always restore original functions: `ExampleModel.count = originalCount`
- Pattern: Mock dependencies, call function, assert data flow, restore

### E2E Tests (`src/tests/e2e/`)
- Use `supertest` with `Server` class instance (not live server)
- Test security headers (helmet), CORS, static file serving
- Pattern: `request(app).get('/api/health').expect(200)`
- Covers: API endpoints, static files (`public/`), security middleware, error handling

## ESLint Configuration Specifics
- **Flat config format** (ESLint 9+) in `eslint.config.js`
- **Node.js globals** manually defined (require, module, process, __dirname, etc.)
- **Jest rules** apply only to `**/*.test.js` files with separate plugin configuration
- **Critical rules:** `semi: ["error", "always"]`, Jest-specific linting for test quality

## Server Architecture Details
- **Middleware order matters:** helmet → cors → compression → json → static → routes
- **Static files:** `express.static(path.join(__dirname, '../public'))` serves the space-themed frontend
- **CORS_ORIGIN** env var controls CORS policy
- **Class-based server** with constructor → middlewares → routes → start pattern
- **Conditional startup:** `if (require.main === module)` prevents startup during testing

## Integration Points
- **Netlify:** `public/` directory auto-deployed, `netlify.toml` configures build/dev commands
- **GitHub Actions:** Version-based releases using `package.json` version field
- **Environment:** Uses `dotenv` for local config, env vars for deployment
- **Frontend-Backend:** Static files served by Express, JavaScript fetches `/api/health` for live status

## Project-Specific Conventions
- **Controllers export single functions** (not objects): `module.exports = (req, res) => {}`
- **Services return data objects** with consistent structure (status, timestamp, message, version, exampleCount)
- **Models use simple in-memory patterns** - no database integration by default
- **Test file organization:** Mirror `src/` structure in `src/tests/{unit,integration,e2e}/`
- **Frontend structure:** Semantic HTML sections, BEM-like CSS classes, modular JavaScript functions
- **CSS naming:** Space-themed variables, component-based classes (`.api-card`, `.hero-title`)

## Frontend Development Patterns
### CSS Architecture
- **Custom Properties:** Use CSS variables for colors, spacing, shadows, typography
- **Component Classes:** `.api-card`, `.doc-card`, `.btn-primary`, `.section-title`
- **Space Animations:** Keyframes for `@keyframes twinkle`, `@keyframes float`, `@keyframes rotate`
- **Responsive Design:** Mobile-first with `@media (max-width: 768px)` and `@media (max-width: 480px)`

### JavaScript Patterns
- **Module Functions:** `initSmoothScrolling()`, `initCopyButtons()`, `initSpaceAnimations()`
- **API Integration:** `fetch('/api/health')` for live status, `updateApiStatus()` for UI updates
- **Event Handling:** `addEventListener('DOMContentLoaded')`, debounced scroll events
- **Performance:** Intersection Observer for animations, debouncing for scroll handlers

## Adding New Features
1. **API Endpoint:** Route in `index.js` → Controller function → Service logic → Model data
2. **Tests:** Add all three levels (unit for service, integration for flow, e2e for HTTP)
3. **Frontend:** Update `index.html` API section, add new endpoint card with status indicator
4. **Maintain patterns:** Use existing `healthController.js` and test files as templates
