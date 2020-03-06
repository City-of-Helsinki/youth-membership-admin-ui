import { MethodHandler, MethodHandlerParams } from '../../../graphql/types';
import { queryHandler, mutateHandler } from '../../../graphql/apiUtils';
import { createProfileMutation, profilesQuery } from '../query/YouthProfileQueries';
import {
  AddressType,
  CreateProfileVariables,
  EmailType,
  PhoneType,
  Profiles_profiles as YouthProfiles,
  ServiceType,
} from '../../../graphql/generatedTypes';

const getYouthProfiles: MethodHandler = async (params: MethodHandlerParams) => {
  const response = await queryHandler({
    query: profilesQuery,
    variables: {
      serviceType: ServiceType.YOUTH_MEMBERSHIP,
      ...params,
    },
  });
  return (response.data.profiles as YouthProfiles).edges.map(edge => {
    return edge?.node;
  });
};

const createYouthProfile: MethodHandler = async (
  params: MethodHandlerParams
) => {
  const variables: CreateProfileVariables = {
    input: {
      serviceType: ServiceType.YOUTH_MEMBERSHIP,
      profile: {
        firstName: params.data.firstName,
        lastName: params.data.lastName,
        addAddresses: [
          {
            address: params.data.address,
            postalCode: params.data.postalCode,
            city: params.data.city,
            primary: true,
            addressType: AddressType.OTHER,
          },
        ],
        addEmails: [
          {
            email: params.data.email,
            primary: true,
            emailType: EmailType.OTHER,
          },
        ],
        addPhones: [
          {
            phone: params.data.phone,
            primary: true,
            phoneType: PhoneType.OTHER,
          },
        ],
        youthProfile: {
          birthDate: params.data.birthDate,
          schoolName: params.data.schoolName,
          schoolClass: params.data.schoolClass,
          languageAtHome: params.data.languageAtHome,
          photoUsageApproved: params.data.photoUsageApproved === 'true',
          approverFirstName: params.data.approverFirstName,
          approverLastName: params.data.approverLastName,
          approverEmail: params.data.email,
          approverPhone: params.data.phone,
        },
      },
    }
  };
  console.log("VARIABLES", variables);
  const response = await mutateHandler({
    mutation: createProfileMutation,
    variables: variables,
  }).catch(error => {
    console.log("MUTATION ERROR", error)
  });
  return response;
};

export { createYouthProfile, getYouthProfiles };
