/**
 * @summary Test helper functions
 * @description Shared utilities for test suites
 */

import { Request, Response } from 'express';

/**
 * @summary Create mock Express request
 */
export function mockRequest(options: Partial<Request> = {}): Partial<Request> {
  return {
    body: {},
    params: {},
    query: {},
    headers: {},
    ...options,
  };
}

/**
 * @summary Create mock Express response
 */
export function mockResponse(): Partial<Response> {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
  return res;
}

/**
 * @summary Create mock Express next function
 */
export function mockNext(): jest.Mock {
  return jest.fn();
}

/**
 * @summary Wait for async operations
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
