module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  testEnvironment: 'node',
  testMatch: ['**/src/tests/**/*.test.{ts,tsx,js}'],
};
