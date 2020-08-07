import gql from 'graphql-tag';

export const hasPermissionQuery = gql`
  query Profiles {
    profiles(serviceType: YOUTH_MEMBERSHIP) {
      edges {
        node {
          id
        }
      }
    }
  }
`;
