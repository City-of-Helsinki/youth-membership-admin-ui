import { login } from './util/login';
import {
  testUrl,
  userYouthProfileId,
  userFirstName,
  userLastName,
} from './util/settings';
import {
  changeAddresses,
  changeApprovers,
  expectProfileInformation,
  expectApprovers,
} from './util/registrationFormFillers';
import { youthInformationSelector } from './pages/youthInformationSelector';
import { registrationFormSelector } from './pages/registrationFormSelector';

// Enter straight to youth's information with url. This simulates behaviour when staff member reads youth's QR-code.
// TODO: Figure out better way to implement ID
fixture('View and edit').page(
  new URL(`/youthProfiles/${userYouthProfileId()}/show`, testUrl()).toString()
);

test('Edit youths profile information', async (t) => {
    // profile id is required
    if (!userYouthProfileId()) {
      return;
    }
  await login(t);
  await t.click(youthInformationSelector.editProfile);

  // Change all of the profile information
  await t
    .selectText(registrationFormSelector.firstName)
    .typeText(registrationFormSelector.firstName, userFirstName())
    .selectText(registrationFormSelector.lastName)
    .typeText(registrationFormSelector.lastName, userLastName());

  await changeAddresses(
    t,
    ['User street 303', 'User street 404'],
    ['12345', '54321'],
    ['Espoo', 'Vantaa']
  );

  await t
    .selectText(registrationFormSelector.phone)
    .typeText(registrationFormSelector.phone, '7654321050')
    .click(registrationFormSelector.languageAtHome)
    .click(registrationFormSelector.languageAtHomeOption.withText('Suomi'))
    .click(registrationFormSelector.photoUsageYes);

  await changeApprovers(
    t,
    ['Tim', 'Tina'],
    'Tester',
    ['tim@tester.fi', 'tina@tester.fi'],
    '7654321050'
  );

  await t.click(registrationFormSelector.submitButton);

  // Make sure values changed
  await expectProfileInformation(
    t,
    `${userFirstName()} ${userLastName()}`,
    [
      'User street 303, 12345, Espoo, Ruotsi',
      'User street 404, 54321, Vantaa, Suomi',
    ],
    '7654321050',
    'Suomi',
    'Kyllä'
  );

  await expectApprovers(
    t,
    ['Tim Tester', 'Tina Tester'],
    ['tim@tester.fi', 'tina@tester.fi'],
    '7654321050'
  );

  // Change values back, this way we can always make sure values are changed
  await t.click(youthInformationSelector.editProfile);

  await t
    .selectText(registrationFormSelector.firstName)
    .typeText(registrationFormSelector.firstName, userFirstName())
    .selectText(registrationFormSelector.lastName)
    .typeText(registrationFormSelector.lastName, userLastName());

  await changeAddresses(
    t,
    ['Test street 101', 'Test street 202'],
    ['00200', '00200'],
    ['Helsinki', 'Helsinki']
  );

  await t
    .selectText(registrationFormSelector.phone)
    .typeText(registrationFormSelector.phone, '0501234567')
    .click(registrationFormSelector.languageAtHome)
    .click(registrationFormSelector.languageAtHomeOption.withText('Englanti'))
    .click(registrationFormSelector.photoUsageNo);

  await changeApprovers(
    t,
    ['Ursula', 'Uriel'],
    'User',
    ['ursula.user@mailinator.com', 'uriel.user@mailinator.com'],
    '0501234567'
  );

  await t.click(registrationFormSelector.submitButton);

  // Make sure values changed
  await expectProfileInformation(
    t,
    `${userFirstName()} ${userLastName()}`,
    [
      'Test street 101, 00200, Helsinki, Ruotsi',
      'Test street 202, 00200, Helsinki, Suomi',
    ],
    '0501234567',
    'Englanti',
    'Ei'
  );

  await expectApprovers(
    t,
    ['Ursula User', 'Uriel User'],
    ['ursula.user@mailinator.com', 'uriel.user@mailinator.com'],
    '0501234567'
  );

  // One last round, test "Make address primary" functionality
  await t
    .click(youthInformationSelector.editProfile)
    .click(registrationFormSelector.additionalAddressMakePrimary)
    .click(registrationFormSelector.submitButton)
    .expect(youthInformationSelector.mainAddress.innerText)
    .eql('Test street 202, 00200, Helsinki, Suomi');

  // And change address back
  await t
    .click(youthInformationSelector.editProfile)
    .click(registrationFormSelector.additionalAddressMakePrimary)
    .click(registrationFormSelector.submitButton)
    .expect(youthInformationSelector.mainAddress.innerText)
    .eql('Test street 101, 00200, Helsinki, Ruotsi');
});
