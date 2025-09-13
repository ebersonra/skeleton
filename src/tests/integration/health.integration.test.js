const healthController = require('../../controllers/healthController');
const exampleService = require('../../services/exampleService');
const ExampleModel = require('../../models/exampleModel');

// Mock do response object
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

// Mock do request object
const mockRequest = (body = {}, params = {}, query = {}) => ({
  body,
  params,
  query,
});

describe('Integration Tests - Controller + Service + Model', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    
    // Reset mocks
    jest.clearAllMocks();
  });

  describe('Health Controller Integration', () => {
    test('should integrate controller -> service -> model flow', () => {
      // Arrange: Mock do modelo para retornar um valor específico
      const originalCount = ExampleModel.count;
      ExampleModel.count = jest.fn().mockReturnValue(5);

      // Act: Chama o controller
      healthController(req, res);

      // Assert: Verifica toda a cadeia de integração
      expect(ExampleModel.count).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        status: 'OK',
        timestamp: expect.any(String),
        message: 'Service is running properly',
        version: '1.0.0',
        exampleCount: 5
      });

      // Restore original function
      ExampleModel.count = originalCount;
    });

    test('should handle service layer correctly', () => {
      // Arrange: Spy no service
      const serviceInfoSpy = jest.spyOn(exampleService, 'getInfo');

      // Act
      healthController(req, res);

      // Assert: Verifica se o service foi chamado
      expect(serviceInfoSpy).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'OK',
          message: 'Service is running properly',
          version: '1.0.0'
        })
      );

      // Cleanup
      serviceInfoSpy.mockRestore();
    });

    test('should return valid timestamp format', () => {
      // Act
      healthController(req, res);

      // Assert: Verifica formato do timestamp
      const calledWith = res.json.mock.calls[0][0];
      expect(calledWith.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
      expect(new Date(calledWith.timestamp)).toBeInstanceOf(Date);
    });
  });

  describe('Service Integration with Model', () => {
    test('should integrate service with model correctly', () => {
      // Arrange: Mock do modelo
      const mockCount = jest.spyOn(ExampleModel, 'count').mockReturnValue(10);

      // Act: Chama diretamente o service
      const result = exampleService.getInfo();

      // Assert: Verifica integração service -> model
      expect(ExampleModel.count).toHaveBeenCalled();
      expect(result).toEqual({
        status: 'OK',
        timestamp: expect.any(String),
        message: 'Service is running properly',
        version: '1.0.0',
        exampleCount: 10
      });

      // Cleanup
      mockCount.mockRestore();
    });

    test('should handle model changes dynamically', () => {
      // Arrange: Simula mudanças no modelo
      const originalCount = ExampleModel.count;
      let counter = 0;
      ExampleModel.count = jest.fn(() => ++counter);

      // Act: Múltiplas chamadas
      const result1 = exampleService.getInfo();
      const result2 = exampleService.getInfo();

      // Assert: Verifica que o model é chamado dinamicamente
      expect(result1.exampleCount).toBe(1);
      expect(result2.exampleCount).toBe(2);
      expect(ExampleModel.count).toHaveBeenCalledTimes(2);

      // Restore
      ExampleModel.count = originalCount;
    });
  });

  describe('Error Handling Integration', () => {
    test('should handle service errors gracefully', () => {
      // Arrange: Force um erro no service
      const originalGetInfo = exampleService.getInfo;
      exampleService.getInfo = jest.fn(() => {
        throw new Error('Service error');
      });

      // Act & Assert: Verifica se o erro é propagado
      expect(() => {
        healthController(req, res);
      }).toThrow('Service error');

      // Restore
      exampleService.getInfo = originalGetInfo;
    });

    test('should handle model errors in service', () => {
      // Arrange: Force um erro no model
      const originalCount = ExampleModel.count;
      ExampleModel.count = jest.fn(() => {
        throw new Error('Model error');
      });

      // Act & Assert: Verifica propagação do erro
      expect(() => {
        exampleService.getInfo();
      }).toThrow('Model error');

      // Restore
      ExampleModel.count = originalCount;
    });
  });

  describe('Data Flow Integration', () => {
    test('should maintain data consistency across layers', () => {
      // Arrange: Setup conhecido
      const mockCount = jest.spyOn(ExampleModel, 'count').mockReturnValue(42);
      const serviceInfoSpy = jest.spyOn(exampleService, 'getInfo');

      // Act: Fluxo completo
      healthController(req, res);

      // Assert: Verifica consistência dos dados
      const serviceResult = serviceInfoSpy.mock.results[0].value;
      const controllerCall = res.json.mock.calls[0][0];

      expect(serviceResult).toEqual(controllerCall);
      expect(serviceResult.exampleCount).toBe(42);
      expect(controllerCall.exampleCount).toBe(42);

      // Cleanup
      mockCount.mockRestore();
      serviceInfoSpy.mockRestore();
    });
  });
});