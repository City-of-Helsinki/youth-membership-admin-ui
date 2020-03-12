import {
  Profile_profile as Profile,
  YouthLanguage,
} from '../../../../graphql/generatedTypes';
import { getName, getSchool, getAddress } from '../utils';

const profile: Profile = {
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

describe('getName tests', () => {
  test('returns childs name', () => {
    const name = getName(profile, 'youth');
    expect(name).toEqual('Samantha Superstar');
  });

  test('returns approver name', () => {
    const name = getName(profile, 'approver');
    expect(name).toEqual('Galileo Guardian');
  });
});

test('returns both school and class separated with comma', () => {
  const school = getSchool(profile);
  expect(school).toEqual('Super school, A1');
});

test('return whole address', () => {
  const school = getAddress(profile);
  expect(school).toEqual('Test street 1, 12345 TheCity');
});
