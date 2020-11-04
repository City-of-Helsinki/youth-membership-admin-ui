import { isEqual } from 'lodash';
import { format } from 'date-fns';

import { FormValues } from '../types/youthProfileTypes';
import {
  AddressType,
  CreateAddressInput,
  EmailType,
  PhoneType,
  Profile_profile as Profile,
  ServiceType,
  UpdateAddressInput,
  CreateAdditionalContactPersonInput,
  UpdateAdditionalContactPersonInput,
} from '../../../graphql/generatedTypes';
import getAddressesFromNode from './getAddressesFromNode';
import getAdditionalContactPersons from './getAdditionalContactPersons';
import prepareArrayFieldChanges from './prepareArrayFieldChanges';

type AddressInput = {
  addAddresses: CreateAddressInput[];
  updateAddresses?: UpdateAddressInput[];
  removeAddresses?: (string | null)[] | undefined | null;
};

const getYouthProfile = (formValues: FormValues, profile?: Profile) => {
  const {
    add: addAdditionalContactPersons,
    update: updateAdditionalContactPersons,
    remove: removeAdditionalContactPersons,
  } = prepareArrayFieldChanges<
    CreateAdditionalContactPersonInput,
    UpdateAdditionalContactPersonInput
  >(getAdditionalContactPersons(profile), formValues.additionalContactPersons);

  // Clears object from fields with empty arrays as values. This allows
  // this same helper to be used with create and update operations.
  // Create operation only allows the 'addAdditionalContactPersons'
  // field to be present, because the update and remove fields can't yet
  // logically exist.
  const additionalContactPersonChanges = Object.entries({
    addAdditionalContactPersons,
    updateAdditionalContactPersons,
    removeAdditionalContactPersons,
  }).reduce((acc, [key, value]) => {
    if (value.length === 0) {
      return acc;
    }

    return {
      ...acc,
      [key]: value,
    };
  }, {});

  return {
    youthProfile: {
      birthDate: format(new Date(formValues.birthDate), 'yyyy-MM-dd'),
      schoolName: formValues.schoolName,
      schoolClass: formValues.schoolClass,
      approverFirstName: formValues.approverFirstName,
      approverLastName: formValues.approverLastName,
      approverPhone: formValues.approverPhone,
      approverEmail: formValues.approverEmail,
      languageAtHome: formValues.languageAtHome,
      photoUsageApproved: formValues.photoUsageApproved === 'true',
      ...additionalContactPersonChanges,
    },
  };
};

const getAddress = (formValues: FormValues, profile?: Profile) => {
  const formAddresses = [...formValues.addresses, formValues.primaryAddress];
  const profileAddresses = [
    ...getAddressesFromNode(profile),
    profile?.primaryAddress,
  ];

  const addAddresses: CreateAddressInput[] = formAddresses
    .filter((address) => !address?.id)
    .map((address) => ({
      address: address.address,
      city: address.city,
      addressType: address.addressType || AddressType.OTHER,
      countryCode: address.countryCode,
      postalCode: address.postalCode,
      primary: address.primary,
    }));

  const updateAddresses = formAddresses
    .filter((address) => {
      const profileAddress = profileAddresses.find(
        (profileAddress) => profileAddress?.id === address.id
      );
      return address.id && !isEqual(address, profileAddress);
    })
    .map((address) => ({
      address: address.address,
      city: address.city,
      id: address.id,
      addressType: address.addressType || AddressType.OTHER,
      countryCode: address.countryCode,
      postalCode: address.postalCode,
      primary: address.primary,
    }));

  const formAddressIDs = formAddresses.map((address) => address?.id);

  const removeAddresses = profileAddresses
    .filter((address) => address?.id && !formAddressIDs.includes(address.id))
    .map((address) => address?.id || null);

  const addressInput: AddressInput = {
    addAddresses,
  };

  // Add update & remove only if they exists (empty array causes backend errors),
  if (updateAddresses.length > 0)
    addressInput.updateAddresses = updateAddresses;
  if (removeAddresses.length > 0)
    addressInput.removeAddresses = removeAddresses;

  return addressInput;
};

const getPhone = (formValues: FormValues, profile?: Profile) => {
  if (!profile?.primaryPhone) {
    return {
      addPhones: [
        {
          phone: formValues.phone,
          phoneType: PhoneType.OTHER,
          primary: true,
        },
      ],
    };
  }

  return {
    updatePhones: [
      {
        phone: formValues.phone,
        phoneType: PhoneType.OTHER,
        primary: true,
        id: profile.primaryPhone.id,
      },
    ],
  };
};

const getEmail = (formValues: FormValues, profile?: Profile) => {
  return {
    addEmails: [
      !profile?.primaryEmail
        ? {
            email: formValues.email,
            primary: true,
            emailType: EmailType.OTHER,
          }
        : null,
    ],
  };
};

const getMutationVariables = (formValues: FormValues, profile?: Profile) => {
  return {
    helsinkiProfileInput: {
      serviceType: ServiceType.YOUTH_MEMBERSHIP,
      profile: {
        id: profile?.id,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        language: formValues.profileLanguage,
        ...getAddress(formValues, profile),
        ...getPhone(formValues, profile),
        ...getEmail(formValues, profile),
      },
    },
    youthProfileInput: {
      id: profile?.id,
      ...getYouthProfile(formValues, profile),
    },
  };
};

export default getMutationVariables;
