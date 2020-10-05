import { Values } from '../../types/youthProfileTypes';
import {
  AddressType,
  Language,
  YouthLanguage,
} from '../../../../graphql/generatedTypes';
import youthFormValidator, { ValidationErrors } from '../youthFormValidator';

const values: Values = {
  firstName: 'Kalle',
  lastName: 'Kaakko',
  email: 'kalle@kaakko.fi',
  phone: '',
  addresses: [],
  profileLanguage: Language.FINNISH,
  primaryAddress: {
    postalCode: '1234567',
    city: 'a',
    address: '',
    primary: true,
    addressType: AddressType.OTHER,
    countryCode: 'FI',
    id: '123',
  },
  birthDate: '2005-01-01',
  schoolClass: '',
  schoolName: '',
  photoUsageApproved: '',
  languageAtHome: YouthLanguage.FINNISH,
  approverFirstName: '',
  approverLastName: '',
  approverEmail: 'incorrect.email',
  approverPhone: '',
  additionalContactPersons: [],
};

test('test validation functionality', () => {
  const errors: ValidationErrors = youthFormValidator(values);

  expect(errors.primaryAddress?.address).toEqual('validation.required');
  expect(errors.primaryAddress?.postalCode).toEqual('validation.tooLong');
  expect(errors.phone).toEqual('validation.required');
  expect(errors.approverEmail).toEqual('validation.email');
});

test('invalid date', () => {
  values.birthDate = '2005-13-1';
  const errors: ValidationErrors = youthFormValidator(values);
  expect(errors.birthDate).toEqual('validation.birthDate');
});

test('user is too young', () => {
  values.birthDate = '2019-1-1';
  const errors: ValidationErrors = youthFormValidator(values);
  expect(errors.birthDate).toEqual('validation.ageRestriction');
});

test('user is too old', () => {
  values.birthDate = '1900-1-1';
  const errors: ValidationErrors = youthFormValidator(values);
  expect(errors.birthDate).toEqual('validation.ageRestriction');
});

describe('test if approver fields are required', () => {
  test('user is under 18 years old', () => {
    values.birthDate = '2004-1-1';
    values.approverEmail = '';
    const errors: ValidationErrors = youthFormValidator(values);

    expect(errors.approverFirstName).toEqual('validation.required');
    expect(errors.approverLastName).toEqual('validation.required');
    expect(errors.approverPhone).toEqual('validation.required');
    expect(errors.approverEmail).toEqual('validation.email');
  });

  test('user is adult', () => {
    values.birthDate = '2000-1-1';
    values.approverEmail = '';
    const errors: ValidationErrors = youthFormValidator(values);
    expect(errors.approverFirstName).toBeFalsy();
    expect(errors.approverLastName).toBeFalsy();
    expect(errors.approverPhone).toBeFalsy();
    expect(errors.approverEmail).toBeFalsy();
  });
});

test('no empty object in error.primaryAddress when primaryAddress is valid', () => {
  const errors: ValidationErrors = youthFormValidator({
    ...values,
    primaryAddress: {
      postalCode: '00000',
      city: 'Helsinki',
      address: 'Konekuja 6',
      primary: true,
      addressType: AddressType.OTHER,
      countryCode: 'FI',
      id: '123',
    },
  });

  expect(errors.primaryAddress).toBeUndefined();
});

describe('additional contact person validation', () => {
  test('all fields are required for additional contact person', () => {
    const errors: ValidationErrors = youthFormValidator({
      ...values,
      additionalContactPersons: [
        {
          firstName: 'Jocelyn',
          lastName: 'Wu',
          phone: '000000000',
          email: 'fake@email.com',
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        {
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
        },
      ],
    });

    expect(errors.additionalContactPersons?.[1].firstName).toEqual(
      'validation.required'
    );
    expect(errors.additionalContactPersons?.[1].lastName).toEqual(
      'validation.required'
    );
    expect(errors.additionalContactPersons?.[1].phone).toEqual(
      'validation.required'
    );
    expect(errors.additionalContactPersons?.[1].email).toEqual(
      'validation.email'
    );
  });

  test('email needs to be an email', () => {
    const errors: ValidationErrors = youthFormValidator({
      ...values,
      additionalContactPersons: [
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        {
          email: 'not email like',
        },
      ],
    });

    expect(errors.additionalContactPersons?.[0].email).toEqual(
      'validation.email'
    );
  });
});
