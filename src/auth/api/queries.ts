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
  }
`;
