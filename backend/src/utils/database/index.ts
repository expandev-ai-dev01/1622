import sql from 'mssql';
import { config } from '@/config';

/**
 * @enum ExpectedReturn
 * @description Expected return types from database operations
 */
export enum ExpectedReturn {
  None = 'None',
  Single = 'Single',
  Multi = 'Multi',
}

/**
 * @interface IRecordSet
 * @description Generic record set interface
 */
export interface IRecordSet<T = any> {
  [key: number]: T;
  length: number;
}

/**
 * @interface ICreateObjectResult
 * @description Standard result for object creation operations
 */
export interface ICreateObjectResult {
  id: number;
}

let pool: sql.ConnectionPool | null = null;

/**
 * @summary Get database connection pool
 * @description Returns existing pool or creates new one
 */
export async function getPool(): Promise<sql.ConnectionPool> {
  if (!pool) {
    pool = await sql.connect(config.database);
  }
  return pool;
}

/**
 * @summary Execute database request
 * @description Executes stored procedure with parameters
 *
 * @param routine Stored procedure name (e.g., '[schema].[spProcedure]')
 * @param parameters Object with procedure parameters
 * @param expectedReturn Expected return type
 * @param transaction Optional transaction object
 * @param resultSetNames Optional names for result sets
 * @returns Query results based on expectedReturn type
 */
export async function dbRequest(
  routine: string,
  parameters: { [key: string]: any },
  expectedReturn: ExpectedReturn,
  transaction?: sql.Transaction,
  resultSetNames?: string[]
): Promise<any> {
  try {
    const currentPool = transaction || (await getPool());
    const request = currentPool.request();

    /**
     * @remarks Add parameters to request
     */
    Object.keys(parameters).forEach((key) => {
      request.input(key, parameters[key]);
    });

    /**
     * @remarks Execute stored procedure
     */
    const result = await request.execute(routine);

    /**
     * @remarks Process results based on expected return type
     */
    switch (expectedReturn) {
      case ExpectedReturn.None:
        return null;

      case ExpectedReturn.Single:
        return result.recordset && result.recordset.length > 0 ? result.recordset[0] : null;

      case ExpectedReturn.Multi:
        if (resultSetNames && resultSetNames.length > 0) {
          const namedResults: { [key: string]: IRecordSet } = {};
          resultSetNames.forEach((name, index) => {
            namedResults[name] = result.recordsets[index] || [];
          });
          return namedResults;
        }
        return result.recordsets;

      default:
        return result.recordset;
    }
  } catch (error: any) {
    console.error('Database request error:', {
      routine,
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
}

/**
 * @summary Begin database transaction
 */
export async function beginTransaction(): Promise<sql.Transaction> {
  const currentPool = await getPool();
  const transaction = new sql.Transaction(currentPool);
  await transaction.begin();
  return transaction;
}

/**
 * @summary Commit database transaction
 */
export async function commitTransaction(transaction: sql.Transaction): Promise<void> {
  await transaction.commit();
}

/**
 * @summary Rollback database transaction
 */
export async function rollbackTransaction(transaction: sql.Transaction): Promise<void> {
  await transaction.rollback();
}

/**
 * @summary Close database connection pool
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.close();
    pool = null;
  }
}
