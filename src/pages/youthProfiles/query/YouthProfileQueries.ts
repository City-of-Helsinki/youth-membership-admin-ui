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
            id
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
        id
      }
      primaryAddress {
        address
        city
        postalCode
        countryCode
        id
        primary
        addressType
      }
      addresses {
        edges {
          node {
            primary
            id
            address
            postalCode
            city
            countryCode
            addressType
          }
        }
      }
      primaryEmail {
        email
        id
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
        additionalContactPersons {
          edges {
            node {
              id
              firstName
              lastName
              phone
              email
            }
          }
        }
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

export const updateProfile = gql`
  mutation UpdateProfile($input: UpdateProfileMutationInput!) {
    updateProfile(input: $input) {
      profile {
        id
      }
    }
  }
`;
