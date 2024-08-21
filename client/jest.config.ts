import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    roots: ['<rootDir>/src'],
    testEnvironment: 'jsdom',
    preset: 'ts-jest',};

export default config;
