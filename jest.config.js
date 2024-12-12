export default {
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup-after-env.js',
  ],
  moduleNameMapper: {
    '^(@.*)$': '<rootDir>/node_modules/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^sequelize/(.*)$': '<rootDir>/node_modules/sequelize/$1',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
}
