import { format } from 'date-fns';

import { MethodHandler, MethodHandlerParams } from '../../../graphql/types';
import { mutateHandler, queryHandler } from '../../../graphql/apiUtils';
import {
  createProfileMutation,
  profileQuery,
  profilesQuery,
  renewYouthProfileMutation,
  updateProfile,
} from '../query/YouthProfileQueries';
import {
  AddressType,
  CreateProfileVariables,
  EmailType,
  PhoneType,
  UpdateProfileVariables,
  Profiles_profiles as YouthProfiles,
  RenewYouthProfileVariables,
  ServiceType,
} from '../../../graphql/generatedTypes';
import getMutationVariables from '../helpers/youthProfileMutationVariables';

const getYouthProfile: MethodHandler = async (params: MethodHandlerParams) => {
  return await queryHandler({
    query: profileQuery,
    variables: {
      ID: params.id,
      serviceType: ServiceType.YOUTH_MEMBERSHIP,
    },
    fetchPolicy: 'network-only',
  });
};

const getYouthProfiles: MethodHandler = async (params: MethodHandlerParams) => {
  const response = await queryHandler({
    query: profilesQuery,
    variables: {
      serviceType: ServiceType.YOUTH_MEMBERSHIP,
      ...params,
    },
    fetchPolicy: 'network-only',
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
        language: params.data.profileLanguage,
        addAddresses: [
          {
            address: params.data.address,
            postalCode: params.data.postalCode,
            city: params.data.city,
            primary: true,
            addressType: AddressType.OTHER,
            countryCode: params.data.countryCode,
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
          birthDate: format(new Date(params.data.birthDate), 'yyyy-MM-dd'),
          schoolName: params.data.schoolName,
          schoolClass: params.data.schoolClass,
          languageAtHome: params.data.languageAtHome,
          photoUsageApproved: params.data.photoUsageApproved === 'true',
          approverFirstName: params.data.approverFirstName,
          approverLastName: params.data.approverLastName,
          approverEmail: params.data.approverEmail,
          approverPhone: params.data.approverPhone,
        },
      },
    },
  };

  return await mutateHandler({
    mutation: createProfileMutation,
    variables: variables,
  });
};

const renewYouthProfile: MethodHandler = async (
  params: MethodHandlerParams
) => {
  const variables: RenewYouthProfileVariables = {
    input: {
      profileId: params.id,
      serviceType: ServiceType.YOUTH_MEMBERSHIP,
    },
  };

  return await mutateHandler({
    mutation: renewYouthProfileMutation,
    variables: variables,
  });
};

const updateYouthProfile: MethodHandler = async (
  params: MethodHandlerParams
) => {
  const variables: UpdateProfileVariables = getMutationVariables(
    params.data,
    params.previousData.data.profile
  );

  return await mutateHandler({
    mutation: updateProfile,
    variables,
  });
};

export {
  createYouthProfile,
  getYouthProfiles,
  getYouthProfile,
  renewYouthProfile,
  updateYouthProfile,
};
