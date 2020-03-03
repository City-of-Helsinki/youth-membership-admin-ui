import { MethodHandler, MethodHandlerParams } from '../../../graphql/types';
import { queryHandler } from '../../../graphql/apiUtils';
import { profilesQuery } from '../query/YouthProfileQueries';
import {
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

export { getYouthProfiles };
