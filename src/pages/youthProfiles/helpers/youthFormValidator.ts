import Validator from 'validator';
import { get, set } from 'lodash';
import { differenceInYears } from 'date-fns';

import { FormValues } from '../types/youthProfileTypes';
import {
  Language,
  Profile_profile_addresses_edges_node as Address,
  Profile_profile_primaryAddress as PrimaryAddress,
  YouthLanguage,
} from '../../../graphql/generatedTypes';
import youthProfileConstants from '../constants/youthProfileConstants';

const REQUIRED_FIELDS = [
  'firstName',
  'lastName',
  'birthDate',
  'email',
  'phone',
  'primaryAddress',
  'approverFirstName',
  'approverLastName',
  'approverEmail',
  'approverPhone',
];

const APPROVAL_FIELDS = [
  'approverFirstName',
  'approverLastName',
  'approverEmail',
  'approverPhone',
];

const REQUIRED_ADDRESS_FIELDS = ['address', 'postalCode', 'city'];

const EMAIL_FIELDS = ['email', 'approverEmail'];

type AddressError = {
  address?: string;
  postalCode?: string;
  city?: string;
};

export type ValidationErrors = {
  firstName?: string;
  lastName?: string;
  primaryAddress?: AddressError;
  addresses?: AddressError[];
  email?: string;
  phone?: string;
  birthDate?: string;
  schoolName?: string;
  schoolClass?: string;
  languageAtHome?: YouthLanguage;
  profileLanguage?: Language;
  photoUsageApproved?: string;
  approverFirstName?: string;
  approverLastName?: string;
  approverEmail?: string;
  approverPhone?: string;
};

type LengthOptions = {
  min?: number;
  max?: number;
};

const schema = {
  firstName: { min: 2, max: 255 },
  lastName: { min: 2, max: 255 },
  phone: { min: 2, max: 255 },
  schoolName: { max: 128 },
  schoolClass: { max: 128 },
  approverFirstName: { min: 2, max: 255 },
  approverLastName: { min: 2, max: 255 },
  approverPhone: { min: 2, max: 255 },
  postalCode: { min: 5, max: 5 },
  address: { min: 2, max: 255 },
  city: { min: 2, max: 255 },
};

const checkAgeDateString = (dateString: string) => {
  const splitString = dateString.split('-');
  const day = splitString[2];
  const month = splitString[1];
  const year = splitString[0];
  return day.length > 0 && month.length > 0 && year.length > 0;
};

const isRequiredError = (
  field: keyof FormValues,
  value: string | PrimaryAddress | Address[]
) => {
  // If value is included in APPROVER_FIELDS return, these are validated later
  if (APPROVAL_FIELDS.includes(field)) return '';
  if (
    REQUIRED_FIELDS.includes(field) &&
    !value &&
    field !== 'primaryAddress' &&
    field !== 'addresses'
  ) {
    return 'validation.required';
  }

  if (field === 'primaryAddress') {
    const primaryAddressError = {};
    (Object.keys(value) as Array<keyof typeof value>).forEach((key) => {
      if (REQUIRED_ADDRESS_FIELDS.includes(key) && !value[key]) {
        set(primaryAddressError, key, 'validation.required');
      }
    });
    return primaryAddressError;
  }

  return '';
};

// Check min and max separately. Its easier than trying to pass these values to translation
const isProperLength = (value: string, options: LengthOptions) => {
  // Check min length
  if (!Validator.isLength(value, { min: options.min || 0 }))
    return 'validation.tooShort';
  // Check max length
  if (!Validator.isLength(value, { max: options.max || 255 }))
    return 'validation.tooLong';
  return '';
};

const youthFormValidator = (formValues: FormValues) => {
  const fv: FormValues = {
    ...formValues,
  };

  // If user hasn't touched fields values will be empty, add required fields into object for validation
  (REQUIRED_FIELDS as Array<keyof typeof formValues>).forEach((key) => {
    if (!fv[key]) {
      set(fv, key, '');
    }
  });

  const errors: ValidationErrors = {};

  (Object.keys(fv) as Array<keyof typeof formValues>).forEach((value) => {
    if (REQUIRED_FIELDS.includes(value) || formValues[value]) {
      const requiredError = isRequiredError(value, formValues[value]);

      if (requiredError) {
        set(errors, value, requiredError);
      }

      if (value === 'birthDate' && formValues[value]?.length > 0) {
        const isValidAgeString = checkAgeDateString(formValues[value]);
        const age = differenceInYears(new Date(), new Date(formValues[value]));
        if (!isValidAgeString || !Number(age))
          return (errors[value] = 'validation.birthDate');
        if (
          age > youthProfileConstants.PROFILE_CREATION.AGE_MAX ||
          age < youthProfileConstants.PROFILE_CREATION.AGE_MIN
        )
          return (errors[value] = 'validation.ageRestriction');
      }

      // Approver fields validation is based on age
      if (APPROVAL_FIELDS.includes(value) && formValues.birthDate) {
        const isValidAgeString = checkAgeDateString(formValues.birthDate);
        const age = differenceInYears(
          new Date(),
          new Date(formValues.birthDate)
        );
        if (
          isValidAgeString &&
          Number(age) &&
          age < youthProfileConstants.PROFILE_CREATION.AGE_ADULT &&
          !formValues[value]
        ) {
          return set(errors, value, 'validation.required');
        }
        // If values exist execute checks below, otherwise return
        // to prevent unwanted email, min & max errors.
        if (!formValues[value]) return;
      }

      // Validate emails
      if (
        EMAIL_FIELDS.includes(value) &&
        typeof formValues[value] === 'string'
      ) {
        // Emails are always strings
        if (!Validator.isEmail(formValues[value] as string)) {
          set(errors, value, 'validation.email');
        }
      }

      // Validate min & max
      if (get(schema, value) && formValues[value]) {
        const error = isProperLength(
          formValues[value] as string,
          get(schema, value)
        );
        if (error) set(errors, value, error);
      }

      if (value === 'primaryAddress') {
        const primaryAddress = formValues['primaryAddress'];
        (Object.keys(primaryAddress) as Array<
          keyof typeof primaryAddress
        >).forEach((key) => {
          if (REQUIRED_ADDRESS_FIELDS.includes(key)) {
            const error = isProperLength(
              primaryAddress[key] as string,
              get(schema, key)
            );
            if (error && !get(errors, `primaryAddress[${key}]`))
              set(errors, `primaryAddress[${key}]`, error);
          }
        });
      }
    }
  });

  return errors;
};

export default youthFormValidator;
