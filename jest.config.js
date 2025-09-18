export default {
  testEnvironment: 'node',
  
  // Sin transformaciones para ES Modules nativos
  transform: {},
  
  // Buscar tests
  testMatch: [
    '**/tests/**/*.test.js',
    '**/__tests__/**/*.js'
  ],
  
  // Ignorar carpetas
  testPathIgnorePatterns: [
    '/node_modules/',
    '/migrations/',
    '/seeders/'
  ],
  
  // Configuración para cobertura
  collectCoverageFrom: [
    'src/**/*.js',
    'controllers/**/*.js',
    '!src/app.js',
    '!src/server.js'
  ],
  
  // Configuración adicional
  verbose: true,
  clearMocks: true
};