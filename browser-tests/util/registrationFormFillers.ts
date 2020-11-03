import { registrationFormSelector } from '../pages/registrationFormSelector';
import { youthInformationSelector } from '../pages/youthInformationSelector';

export const changeAddresses = async (
  t: TestController,
  address: string[],
  postalCode: string[],
  city: string[]
) => {
  await t
    .selectText(registrationFormSelector.primaryAddress)
    .typeText(registrationFormSelector.primaryAddress, address[0])
    .selectText(registrationFormSelector.primaryPostalCode)
    .typeText(registrationFormSelector.primaryPostalCode, postalCode[0])
    .selectText(registrationFormSelector.primaryCity)
    .typeText(registrationFormSelector.primaryCity, city[0]);

  await t
    .selectText(registrationFormSelector.additionalAddressAddress)
    .typeText(registrationFormSelector.additionalAddressAddress, address[1])
    .selectText(registrationFormSelector.additionalAddressPostalCode)
    .typeText(
      registrationFormSelector.additionalAddressPostalCode,
      postalCode[1]
    )
    .selectText(registrationFormSelector.additionalAddressCity)
    .typeText(registrationFormSelector.additionalAddressCity, city[1]);
};

export const changeApprovers = async (
  t: TestController,
  firstName: string[],
  lastName: string,
  email: string[],
  phone: string
) => {
  await t
    .selectText(registrationFormSelector.approverFirstName)
    .typeText(registrationFormSelector.approverFirstName, firstName[0])
    .selectText(registrationFormSelector.approverLastName)
    .typeText(registrationFormSelector.approverLastName, lastName)
    .selectText(registrationFormSelector.approverEmail)
    .typeText(registrationFormSelector.approverEmail, email[0])
    .selectText(registrationFormSelector.approverPhone)
    .typeText(registrationFormSelector.approverPhone, phone);

  await t
    .selectText(registrationFormSelector.additionalContactFirstName)
    .typeText(registrationFormSelector.additionalContactFirstName, firstName[1])
    .selectText(registrationFormSelector.additionalContactLastName)
    .typeText(registrationFormSelector.additionalContactLastName, lastName)
    .selectText(registrationFormSelector.additionalContactEmail)
    .typeText(registrationFormSelector.additionalContactEmail, email[1])
    .selectText(registrationFormSelector.additionalContactPhone)
    .typeText(registrationFormSelector.additionalContactPhone, phone);
};

export const expectProfileInformation = async (
  t: TestController,
  name: string,
  addresses: string[],
  phone: string,
  language: string,
  photoUsage: string
) => {
  await t
    .expect(youthInformationSelector.name.innerText)
    .eql(name)
    .expect(youthInformationSelector.mainAddress.innerText)
    .eql(addresses[0])
    .expect(youthInformationSelector.secondaryAddress.innerText)
    .eql(addresses[1])
    .expect(youthInformationSelector.phone.innerText)
    .eql(phone)
    .expect(youthInformationSelector.languageAtHome.innerText)
    .eql(language)
    .expect(youthInformationSelector.photoUsage.innerText)
    .eql(photoUsage);
};

export const expectApprovers = async (
  t: TestController,
  names: string[],
  emails: string[],
  phones: string
) => {
  await t
    .expect(youthInformationSelector.mainApproverName.innerText)
    .eql(names[0])
    .expect(youthInformationSelector.mainApproverEmail.innerText)
    .eql(emails[0])
    .expect(youthInformationSelector.mainApproverPhone.innerText)
    .eql(phones)
    .expect(youthInformationSelector.secondaryApproverName.innerText)
    .eql(names[1])
    .expect(youthInformationSelector.secondaryApproverEmail.innerText)
    .eql(emails[1])
    .expect(youthInformationSelector.secondaryApproverPhone.innerText)
    .eql(phones);
};
