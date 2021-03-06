import authProvider from '../authProvider';
import authService from '../authService';
import authorizationService from '../authorizationService';

const fakeTokens = JSON.stringify({
  [process.env.REACT_APP_PROFILE_AUDIENCE]: 'token content',
  [process.env.REACT_APP_JASSARI_AUDIENCE]: 'token content',
});

describe('authProvider', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('login', () => {
    it('should call authService with expected params', async () => {
      const authServiceLoginSpy = jest
        .spyOn(authService, 'login')
        .mockResolvedValue();

      await authProvider.login('/youthProfiles');

      expect(authServiceLoginSpy).toHaveBeenCalledTimes(1);
      expect(authServiceLoginSpy).toHaveBeenLastCalledWith('/youthProfiles');
    });
  });

  describe('logout', () => {
    it('should logout using authService when user is authenticated according to authService', async () => {
      const authServiceIsAuthenticatedSpy = jest
        .spyOn(authService, 'isAuthenticated')
        .mockImplementation(() => true);
      const authServiceLogoutSpy = jest
        .spyOn(authService, 'logout')
        .mockResolvedValue();

      await authProvider.logout();

      expect(authServiceIsAuthenticatedSpy).toHaveBeenCalledTimes(1);
      expect(authServiceLogoutSpy).toHaveBeenCalledTimes(1);
    });

    it('should not logout when user is not authenticated according to authService', async () => {
      const authServiceIsAuthenticatedSpy = jest
        .spyOn(authService, 'isAuthenticated')
        .mockImplementation(() => false);
      const authServiceLogoutSpy = jest
        .spyOn(authService, 'logout')
        .mockResolvedValue();

      await authProvider.logout();

      expect(authServiceIsAuthenticatedSpy).toHaveBeenCalledTimes(1);
      expect(authServiceLogoutSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('checkAuth', () => {
    it('should resolve when user is not authenticated according to authService', () => {
      expect.assertions(1);
      jest.spyOn(authService, 'isAuthenticated').mockImplementation(() => true);

      return expect(authProvider.checkAuth()).resolves.toEqual();
    });

    it('should reject when user is not authenticated according to authService', () => {
      expect.assertions(1);
      jest
        .spyOn(authService, 'isAuthenticated')
        .mockImplementation(() => false);

      return expect(authProvider.checkAuth()).rejects.toEqual();
    });
  });

  describe('checkError', () => {
    it('should resolve when tokens are present', () => {
      expect.assertions(1);
      jest.spyOn(authService, 'getTokens').mockImplementation(() => fakeTokens);

      return expect(authProvider.checkError()).resolves.toEqual();
    });

    it('should reject when required tokens are missing', () => {
      expect.assertions(1);
      jest.spyOn(authService, 'getTokens').mockImplementation(() =>
        JSON.stringify({
          'https://unrelated-audience.com': 'token content',
          [process.env.REACT_APP_PROFILE_AUDIENCE]: 'token content',
        })
      );

      return expect(authProvider.checkError()).rejects.toEqual();
    });
  });

  describe('getPermissions', () => {
    it('should find permissions by using the authorizationService', () => {
      expect.assertions(1);
      const role = 'admin';

      jest.spyOn(authorizationService, 'getRole').mockReturnValue(role);

      return expect(authProvider.getPermissions()).resolves.toEqual(role);
    });
  });
});
