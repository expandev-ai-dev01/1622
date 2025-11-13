/**
 * @summary Global test setup
 * @description Configuration and utilities for test environment
 */

import dotenv from 'dotenv';

/**
 * @remarks Load test environment variables
 */
dotenv.config({ path: '.env.test' });

/**
 * @remarks Set test environment
 */
process.env.NODE_ENV = 'test';

/**
 * @summary Global test timeout
 */
jest.setTimeout(30000);

/**
 * @summary Mock console methods in tests
 */
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
  log: jest.fn(),
};
