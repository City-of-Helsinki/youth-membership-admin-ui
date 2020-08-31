import {
  Profile_profile as Profile,
  Profile_profile_addresses_edges_node as Address,
} from '../../../graphql/generatedTypes';

const getAddressesFromNode = (profile?: Profile) => {
  const edge = profile?.addresses?.edges || [];
  return edge
    .filter((edge) => !edge?.node?.primary)
    .map(
      (edge) =>
        ({
          address: edge?.node?.address,
          id: edge?.node?.id,
          city: edge?.node?.city,
          postalCode: edge?.node?.postalCode,
          countryCode: edge?.node?.countryCode,
          primary: edge?.node?.primary,
        } as Address)
    );
};

export default getAddressesFromNode;
