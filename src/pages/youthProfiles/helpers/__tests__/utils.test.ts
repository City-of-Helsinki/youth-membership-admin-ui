import {
  AddressType,
  Language,
  MembershipStatus,
  Profile_profile as Profile,
  YouthLanguage,
} from '../../../../graphql/generatedTypes';
import { getAddress, getName, getSchool } from '../utils';

const defaultProfile: Profile = {
  id: '',
  firstName: 'Samantha',
  lastName: 'Superstar',
  language: Language.FINNISH,
  addresses: {
    edges: [],
  },
  primaryAddress: {
    id: '1',
    address: 'Test street 1',
    postalCode: '12345',
    city: 'TheCity',
    countryCode: 'FI',
    addressType: AddressType.OTHER,
    primary: true,
  },
  primaryEmail: {
    id: '2',
    email: '',
  },
  primaryPhone: {
    id: '3',
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
    expiration: '2020-07-31',
    membershipStatus: MembershipStatus.ACTIVE,
    renewable: false,
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
    const address = getAddress(defaultProfile);
    expect(address).toEqual('Test street 1, 12345, TheCity, Suomi');
  });

  test('has postal code & city & country', () => {
    const profile = getProfile({
      primaryAddress: { postalCode: '12345', city: 'TheCity' },
    });
    const address = getAddress(profile);
    expect(address).toEqual('12345, TheCity, Suomi');
  });

  test('has street name and country', () => {
    const profile = getProfile({
      primaryAddress: { address: 'Test street 1' },
    });
    const address = getAddress(profile);
    expect(address).toEqual('Test street 1, Suomi');
  });

  test('has postal code and country', () => {
    const profile = getProfile({ primaryAddress: { postalCode: '12345' } });
    const address = getAddress(profile);
    expect(address).toEqual('12345, Suomi');
  });

  test('has city and country', () => {
    const profile = getProfile({ primaryAddress: { city: 'TheCity' } });
    const address = getAddress(profile);
    expect(address).toEqual('TheCity, Suomi');
  });
});
