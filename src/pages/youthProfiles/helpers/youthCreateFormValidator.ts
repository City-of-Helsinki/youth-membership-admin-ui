import { differenceInYears } from 'date-fns';

import {
  Errors,
  Values,
  YouthSchema,
  ValidationOption,
} from '../types/youthProfileTypes';
import youthProfileConstants from '../constants/youthProfileConstants';

/* Using a third party validation options (Yup & React Final Form) caused more problems than they solved.
 * This is why I wrote my own. It's a long way from perfect, but it gets the job done, for now at least.
 */
const APPROVAL_FIELDS = [
  'approverFirstName',
  'approverLastName',
  'approverEmail',
  'approverPhone',
];

const youthCreateFormValidator = (
  values: Values,
  schema: YouthSchema<ValidationOption>
) => {
  const errors: Errors = {};

  const emailRegex = youthProfileConstants.PROFILE_CREATION.EMAIL_REGEX;

  (Object.keys(schema) as Array<keyof typeof values>).forEach(value => {
    const options: ValidationOption = schema[value];
    if (options?.required || values[value]) {
      if (!values[value] && !APPROVAL_FIELDS.includes(value))
        return (errors[value] = 'validation.required');

      if (options?.birthDate) {
        const age = differenceInYears(new Date(), new Date(values[value]));

        if (isNaN(age)) return (errors[value] = 'validation.birthDate');

        if (
          age > youthProfileConstants.PROFILE_CREATION.AGE_MAX ||
          age < youthProfileConstants.PROFILE_CREATION.AGE_MIN
        )
          return (errors[value] = 'validation.ageRestriction');
      }

      // Validation for checking if approvalFields are required (based on users age)
      if (APPROVAL_FIELDS.includes(value) && values.birthDate) {
        const age = differenceInYears(new Date(), new Date(values.birthDate));
        if (
          !isNaN(age) &&
          age < youthProfileConstants.PROFILE_CREATION.AGE_ADULT &&
          !values[value]
        ) {
          return (errors[value] = 'validation.required');
        }
        // This return will prevent unwanted min & max error but
        // will still validate email field if it exists.
        if (!values[value]) return;
      }

      if (options?.email && !emailRegex.test(values[value]))
        return (errors[value] = 'validation.email');

      if (options?.min && values[value]?.length < options?.min)
        return (errors[value] = 'validation.tooShort');

      if (options?.max && values[value]?.length > options?.max)
        return (errors[value] = 'validation.tooLong');
    }
  });

  return errors;
};

export default youthCreateFormValidator;
