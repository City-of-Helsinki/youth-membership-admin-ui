// @ts-ignore
require('dotenv').config({ path: '.env' });

function getEnvOrError(key: string) {
  const variable = process.env[key];

  if (!variable) {
    throw new Error(`No ${key} specified.`);
  }

  return variable;
}

export const username = (): string => getEnvOrError('BROWSER_TESTING_USERNAME');

export const usernameNoAccess = (): string =>
  getEnvOrError('BROWSER_TESTING_USERNAME_NO_ACCESS');

export const password = (): string => getEnvOrError('BROWSER_TESTING_PASSWORD');

export const testUrl = (): string => getEnvOrError('BROWSER_TESTING_URL');

// optional, this cannot set on review environment, id is different on every environment
export const userYouthProfileId = (): string => {
  const profileId = process.env.BROWSER_TESTING_EXISTING_USER_YOUTH_PROFILE_ID ?? '';
  // hack for devops pipelines
  if ( profileId == 'undefined') {
    return '';
  }
  return `${profileId}`;
}

export const userFirstName = (): string =>
  getEnvOrError('BROWSER_TESTING_EXISTING_USER_FIRST_NAME');

export const userLastName = (): string =>
  getEnvOrError('BROWSER_TESTING_EXISTING_USER_LAST_NAME');

// open-city-profile
// are needed to add client id to profile
export const openCityProfileURL = (): string => {
  const baseUrl = process.env.BROWSER_TESTING_OPEN_CITY_PROFILE_URL ?? '';

  return `${baseUrl}`;
};
export const openCityProfileUsername = (): string => {
  if (!process.env.BROWSER_TESTING_OPEN_CITY_PROFILE_USERNAME) {
    throw new Error('No BROWSER_TESTING_OPEN_CITY_PROFILE_USERNAME specified');
  }
  return process.env.BROWSER_TESTING_OPEN_CITY_PROFILE_USERNAME;
};
export const openCityProfilePassword = (): string => {
  if (!process.env.BROWSER_TESTING_OPEN_CITY_PROFILE_PASSWORD) {
    throw new Error('No BROWSER_TESTING_OPEN_CITY_PROFILE_PASSWORD specified');
  }

  return process.env.BROWSER_TESTING_OPEN_CITY_PROFILE_PASSWORD;
};
export const openCityProfileClientId = (): string => {
  if (!process.env.BROWSER_TESTING_OPEN_CITY_PROFILE_CLIENTID) {
    throw new Error('No BROWSER_TESTING_OPEN_CITY_PROFILE_CLIENTID specified');
  }

  return process.env.BROWSER_TESTING_OPEN_CITY_PROFILE_CLIENTID;
};


// api variables
const getApiBaseUrl = () => {
  const url = process.env['BROWSER_TESTS_API_URL'] ?? '';

  // API url might point to graphql, remove
  var re = /\/graphql$/;
  return url.replace(re, "");
};

// optional variable for API to ensure tunnistamo user accesses
export const apiUrl = (): string => getApiBaseUrl();

export const apiUsername = (): string => {
  if (!process.env.BROWSER_TESTING_API_USERNAME) {
    throw new Error('No BROWSER_TESTING_API_USERNAME specified');
  }
  return process.env.BROWSER_TESTING_API_USERNAME;
};
export const apiPassword = (): string => {
  if (!process.env.BROWSER_TESTING_API_PASSWORD) {
    throw new Error('No BROWSER_TESTING_API_PASSWORD specified');
  }

  return process.env.BROWSER_TESTING_API_PASSWORD;
};