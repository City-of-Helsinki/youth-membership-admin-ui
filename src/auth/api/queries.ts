import gql from 'graphql-tag';

export const hasPermissionQuery = gql`
  query HasPermission {
    youthProfiles(first: 1) {
      edges {
        node {
          id
        }
      }
    }
    profiles(serviceType: YOUTH_MEMBERSHIP, first: 1) {
      edges {
        node {
          id
        }
      }
    }
  }
`;
