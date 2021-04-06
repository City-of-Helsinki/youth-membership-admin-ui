import axios from 'axios';

import authService, { API_TOKENS } from '../authService';
import authorizationService from '../authorizationService';

jest.mock('axios');
jest.mock('../api/api', () => ({
  getRole: jest.fn().mockResolvedValue({ data: { role: 'admin' } }),
}));

describe('authService', () => {
  const userManager = authService.userManager;
  const oidcUserKey = `oidc.user:${process.env.REACT_APP_OIDC_AUTHORITY}:${process.env.REACT_APP_OIDC_CLIENT_ID}`;

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem.mockClear();
    jest.restoreAllMocks();
  });

  describe('getUser', () => {
    it('should resolve to the user value which has been resolved from getUser', async () => {
      expect.assertions(1);
      const mockUser = { name: 'Sam Littel' };

      jest.spyOn(userManager, 'getUser').mockResolvedValueOnce(mockUser);

      const user = await authService.getUser();

      expect(user).toBe(mockUser);
    });
  });

  describe('getTokens', () => {
    it('should get API_TOKENS from localStorage', () => {
      authService.getTokens();

      expect(localStorage.getItem).toHaveBeenNthCalledWith(1, API_TOKENS);
    });
  });

  describe('isAuthenticated', () => {
    it('should return false if no token can be found', () => {
      jest.spyOn(authService, 'getTokens').mockReturnValue(null);

      expect(authService.isAuthenticated()).toBe(false);
    });

    it("should return false if oidc user from sessionStorage doesn't exist", () => {
      const apiTokens = '5ed3abc5-9b65-4879-8d09-3cd8499650ef';
      jest.spyOn(authService, 'getTokens').mockReturnValue(apiTokens);
      sessionStorage.clear();

      expect(authService.isAuthenticated()).toBe(false);
    });

    it("should return false if oidc user from sessionStorage doesn't have an access_token property", () => {
      const apiTokens = '5ed3abc5-9b65-4879-8d09-3cd8499650ef';
      const invalidUser = JSON.stringify({});

      jest.spyOn(authService, 'getTokens').mockReturnValue(apiTokens);
      sessionStorage.setItem(oidcUserKey, invalidUser);

      expect(authService.isAuthenticated()).toBe(false);
    });

    it('should return true if oidc user is valid and tokens are returned from getTokens', () => {
      const apiTokens = '5ed3abc5-9b65-4879-8d09-3cd8499650ef';
      const validUser = JSON.stringify({
        name: 'Mr. Louisa Tromp',
        /* eslint-disable-next-line @typescript-eslint/camelcase */
        access_token: '5ed3abc5-9b65-4879-8d09-3cd8499650ef',
      });

      jest.spyOn(authService, 'getTokens').mockReturnValue(apiTokens);
      sessionStorage.setItem(oidcUserKey, validUser);

      expect(authService.isAuthenticated()).toBe(true);
    });
  });

  describe('login', () => {
    it('should call signinRedirect from oidc with the provided path', () => {
      const path = '/applications';
      const signinRedirect = jest.spyOn(userManager, 'signinRedirect');

      authService.login(path);

      expect(signinRedirect).toHaveBeenNthCalledWith(1, { data: { path } });
    });
  });

  describe('endLogin', () => {
    axios.get.mockResolvedValue({ data: {} });
    /* eslint-disable-next-line @typescript-eslint/camelcase */
    const access_token = 'db237bc3-e197-43de-8c86-3feea4c5f886';
    const mockUser = {
      name: 'Penelope Krajcik',
      /* eslint-disable-next-line @typescript-eslint/camelcase */
      access_token,
    };

    it('should call signinRedirectCallback from oidc', () => {
      const signinRedirectCallback = jest
        .spyOn(userManager, 'signinRedirectCallback')
        .mockImplementation(() => Promise.resolve(mockUser));

      authService.endLogin();

      expect(signinRedirectCallback).toHaveBeenCalledTimes(1);
    });

    it('should call fetchRoles from authorizationService', async () => {
      expect.assertions(1);
      jest
        .spyOn(userManager, 'signinRedirectCallback')
        .mockReturnValue(Promise.resolve(mockUser));

      const fetchRoleSpy = jest
        .spyOn(authorizationService, 'fetchRole')
        .mockImplementation(() => Promise.resolve());

      await authService.endLogin();

      expect(fetchRoleSpy).toHaveBeenCalledTimes(1);
    });

    it('should return the same user object returned from signinRedirectCallback', async () => {
      expect.assertions(1);
      jest
        .spyOn(userManager, 'signinRedirectCallback')
        .mockReturnValue(Promise.resolve(mockUser));

      const user = await authService.endLogin();

      expect(user).toBe(mockUser);
    });

    it('should call fetchApiTokens with the user object', async () => {
      expect.assertions(1);
      jest.spyOn(authService, 'fetchApiTokens');
      jest
        .spyOn(userManager, 'signinRedirectCallback')
        .mockResolvedValue(mockUser);

      await authService.endLogin();

      expect(authService.fetchApiTokens).toHaveBeenNthCalledWith(1, mockUser);
    });

    it('should set the user in localStorage before the function returns', async () => {
      expect.assertions(1);
      jest
        .spyOn(userManager, 'signinRedirectCallback')
        .mockResolvedValue(mockUser);
      jest.spyOn(authService, 'fetchApiTokens');

      await authService.endLogin();

      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('renewToken', () => {
    it('should call signinSilent from oidc', () => {
      const signinSilent = jest.spyOn(userManager, 'signinSilent');

      authService.renewToken();

      expect(signinSilent).toHaveBeenCalledTimes(1);
    });

    it('should resolve to the user value which has been resolved from signinSilent', async () => {
      expect.assertions(1);
      const mockUser = { name: 'Camilla Howe' };

      jest.spyOn(userManager, 'signinSilent').mockResolvedValueOnce(mockUser);

      const user = await authService.renewToken();

      expect(user).toBe(mockUser);
    });
  });

  describe('logout', () => {
    it('should call signoutRedirect from oidc', () => {
      const signoutRedirect = jest.spyOn(userManager, 'signoutRedirect');

      authService.logout();

      expect(signoutRedirect).toHaveBeenCalledTimes(1);
    });

    it('should remove the tokens from localStorage', async () => {
      expect.assertions(1);
      jest.spyOn(userManager, 'signoutRedirect').mockResolvedValue(undefined);
      const apiTokens = 'a8d56df4-7ae8-4fbf-bf73-f366cd6fc479';

      localStorage.setItem(API_TOKENS, apiTokens);
      await authService.logout();

      expect(localStorage.getItem(API_TOKENS)).toBeNull();
    });

    it('should call clearStaleState', async () => {
      expect.assertions(1);
      jest.spyOn(userManager, 'signoutRedirect').mockResolvedValue(undefined);
      jest.spyOn(userManager, 'clearStaleState').mockResolvedValue();

      await authService.logout();

      expect(userManager.clearStaleState).toHaveBeenCalledTimes(1);
    });

    it("should call authorization service's clear method", async () => {
      expect.assertions(1);
      jest.spyOn(userManager, 'signoutRedirect').mockResolvedValue(undefined);
      const authorizationServiceClearSpy = jest.spyOn(
        authorizationService,
        'clear'
      );

      await authService.logout();

      expect(authorizationServiceClearSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetchApiTokens', () => {
    /* eslint-disable-next-line @typescript-eslint/camelcase */
    const access_token = 'db237bc3-e197-43de-8c86-3feea4c5f886';
    const mockUser = {
      name: 'Penelope Krajcik',
      /* eslint-disable-next-line @typescript-eslint/camelcase */
      access_token,
    };

    beforeEach(() => {
      axios.get.mockReset();

      axios.get.mockResolvedValue({
        data: {
          firstToken: '71ffd52c-5985-46d3-b445-490554f4012a',
          secondToken: 'de7c2a83-07f2-46bf-8417-8f648adbc7be',
        },
      });
    });

    it('should call axios.get with the right arguments', async () => {
      expect.assertions(2);
      await authService.fetchApiTokens(mockUser);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get.mock.calls[0]).toMatchSnapshot();
    });

    it('should call localStorage.setItem with the right arguments', async () => {
      expect.assertions(2);
      await authService.fetchApiTokens(mockUser);

      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem.mock.calls[0]).toMatchSnapshot();
    });
  });
});
