import authService from '../../../../auth/authService';
import * as graphqlUtils from '../../../../graphql/apiUtils';
import { createProfiles } from '../YouthApi';

const mockParams = {
  data: {
    firstName: '',
    lastName: '',
    primaryAddress: {},
    addresses: [],
    email: '',
    phone: '',
    birthDate: '2006-02-02',
    schoolName: '',
    schoolClass: '',
    languageAtHome: '',
    profileLanguage: '',
    photoUsageApproved: '',
    approverFirstName: '',
    approverLastName: '',
    approverEmail: '',
    approverPhone: '',
    additionalContactPersons: [],
  },
};
const fakeTokens = JSON.stringify({
  [process.env.REACT_APP_PROFILE_AUDIENCE]: 'token content',
  [process.env.REACT_APP_JASSARI_AUDIENCE]: 'token content',
});
const profileId = 'id';
const helsinkiProfileSuccessResponse = {
  data: {
    createProfile: {
      profile: {
        id: profileId,
      },
    },
  },
};
const youthProfileSuccessResponse = {
  data: {
    createYouthProfile: {
      youthProfile: {
        id: 'id',
      },
    },
  },
};

describe('YouthApi', () => {
  let mutateHandlerSpy;
  let authServiceSpy;

  beforeEach(() => {
    authServiceSpy = jest
      .spyOn(authService, 'getTokens')
      .mockReturnValue(fakeTokens);
    mutateHandlerSpy = jest
      .spyOn(graphqlUtils, 'mutateHandler')
      .mockResolvedValueOnce(helsinkiProfileSuccessResponse)
      .mockResolvedValueOnce(youthProfileSuccessResponse);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create profiles', () => {
    it('should work', async () => {
      const res = await createProfiles(mockParams);

      expect(authServiceSpy).toHaveBeenCalledTimes(1);
      expect(mutateHandlerSpy).toHaveBeenCalledTimes(2);
      expect(res.data).toBeDefined();
    });

    it('should merge helsinki and youth profile creation responses', async () => {
      const res = await createProfiles(mockParams);

      expect(Object.keys(res.data)).toEqual([
        'createProfile',
        'createYouthProfile',
      ]);
    });

    it('should throw when there are no tokens', () => {
      jest.spyOn(authService, 'getTokens').mockReturnValue(null);

      return expect(createProfiles(mockParams)).rejects.toMatchInlineSnapshot(
        `[Error: Api tokens not found]`
      );
    });

    it('should throw when the token for helsinki profile is missing', () => {
      jest.spyOn(authService, 'getTokens').mockReturnValue(JSON.stringify({}));

      return expect(createProfiles(mockParams)).rejects.toMatchInlineSnapshot(
        `[Error: Token https://api.hel.fi/auth/helsinkiprofile not found]`
      );
    });

    it('should throw if helsinki profile creation fails', () => {
      jest
        .spyOn(graphqlUtils, 'mutateHandler')
        .mockReset()
        .mockRejectedValueOnce(new Error('Test error'))
        .mockResolvedValueOnce(youthProfileSuccessResponse);

      return expect(createProfiles(mockParams)).rejects.toMatchInlineSnapshot(
        `[Error: Test error]`
      );
    });

    it('should throw if profileId is missing', () => {
      jest
        .spyOn(graphqlUtils, 'mutateHandler')
        .mockReset()
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce(youthProfileSuccessResponse);

      return expect(createProfiles(mockParams)).rejects.toMatchInlineSnapshot(
        `[Error: Could not find profile id for newly created profile. Can't create youth profile.]`
      );
    });

    it('should throw if youth profile creation fails', () => {
      jest
        .spyOn(graphqlUtils, 'mutateHandler')
        .mockReset()
        .mockResolvedValueOnce(helsinkiProfileSuccessResponse)
        .mockRejectedValueOnce(new Error('Failed to create youth profile'));

      return expect(createProfiles(mockParams)).rejects.toMatchInlineSnapshot(
        `[Error: Failed to create youth profile]`
      );
    });
  });
});
