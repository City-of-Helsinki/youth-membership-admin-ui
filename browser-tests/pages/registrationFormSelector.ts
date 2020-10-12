import { Selector } from 'testcafe';

export const registrationFormSelector = {
  inputErrors: Selector('div[class^="TextInput-module_helperText"]'),
  birthDateError: Selector('p[class^="makeStyles-errorHelper"]'),
  firstName: Selector('input[id="firstName"]'),
  lastName: Selector('input[id="lastName"]'),
  primaryCountry: Selector('select[name="primaryAddress.countryCode"]'),
  countryCodeSv: Selector('option').filter('[value="SE"]'),
  primaryAddress: Selector('input[id="primaryAddress.address"]'),
  primaryPostalCode: Selector('input[id="primaryAddress.postalCode"]'),
  primaryCity: Selector('input[id="primaryAddress.city"]'),
  email: Selector('input[id="email"]'),
  phone: Selector('input[id="phone"]'),
  birthDateDay: Selector('input[id="day"]'),
  birthDateMonth: Selector('input[id="month"]'),
  birthDateYear: Selector('input[id="year"]'),
  schoolName: Selector('input[id="schoolName"]'),
  schoolClass: Selector('input[id="schoolClass"]'),
  languageFinnish: Selector('label').withText('Suomi'),
  languageSwedish: Selector('label').withText('Ruotsi'),
  languageEnglish: Selector('label').withText('Englanti'),
  photoUsageYes: Selector('label').withText('Kyllä'),
  photoUsageNo: Selector('label').withText('Ei'),
  approverFirstName: Selector('input[id="approverFirstName"]'),
  approverLastName: Selector('input[id="approverLastName"]'),
  approverEmail: Selector('input[id="approverEmail"]'),
  approverPhone: Selector('input[id="approverPhone"]'),
  addAdditionalAddress: Selector('button').withText('Lisää toinen osoite'),
  deleteAdditionalAddress: Selector(
    'button[class^="youthProfileArrayField_additionalActionButton"]'
  )
    .withText('Poista')
    .nth(0),
  additionalAddressMakePrimary: Selector('button').withText(
    'Muuta ensisijaiseksi osoitteeksi'
  ),
  additionalAddressAddress: Selector('input[id="addresses[0].address"]'),
  additionalAddressPostalCode: Selector('input[id="addresses[0].postalCode"]'),
  additionalAddressCity: Selector('input[id="addresses[0].city"]'),
  addAdditionalContact: Selector('button').withText('Lisää toinen huoltaja'),
  deleteAdditionalContact: Selector(
    'button[class^="youthProfileArrayField_additionalActionButton"]'
  )
    .withText('Poista')
    .nth(1),
  additionalContactFirstName: Selector(
    'input[id="additionalContactPersons[0].firstName"]'
  ),
  additionalContactLastName: Selector(
    'input[id="additionalContactPersons[0].lastName"]'
  ),
  additionalContactEmail: Selector(
    'input[id="additionalContactPersons[0].email"]'
  ),
  additionalContactPhone: Selector(
    'input[id="additionalContactPersons[0].phone"]'
  ),
  submitButton: Selector('button').withText('TALLENNA'),
};
