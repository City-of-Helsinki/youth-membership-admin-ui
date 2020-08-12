import { AuthProvider } from 'ra-core';

import userManager from './userManager';

const authProvider: AuthProvider = {
  login: (params) => Promise.resolve(),
  logout: async (params) => {
    localStorage.removeItem('apiToken');
    localStorage.removeItem('permissions');
    if (Boolean(await userManager.getUser())) {
      return '/logout';
    }
  },
  checkAuth: (params) => {
    if (localStorage.getItem('apiToken')) {
      return Promise.resolve();
    }
    return Promise.reject();
  },
  checkError: (error) => {
    // Trigger a logout if the apiToken is not in place
    return localStorage.getItem('apiToken')
      ? Promise.resolve()
      : Promise.reject();
  },
  getPermissions: () => {
    const role = localStorage.getItem('permissions');

    return Promise.resolve(role);
  },
};

export default authProvider;
