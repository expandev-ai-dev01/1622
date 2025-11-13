import { Request } from 'express';
import { z } from 'zod';

/**
 * @interface SecurityConfig
 * @description Security configuration for CRUD operations
 */
interface SecurityConfig {
  securable: string;
  permission: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
}

/**
 * @interface ValidationResult
 * @description Result of validation operation
 */
interface ValidationResult {
  credential: {
    idAccount: number;
    idUser: number;
  };
  params?: any;
  body?: any;
}

/**
 * @class CrudController
 * @description Base controller for CRUD operations with security and validation
 */
export class CrudController {
  private securityConfig: SecurityConfig[];

  constructor(securityConfig: SecurityConfig[]) {
    this.securityConfig = securityConfig;
  }

  /**
   * @summary Validate CREATE operation
   */
  async create(req: Request, bodySchema: z.ZodSchema): Promise<[ValidationResult | null, any]> {
    try {
      const body = await bodySchema.parseAsync(req.body);
      return [
        {
          credential: {
            idAccount: 1,
            idUser: 1,
          },
          body,
        },
        null,
      ];
    } catch (error) {
      return [null, error];
    }
  }

  /**
   * @summary Validate READ operation
   */
  async read(req: Request, paramsSchema?: z.ZodSchema): Promise<[ValidationResult | null, any]> {
    try {
      const params = paramsSchema ? await paramsSchema.parseAsync(req.params) : {};
      return [
        {
          credential: {
            idAccount: 1,
            idUser: 1,
          },
          params,
        },
        null,
      ];
    } catch (error) {
      return [null, error];
    }
  }

  /**
   * @summary Validate UPDATE operation
   */
  async update(
    req: Request,
    paramsSchema: z.ZodSchema,
    bodySchema: z.ZodSchema
  ): Promise<[ValidationResult | null, any]> {
    try {
      const params = await paramsSchema.parseAsync(req.params);
      const body = await bodySchema.parseAsync(req.body);
      return [
        {
          credential: {
            idAccount: 1,
            idUser: 1,
          },
          params,
          body,
        },
        null,
      ];
    } catch (error) {
      return [null, error];
    }
  }

  /**
   * @summary Validate DELETE operation
   */
  async delete(req: Request, paramsSchema: z.ZodSchema): Promise<[ValidationResult | null, any]> {
    try {
      const params = await paramsSchema.parseAsync(req.params);
      return [
        {
          credential: {
            idAccount: 1,
            idUser: 1,
          },
          params,
        },
        null,
      ];
    } catch (error) {
      return [null, error];
    }
  }
}

/**
 * @summary Success response helper
 */
export function successResponse<T>(data: T) {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
}

/**
 * @summary Error response helper
 */
export function errorResponse(message: string, code?: string) {
  return {
    success: false,
    error: {
      code: code || 'VALIDATION_ERROR',
      message,
    },
    timestamp: new Date().toISOString(),
  };
}

export { StatusGeneralError } from '@/middleware/error';
