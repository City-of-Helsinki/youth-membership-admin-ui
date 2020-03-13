import {
  Profile_profile as Profile,
  YouthLanguage,
} from '../../../../graphql/generatedTypes';
import { getName, getSchool, getAddress } from '../utils';

const defaultProfile: Profile = {
  id: '',
  firstName: 'Samantha',
  lastName: 'Superstar',
  primaryAddress: {
    address: 'Test street 1',
    postalCode: '12345',
    city: 'TheCity',
  },
  primaryEmail: {
    email: '',
  },
  primaryPhone: {
    phone: '',
  },
  youthProfile: {
    membershipNumber: '',
    schoolClass: 'A1',
    schoolName: 'Super school',
    birthDate: '',
    photoUsageApproved: true,
    languageAtHome: YouthLanguage.FINNISH,
    approverFirstName: 'Galileo',
    approverLastName: 'Guardian',
    approverPhone: '',
    approverEmail: '',
  },
};

type GetProfile = {
  [key: string]: string | undefined | { [key: string]: string };
};

const getProfile = (newFields: GetProfile) => {
  return {
    ...defaultProfile,
    ...newFields,
  };
};

describe('getName tests', () => {
  test('returns childs name', () => {
    const name = getName(defaultProfile, 'youth');
    expect(name).toEqual('Samantha Superstar');
  });

  test('returns approver name', () => {
    const name = getName(defaultProfile, 'approver');
    expect(name).toEqual('Galileo Guardian');
  });
});

describe('getSchool tests', () => {
  test('returns both school and class separated with comma', () => {
    const school = getSchool(defaultProfile);
    expect(school).toEqual('Super school, A1');
  });

  test('has only school name', () => {
    const profile = getProfile({
      youthProfile: { schoolName: 'Super school' },
    });
    const school = getSchool(profile);
    expect(school).toEqual('Super school');
  });

  test('has only class name', () => {
    const profile = getProfile({ youthProfile: { schoolClass: 'A1' } });
    const className = getSchool(profile);
    expect(className).toEqual('A1');
  });
});

describe('getAddress tests', () => {
  test('return whole address', () => {
    const school = getAddress(defaultProfile);
    expect(school).toEqual('Test street 1, 12345 TheCity');
  });

  test('has postal code & city ', () => {
    const profile = getProfile({
      primaryAddress: { postalCode: '12345', city: 'TheCity' },
    });
    const school = getAddress(profile);
    expect(school).toEqual('12345 TheCity');
  });

  test('has only street name', () => {
    const profile = getProfile({
      primaryAddress: { address: 'Test street 1' },
    });
    const school = getAddress(profile);
    expect(school).toEqual('Test street 1 ');
  });

  test('has only postal code', () => {
    const profile = getProfile({ primaryAddress: { postalCode: '12345' } });
    const school = getAddress(profile);
    expect(school).toEqual('12345 ');
  });

  test('has only city', () => {
    const profile = getProfile({ primaryAddress: { city: 'TheCity' } });
    const school = getAddress(profile);
    expect(school).toEqual(' TheCity');
  });
});
