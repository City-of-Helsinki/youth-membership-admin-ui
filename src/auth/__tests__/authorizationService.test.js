import { getRole } from '../api/api';
import authorizationService, { PERMISSIONS } from '../authorizationService';

jest.mock('../api/api', () => ({
  getRole: jest.fn(),
}));

const setPermissions = (permissions = 'admin') => {
  sessionStorage.setItem(PERMISSIONS, permissions);

  expect(sessionStorage.getItem(PERMISSIONS)).toBe(permissions);
};

describe('authorizationService', () => {
  beforeEach(() => {
    sessionStorage.clear();
    sessionStorage.setItem.mockClear();
    jest.restoreAllMocks();
  });

  describe('fetchRole', () => {
    it('should throw an error if token is null', () => {
      expect(
        authorizationService.fetchRole(null)
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"No token found. Please authenticate before authorization."`
      );
    });

    it('should call getRole', async () => {
      expect.assertions(1);

      getRole.mockImplementation(() =>
        Promise.resolve({
          data: { role: 'admin' },
        })
      );

      await authorizationService.fetchRole('mock tokens');

      expect(getRole).toHaveBeenCalledTimes(1);
    });

    it('should save role into session storage', async () => {
      expect.assertions(1);
      const role = 'admin';

      getRole.mockImplementation(() =>
        Promise.resolve({
          data: { role },
        })
      );

      await authorizationService.fetchRole('mock tokens');

      expect(sessionStorage.getItem(PERMISSIONS)).toEqual(role);
    });
  });

  describe('isAuthorized', () => {
    it('should return true when a role is stored session storage', () => {
      setPermissions();
      expect(authorizationService.isAuthorized()).toEqual(true);
    });

    it('should return false when there is no role stored session storage', () => {
      expect(authorizationService.isAuthorized()).toEqual(false);
    });
  });

  describe('getRole', () => {
    it('should return current role in session storage', () => {
      setPermissions();
      expect(authorizationService.getRole()).toEqual('admin');
    });
  });

  describe('clear', () => {
    it('should clear permissions from session storage', () => {
      setPermissions();
      authorizationService.clear();
      expect(sessionStorage.getItem(PERMISSIONS)).toBe(null);
    });
  });
});
