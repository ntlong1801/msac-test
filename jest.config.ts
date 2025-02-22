import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@middlewares/(.*)': '<rootDir>/src/middlewares/$1',
    '@dto/(.*)': '<rootDir>/src/dto/$1',
    '@entities/(.*)': '<rootDir>/src/entities/$1',
    '@exceptions/(.*)': '<rootDir>/src/exceptions/$1',
    '@repositories/(.*)': '<rootDir>/src/repositories/$1',
    '@services/(.*)': '<rootDir>/src/services/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  verbose: true,
};

export default config;