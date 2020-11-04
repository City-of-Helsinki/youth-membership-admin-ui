import { AuthProvider } from 'ra-core';
import get from 'lodash/get';

import authService from './authService';
import authorizationService from './authorizationService';

function getEnv(
  value: Record<string, string>,
  key?: string
): string | undefined {
  if (!key) {
    return;
  }

  return get(value, key);
}

const authProvider: AuthProvider = {
  login: (next?: string) => authService.login(next),
  logout: async () => {
    const isAuthenticated = authService.isAuthenticated();

    // react-admin calls logout when there's an auth error which will
    // cause the user to be thrown into Tunnistamo. Because we do not
    // want that, we are avoiding logging out unless the user is
    // actually authenticated.
    if (isAuthenticated) {
      return authService.logout();
    }

    return Promise.resolve();
  },
  checkAuth: () => {
    const isAuthenticated = authService.isAuthenticated();

    if (isAuthenticated) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  checkError: () => {
    const apiTokens = JSON.parse(authService.getTokens() || '');
    const hasProfileToken =
      typeof getEnv(apiTokens, process.env.REACT_APP_PROFILE_AUDIENCE) ===
      'string';
    const hasJassariToken =
      typeof getEnv(apiTokens, process.env.REACT_APP_JASSARI_AUDIENCE) ===
      'string';
    const hasTokens = hasProfileToken && hasJassariToken;

    if (hasTokens) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: () => {
    const role = authorizationService.getRole();

    return Promise.resolve(role);
  },
};

export default authProvider;
