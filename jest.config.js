/* eslint-disable no-undef */
module.exports = {
  roots: ['<rootDir>/src'],
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*protocols.ts',
    '!<rootDir>/src/**/protocols/*.ts',
    '!<rootDir>/src/main/server.ts',
    '!<rootDir>/src/main/config/env.ts',
  ],
  transform: {
    '.+\\.ts': 'ts-jest',
  },
};
