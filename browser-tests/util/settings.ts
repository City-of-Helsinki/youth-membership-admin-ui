// @ts-ignore
require('dotenv').config({ path: '.env' });

function getEnvOrError(key: string) {
  const variable = process.env[key];

  if (!variable) {
    throw new Error(`No ${key} specified.`);
  }

  return variable;
}

export const username = (): string =>
  getEnvOrError('REACT_APP_TESTING_USERNAME');

export const usernameNoAccess = (): string =>
  getEnvOrError('REACT_APP_TESTING_USERNAME_NO_ACCESS');

export const password = (): string =>
  getEnvOrError('REACT_APP_TESTING_PASSWORD');

export const testUrl = (): string => getEnvOrError('REACT_APP_BASE_URL');

export const userYouthProfileId = (): string =>
  getEnvOrError('REACT_APP_TESTING_EXISTING_USER_YOUTH_PROFILE_ID');

export const userFirstName = (): string =>
  getEnvOrError('REACT_APP_TESTING_EXISTING_USER_FIRST_NAME');

export const userLastName = (): string =>
  getEnvOrError('REACT_APP_TESTING_EXISTING_USER_LAST_NAME');
