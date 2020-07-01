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
  CreateProfileVariables,
  Profiles_profiles as YouthProfiles,
  RenewYouthProfileVariables,
  ServiceType,
  UpdateProfileVariables,
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
  return (response.data.profiles as YouthProfiles).edges.map((edge) => {
    return edge?.node;
  });
};

const createYouthProfile: MethodHandler = async (
  params: MethodHandlerParams
) => {
  const variables: CreateProfileVariables = getMutationVariables(params.data);

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
  // Store values to another variable for second. This way we can use spread operator to add ID.
  // (UpdateProfileVariables is a readonly so adding ID in another way is not possible)
  const updateVariables = getMutationVariables(
    params.data,
    params.previousData.data.profile
  );

  const variables: UpdateProfileVariables = {
    input: {
      serviceType: ServiceType.YOUTH_MEMBERSHIP,
      profile: {
        ...updateVariables.input.profile,
        id: params.previousData.data.profile.id,
      },
    },
  };

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
