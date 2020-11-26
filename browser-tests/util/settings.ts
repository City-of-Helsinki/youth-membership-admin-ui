// @ts-ignore
require('dotenv').config({ path: '.env' });

export const username = (): string => {
  if (!process.env.BROWSER_TESTING_USERNAME) {
    throw new Error('No BROWSER_TESTING_USERNAME specified.');
  }
  return process.env.BROWSER_TESTING_USERNAME;
};
export const usernameNoAccess = (): string => {
  if (!process.env.BROWSER_TESTING_USERNAME_NO_ACCESS) {
    throw new Error('No BROWSER_TESTING_USERNAME_NO_ACCESS specified.');
  }
  return process.env.BROWSER_TESTING_USERNAME_NO_ACCESS;
};
export const password = (): string => {
  if (!process.env.BROWSER_TESTING_PASSWORD) {
    throw new Error('No BROWSER_TESTING_PASSWORD specified.');
  }
  return process.env.BROWSER_TESTING_PASSWORD;
};
export const testUrl = (): string => {
  if (!process.env.BROWSER_TESTING_URL) {
    throw new Error('No BROWSER_TESTING_URL specified.');
  }
  return process.env.BROWSER_TESTING_URL;
};
