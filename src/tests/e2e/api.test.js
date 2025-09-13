const request = require('supertest');
const Server = require('../../server');

describe('E2E Tests - API Endpoints', () => {
  let app;
  let server;

  beforeAll(() => {
    // Cria uma instância do servidor para testes
    server = new Server();
    app = server.app;
  });

  afterAll(() => {
    // Limpa recursos se necessário
    if (server) {
      // No Express, não precisamos fechar explicitamente para testes
    }
  });

  describe('GET /api/health', () => {
    test('should return health status with 200', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('message');
      expect(response.body.status).toBe('OK');
    });

    test('should return JSON content-type', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('GET /api/nonexistent', () => {
    test('should return 404 for non-existent endpoints', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Not found');
    });
  });

  describe('Server CORS and Security Headers', () => {
    test('should include security headers', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      // Verifica se helmet está configurado (alguns headers de segurança)
      expect(response.headers).toHaveProperty('x-frame-options');
      expect(response.headers).toHaveProperty('x-content-type-options');
    });

    test('should handle CORS properly', async () => {
      const response = await request(app)
        .get('/api/health')
        .set('Origin', 'http://localhost:3000')
        .expect(200);

      // Verifica se CORS está configurado
      expect(response.headers).toHaveProperty('access-control-allow-origin');
    });
  });

  describe('Request Body Parsing', () => {
    test('should parse JSON body correctly (if POST endpoint existed)', async () => {
      // Como não temos POST endpoints, testamos que JSON é aceito
      const response = await request(app)
        .post('/api/health')
        .send({ test: 'data' })
        .set('Content-Type', 'application/json')
        .expect(404); // 404 porque POST /api/health não existe

      expect(response.body.error).toBe('Not found');
    });
  });

  describe('Static Files', () => {
    test('should serve static files from public directory', async () => {
      // Testa se arquivos estáticos são servidos (assumindo que index.html existe)
      await request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /html/);
    });
  });
});