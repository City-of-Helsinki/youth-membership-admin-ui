import { MethodHandler, MethodHandlerParams } from '../../../graphql/types';
import { mutateHandler, queryHandler } from '../../../graphql/apiUtils';
import {
  createProfileMutation,
  profileQuery,
  profilesQuery,
  renewYouthProfileMutation,
  updateProfiles,
} from '../query/YouthProfileQueries';
import {
  CreateProfileVariables,
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
  const { filter } = params;

  // By default we want the profile list view to return empty. We want
  // to show results only when the users has completed a search. This
  // list view is meant for finding a specific user instead of browsing
  // users.
  if (
    filter &&
    // The filter object has empty values when the user has searched for
    // something and then erases their search. When there are no filter
    // values we know that we should avoid making a search.
    Object.values(filter).filter((item) => Boolean(item)).length === 0
  ) {
    return [];
  }

  const response = await queryHandler({
    query: profilesQuery,
    variables: {
      serviceType: ServiceType.YOUTH_MEMBERSHIP,
      ...filter,
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
  // TODO: Fix later
  const variables: CreateProfileVariables = (getMutationVariables(
    params.data
  ) as unknown) as CreateProfileVariables;

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
      id: params.id,
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
  return await mutateHandler({
    mutation: updateProfiles,
    variables: getMutationVariables(
      params.data,
      params.previousData.data.profile
    ),
  });
};

export {
  createYouthProfile,
  getYouthProfiles,
  getYouthProfile,
  renewYouthProfile,
  updateYouthProfile,
};
