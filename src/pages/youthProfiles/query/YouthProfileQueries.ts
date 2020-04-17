import { gql } from 'apollo-boost';

export const profilesQuery = gql`
  query Profiles(
    $serviceType: ServiceType!
    $firstName: String
    $lastName: String
  ) {
    profiles(
      serviceType: $serviceType
      firstName: $firstName
      lastName: $lastName
    ) {
      edges {
        node {
          firstName
          lastName
          id
          primaryPhone {
            phone
          }
          youthProfile {
            membershipStatus
            birthDate
            photoUsageApproved
            membershipNumber
            languageAtHome
          }
        }
      }
    }
  }
`;

export const profileQuery = gql`
  query Profile($ID: ID!, $serviceType: ServiceType!) {
    profile(id: $ID, serviceType: $serviceType) {
      firstName
      lastName
      id
      language
      primaryPhone {
        phone
      }
      primaryAddress {
        address
        city
        postalCode
      }
      primaryEmail {
        email
      }
      youthProfile {
        expiration
        birthDate
        photoUsageApproved
        membershipNumber
        membershipStatus
        languageAtHome
        schoolName
        schoolClass
        approverFirstName
        approverLastName
        approverEmail
        approverPhone
        renewable
      }
    }
  }
`;

export const createProfileMutation = gql`
  mutation CreateProfile($input: CreateProfileMutationInput!) {
    createProfile(input: $input) {
      profile {
        id
      }
    }
  }
`;

export const renewYouthProfileMutation = gql`
  mutation RenewYouthProfile($input: RenewYouthProfileMutationInput!) {
    renewYouthProfile(input: $input) {
      youthProfile {
        expiration
      }
    }
  }
`;
