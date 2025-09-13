const ExampleModel = require('../models/exampleModel');

function getInfo() {
  return {
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'Service is running properly',
    version: '1.0.0',
    exampleCount: ExampleModel.count()
  };
}

module.exports = { getInfo };
