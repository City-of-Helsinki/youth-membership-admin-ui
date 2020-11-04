import { AuthProvider } from 'ra-core';

import authService from './authService';
import authorizationService from './authorizationService';

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
    const apiTokens = authService.getTokens();
    const hasTokens =
      apiTokens && Object.keys(JSON.stringify(apiTokens)).length === 2;

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
