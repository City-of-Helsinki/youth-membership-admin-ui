import merge from 'lodash/merge';

import getEnvVar from '../../../common/getEnvVar';
import { MethodHandler, MethodHandlerParams } from '../../../graphql/types';
import { mutateHandler, queryHandler } from '../../../graphql/apiUtils';
import {
  createHelsinkiProfileMutation,
  createYouthProfile,
  profileQuery,
  profilesQuery,
  renewYouthProfileMutation,
  updateProfiles,
} from '../query/YouthProfileQueries';
import {
  Profiles_profiles as YouthProfiles,
  RenewYouthProfileVariables,
  ServiceType,
} from '../../../graphql/generatedTypes';
import {
  getUpdateProfilesVariables,
  getCreateHelsinkiProfileVariables,
  getCreateYouthProfileVariables,
} from '../helpers/youthProfileMutationVariables';
import authService from '../../../auth/authService';

function getToken(tokens: string, key: string): string {
  const token = JSON.parse(tokens)[key];

  if (!token) {
    throw Error(`Token ${key} not found`);
  }

  return token;
}

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

const createProfiles: MethodHandler = async ({ data }: MethodHandlerParams) => {
  const apiTokens = authService.getTokens();

  if (!apiTokens) {
    throw Error('Api tokens not found');
  }

  const helsinkiProfileToken = getToken(
    apiTokens,
    getEnvVar('REACT_APP_PROFILE_AUDIENCE')
  );

  try {
    const helsinkiProfileCreationResponse = await mutateHandler({
      mutation: createHelsinkiProfileMutation,
      variables: getCreateHelsinkiProfileVariables(data),
    });

    const profileId =
      helsinkiProfileCreationResponse?.data?.createProfile?.profile?.id;

    if (!profileId) {
      throw Error(
        "Could not find profile id for newly created profile. Can't create youth profile."
      );
    }

    const youthProfileCreationResponse = await mutateHandler({
      mutation: createYouthProfile,
      variables: getCreateYouthProfileVariables(
        data,
        profileId,
        helsinkiProfileToken
      ),
    });

    return merge(helsinkiProfileCreationResponse, youthProfileCreationResponse);
  } catch (e) {
    throw e;
  }
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
    variables: getUpdateProfilesVariables(
      params.data,
      params.previousData.data.profile
    ),
  });
};

export {
  createProfiles,
  getYouthProfiles,
  getYouthProfile,
  renewYouthProfile,
  updateYouthProfile,
};
