// @ts-ignore
require('dotenv').config({ path: '.env.development.local' });

export const username = (): string => {
  if (!process.env.REACT_APP_TESTING_USERNAME) {
    throw new Error('No REACT_APP_TESTING_USERNAME specified.');
  }
  return process.env.REACT_APP_TESTING_USERNAME;
};
export const usernameNoAccess = (): string => {
  if (!process.env.REACT_APP_TESTING_USERNAME_NO_ACCESS) {
    throw new Error('No REACT_APP_TESTING_USERNAME_NO_ACCESS specified.');
  }
  return process.env.REACT_APP_TESTING_USERNAME_NO_ACCESS;
};
export const password = (): string => {
  if (!process.env.REACT_APP_TESTING_PASSWORD) {
    throw new Error('No REACT_APP_TESTING_PASSWORD specified.');
  }
  return process.env.REACT_APP_TESTING_PASSWORD;
};
export const testUrl = (): string => {
  if (!process.env.REACT_APP_BASE_URL) {
    throw new Error('No REACT_APP_BASE_URL specified.');
  }
  return process.env.REACT_APP_BASE_URL;
};
