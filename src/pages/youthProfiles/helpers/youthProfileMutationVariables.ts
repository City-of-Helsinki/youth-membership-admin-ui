import { FormValues } from '../types/youthProfileTypes';
import {
  Profile_profile as Profile,
  AddressType,
  PhoneType,
  EmailType,
  ServiceType,
} from '../../../graphql/generatedTypes';

const getYouthProfile = (formValues: FormValues) => {
  return {
    youthProfile: {
      birthDate: formValues.birthDate,
      schoolName: formValues.schoolName,
      schoolClass: formValues.schoolClass,
      approverFirstName: formValues.approverFirstName,
      approverLastName: formValues.approverLastName,
      approverPhone: formValues.approverPhone,
      approverEmail: formValues.approverEmail,
      languageAtHome: formValues.languageAtHome,
      photoUsageApproved: formValues.photoUsageApproved === 'true',
    },
  };
};

const getAddress = (formValues: FormValues, profile?: Profile) => {
  if (!profile?.primaryAddress) {
    return {
      addAddresses: [
        {
          address: formValues.address,
          postalCode: formValues.postalCode,
          city: formValues.city,
          addressType: AddressType.OTHER,
          countryCode: formValues.countryCode,
          primary: true,
        },
      ],
    };
  }

  return {
    updateAddresses: [
      {
        address: formValues.address,
        postalCode: formValues.postalCode,
        city: formValues.city,
        addressType: AddressType.OTHER,
        primary: true,
        countryCode: formValues.countryCode,
        id: profile.primaryAddress.id,
      },
    ],
  };
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

const getMutationVariables = (formValues: FormValues, profile: Profile) => {
  return {
    input: {
      profile: {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        language: formValues.profileLanguage,
        id: profile.id,
        ...getAddress(formValues, profile),
        ...getPhone(formValues, profile),
        ...getEmail(formValues, profile),
        ...getYouthProfile(formValues),
      },
      serviceType: ServiceType.YOUTH_MEMBERSHIP,
    },
  };
};

export default getMutationVariables;
