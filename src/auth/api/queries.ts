import gql from 'graphql-tag';

export const hasPermissionQuery = gql`
  query HasPermission {
    profiles(serviceType: YOUTH_MEMBERSHIP, first: 1) {
      edges {
        node {
          id
        }
      }
    }
  }
`;
