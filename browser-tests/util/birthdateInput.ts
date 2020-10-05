import { registrationFormSelector } from '../pages/registrationFormSelector';

export const fillBirthDate = async (
  t: TestController,
  day: string,
  month: string,
  year: string
) => {
  await t
    .selectText(registrationFormSelector.birthDateDay)
    .typeText(registrationFormSelector.birthDateDay, day)
    .selectText(registrationFormSelector.birthDateMonth)
    .typeText(registrationFormSelector.birthDateMonth, month)
    .selectText(registrationFormSelector.birthDateYear)
    .typeText(registrationFormSelector.birthDateYear, year);
};
