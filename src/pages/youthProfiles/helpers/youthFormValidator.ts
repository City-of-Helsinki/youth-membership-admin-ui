import Validator from 'validator';
import { get, set } from 'lodash';
import { differenceInYears } from 'date-fns';

import { FormValues } from '../types/youthProfileTypes';
import {
  Language,
  Profile_profile_addresses_edges_node as Address,
  Profile_profile_primaryAddress as PrimaryAddress,
  YouthLanguage,
  CreateAdditionalContactPersonInput,
  UpdateAdditionalContactPersonInput,
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
const REQUIRED_ADDITIONAL_CONTACT_PERSON_FIELDS = [
  'firstName',
  'lastName',
  'phone',
  'email',
];

const EMAIL_FIELDS = ['email', 'approverEmail'];

type AddressError = {
  address?: string;
  postalCode?: string;
  city?: string;
};

type AdditionalContactPerson =
  | CreateAdditionalContactPersonInput
  | UpdateAdditionalContactPersonInput;

type AdditionalContactPersonError = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
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
  additionalContactPersons?: AdditionalContactPersonError[];
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

function validateObject<T extends object>(
  object: T,
  fields: string[]
  // This type (attempts) implies an object whose keys can be found
  // from object T. Not all of T's keys must be present, but if the key
  // is present, its value is of type string.
): { [K in keyof T]?: string } | null {
  const error = {};

  (Object.keys(object) as Array<keyof typeof object>).forEach((key) => {
    if (fields.includes(key.toString()) && !object[key]) {
      set(error, key, 'validation.required');
    } else if (
      EMAIL_FIELDS.includes(key.toString()) &&
      !Validator.isEmail((object[key] as unknown) as string)
    ) {
      set(error, key, 'validation.email');
    }
  });

  if (Object.keys(error).length > 0) {
    return error;
  }

  return null;
}

const getAddressRequiredError = (
  address: Address | PrimaryAddress
): AddressError | null => {
  return validateObject(address, REQUIRED_ADDRESS_FIELDS);
};

const getContactPersonRequiredError = (
  additionalContactPerson: AdditionalContactPerson
): AdditionalContactPersonError | null => {
  return validateObject(
    additionalContactPerson,
    REQUIRED_ADDITIONAL_CONTACT_PERSON_FIELDS
  );
};

const isRequiredError = (
  field: keyof FormValues,
  value: string | PrimaryAddress | Address[] | AdditionalContactPerson[]
): string | AddressError | AddressError[] | AdditionalContactPersonError[] => {
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
    const castValue = value as PrimaryAddress;

    return getAddressRequiredError(castValue) || '';
  }

  if (field === 'addresses') {
    const castValue = value as Address[];

    return castValue
      .map((address) => getAddressRequiredError(address))
      .filter((error): error is AddressError => error !== null);
  }

  if (field === 'additionalContactPersons') {
    const castValue = value as AdditionalContactPerson[];

    return castValue
      .map((additionalContactPerson) =>
        getContactPersonRequiredError(additionalContactPerson)
      )
      .filter((error): error is AdditionalContactPersonError => error !== null);
  }

  return '';
};

const getAddressFieldError = (
  address: Address | PrimaryAddress
): AddressError | null => {
  const addressError = {};

  (Object.keys(address) as Array<keyof typeof address>).forEach((key) => {
    if (REQUIRED_ADDRESS_FIELDS.includes(key)) {
      const error = isProperLength(address[key] as string, get(schema, key));

      if (error) set(addressError, key, error);
    }
  });

  if (Object.keys(addressError).length > 0) {
    return addressError;
  }

  return null;
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

      if (requiredError && !Array.isArray(requiredError)) {
        set(errors, value, requiredError);
      }

      if (
        requiredError &&
        Array.isArray(requiredError) &&
        requiredError.length > 0
      ) {
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
        const primaryAddressErrors = getAddressFieldError(primaryAddress);

        if (primaryAddressErrors) {
          const currentErrors = errors.primaryAddress || {};

          // Avoid overwriting required errors
          set(errors, 'primaryAddress', {
            ...primaryAddressErrors,
            ...currentErrors,
          });
        }
      }

      if (value === 'addresses') {
        const addresses = formValues['addresses'];

        addresses.forEach((address, i) => {
          const addressErrors = getAddressFieldError(address);

          if (addressErrors) {
            const currentErrors = errors.addresses?.[i] || {};

            // Avoid overwriting required errors
            set(errors, `addresses[${i}]`, {
              ...addressErrors,
              ...currentErrors,
            });
          }
        });
      }
    }
  });

  return errors;
};

export default youthFormValidator;
