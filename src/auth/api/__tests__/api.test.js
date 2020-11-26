import client from '../../../graphql/client';
import { getRole } from '../api';

const fakeToken = 'fake token';

describe('auth/api', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getRole', () => {
    it('should return admin when client query resolves', async () => {
      expect.assertions(1);
      jest.spyOn(client, 'query').mockResolvedValue({});

      return expect(getRole(fakeToken)).resolves.toEqual({
        data: { role: 'admin' },
      });
    });

    it('should return none when client query rejects', async () => {
      expect.assertions(1);
      jest.spyOn(client, 'query').mockRejectedValue({});

      return expect(getRole(fakeToken)).resolves.toEqual({
        data: { role: 'none' },
      });
    });
  });
});
