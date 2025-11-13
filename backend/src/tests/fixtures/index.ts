/**
 * @summary Test data fixtures
 * @description Shared test data for use across test suites
 */

/**
 * @summary Mock account data
 */
export const mockAccount = {
  idAccount: 1,
  name: 'Test Account',
  active: true,
};

/**
 * @summary Mock user data
 */
export const mockUser = {
  idUser: 1,
  idAccount: 1,
  name: 'Test User',
  email: 'test@example.com',
};

/**
 * @summary Mock credential data
 */
export const mockCredential = {
  idAccount: 1,
  idUser: 1,
};
