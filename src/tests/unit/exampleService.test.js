const exampleService = require('../../services/exampleService');

describe('exampleService', () => {
  test('should return service info', () => {
    const result = exampleService.getInfo();
    expect(result).toBeDefined();
    expect(result.status).toBe('OK');
    expect(result.message).toBe('Service is running properly');
    expect(result.version).toBe('1.0.0');
    expect(result).toHaveProperty('timestamp');
    expect(result).toHaveProperty('exampleCount');
  });
});