import youthCreateFormValidator from '../youthCreateFormValidator';
import { Values, Errors, YouthSchema } from '../../types/youthProfileTypes';

const values: Values = {
  firstName: 'Kalle',
  lastName: 'Kaakko',
  email: 'kalle@kaakko.fi',
  phone: '',
  address: '',
  postalCode: '1234567',
  city: 'a',
  birthDate: '2005-01-01',
  schoolClass: '',
  schoolName: '',
  photoUsageApproved: '',
  languageAtHome: '',
  approverFirstName: '',
  approverLastName: '',
  approverEmail: 'incorrect.email',
  approverPhone: '',
};
const schema: YouthSchema = {
  firstName: {
    min: 2,
    max: 255,
  },
  lastName: {
    min: 2,
    max: 255,
  },
  email: {
    email: true,
  },
  phone: {
    min: 2,
    max: 255,
    required: true,
  },
  address: {
    min: 2,
    max: 255,
  },
  postalCode: {
    min: 5,
    max: 5,
  },
  city: {
    min: 2,
    max: 255,
  },
  birthDate: {
    birthDate: true,
  },
  schoolClass: { min: 2, max: 255 },
  schoolName: { min: 2, max: 255 },
  photoUsageApproved: {},
  languageAtHome: {},
  approverFirstName: { min: 2, max: 255 },
  approverLastName: { min: 2, max: 255 },
  approverEmail: { email: true },
  approverPhone: { min: 2, max: 255 },
};

test('test validation functionality', () => {
  const errors: Errors = youthCreateFormValidator(values, schema);

  expect(errors.phone).toEqual('validation.required');
  expect(errors.postalCode).toEqual('validation.tooLong');
  expect(errors.city).toEqual('validation.tooShort');
  expect(errors.approverEmail).toEqual('validation.email');
});

test('invalid date', () => {
  values.birthDate = '2005-13-1';
  const errors: Errors = youthCreateFormValidator(values, schema);
  expect(errors.birthDate).toEqual('validation.birthDate');
});

test('user is too young', () => {
  values.birthDate = '2019-1-1';
  const errors: Errors = youthCreateFormValidator(values, schema);
  expect(errors.birthDate).toEqual('validation.ageRestriction');
});

test('user is too old', () => {
  values.birthDate = '1900-1-1';
  const errors: Errors = youthCreateFormValidator(values, schema);
  expect(errors.birthDate).toEqual('validation.ageRestriction');
});
