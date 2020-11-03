import { subYears, format } from 'date-fns';

import { testUrl } from './util/settings';
import { login } from './util/login';
import { navigationSelector } from './pages/navigationSelector';
import { youthListSelector } from './pages/youthListSelector';
import { registrationFormSelector } from './pages/registrationFormSelector';
import { youthInformationSelector } from './pages/youthInformationSelector';
import { fillBirthDate } from './util/birthdateInput';

const AGE_IS_ADULT = format(subYears(new Date(), 20), 'yyyy');
const AGE_IS_MINOR = format(subYears(new Date(), 14), 'yyyy');

fixture('Register new youth profile').page(testUrl());

test('Check amount of required fields', async (t) => {
  await login(t);

  await t
    .click(navigationSelector.youthProfiles)
    .click(youthListSelector.addNewButton);

  // Check amount of required fields without entering birth date
  // All input errors except birth date has same class name
  await t
    .click(registrationFormSelector.submitButton)
    .expect(registrationFormSelector.inputErrors.count)
    .eql(7)
    .expect(registrationFormSelector.birthDateError.count)
    .eql(1);

  // Fill in birth date, user is adult
  await fillBirthDate(t, '01', '01', AGE_IS_ADULT);
  await t
    .click(registrationFormSelector.submitButton)
    .expect(registrationFormSelector.inputErrors.count)
    .eql(7);

  // Fill in birth date, user is minor
  await fillBirthDate(t, '01', '01', AGE_IS_MINOR);
  await t
    .click(registrationFormSelector.submitButton)
    .expect(registrationFormSelector.inputErrors.count)
    .eql(11);

  // Add extra address + extra contact person, these should be always required
  await t
    .click(registrationFormSelector.addAdditionalAddress)
    .click(registrationFormSelector.addAdditionalContact)
    .click(registrationFormSelector.submitButton)
    .expect(registrationFormSelector.inputErrors.count)
    .eql(18);
});

test('Fill in the form and submit', async (t) => {
  await login(t);

  await t
    .click(navigationSelector.youthProfiles)
    .click(youthListSelector.addNewButton);

  await t
    .typeText(registrationFormSelector.firstName, 'Ulla')
    .typeText(registrationFormSelector.lastName, 'User')
    .click(registrationFormSelector.primaryCountry)
    .click(registrationFormSelector.countryCodeSv)
    .typeText(registrationFormSelector.primaryAddress, 'Testikatu 55')
    .typeText(registrationFormSelector.primaryPostalCode, '00200')
    .typeText(registrationFormSelector.primaryCity, 'Helsinki')
    .typeText(registrationFormSelector.email, 'ulla@user.fi')
    .typeText(registrationFormSelector.phone, '0501234567');

  await fillBirthDate(t, '01', '01', AGE_IS_MINOR);

  await t
    .typeText(registrationFormSelector.schoolName, 'TestiKoulu')
    .typeText(registrationFormSelector.schoolClass, '1C')
    .click(registrationFormSelector.languageEnglish)
    .click(registrationFormSelector.languageSwedish)
    .click(registrationFormSelector.languageFinnish)
    .click(registrationFormSelector.photoUsageYes)
    .click(registrationFormSelector.photoUsageNo)
    .typeText(registrationFormSelector.approverFirstName, 'Unique')
    .typeText(registrationFormSelector.approverLastName, 'User')
    .typeText(registrationFormSelector.approverEmail, 'unique@user.fi')
    .typeText(registrationFormSelector.approverPhone, '0501234567');

  // Add, remove and fill additional address
  await t
    .click(registrationFormSelector.addAdditionalAddress)
    .click(registrationFormSelector.deleteAdditionalAddress)
    .click(registrationFormSelector.addAdditionalAddress)
    .typeText(registrationFormSelector.additionalAddressAddress, 'Testikuja 55')
    .typeText(registrationFormSelector.additionalAddressPostalCode, '02230')
    .typeText(registrationFormSelector.additionalAddressCity, 'Espoo');

  // Add, remove and fill additional contact person
  await t
    .click(registrationFormSelector.addAdditionalContact)
    .click(registrationFormSelector.deleteAdditionalContact)
    .click(registrationFormSelector.addAdditionalContact)
    .typeText(registrationFormSelector.additionalContactFirstName, 'Ursula')
    .typeText(registrationFormSelector.additionalContactLastName, 'User')
    .typeText(registrationFormSelector.additionalContactEmail, 'ursula@user.fi')
    .typeText(registrationFormSelector.additionalContactPhone, '0501234567');

  // Submit form
  await t
    .click(registrationFormSelector.submitButton)
    .expect(youthInformationSelector.basicInformationTitle.exists)
    .ok();
});
