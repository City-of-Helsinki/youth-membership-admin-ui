/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Profiles
// ====================================================

export interface Profiles_profiles_edges_node_primaryPhone {
  readonly phone: string | null;
}

export interface Profiles_profiles_edges_node_youthProfile {
  /**
   * Membership status based on expiration and approved_time fields
   */
  readonly membershipStatus: MembershipStatus | null;
  readonly birthDate: any;
  readonly photoUsageApproved: boolean | null;
  /**
   * Youth's membership number
   */
  readonly membershipNumber: string | null;
  /**
   * The language which is spoken in the youth's home.
   */
  readonly languageAtHome: YouthLanguage | null;
}

export interface Profiles_profiles_edges_node {
  readonly firstName: string;
  readonly lastName: string;
  /**
   * The ID of the object.
   */
  readonly id: string;
  /**
   * Convenience field for the phone which is marked as primary.
   */
  readonly primaryPhone: Profiles_profiles_edges_node_primaryPhone | null;
  /**
   * The Youth membership data of the profile.
   */
  readonly youthProfile: Profiles_profiles_edges_node_youthProfile | null;
}

export interface Profiles_profiles_edges {
  /**
   * The item at the end of the edge
   */
  readonly node: Profiles_profiles_edges_node | null;
}

export interface Profiles_profiles {
  /**
   * Contains the nodes in this connection.
   */
  readonly edges: ReadonlyArray<(Profiles_profiles_edges | null)>;
}

export interface Profiles {
  /**
   * Search for profiles. The results are filtered based on the given parameters. The results are paged using Relay.
   * 
   * Requires `staff` credentials for the service given in `serviceType`. The
   * profiles must have an active connection to the given `serviceType`, otherwise
   * they will not be returned.
   * 
   * Possible error codes:
   * 
   * * `TODO`
   */
  readonly profiles: Profiles_profiles | null;
}

export interface ProfilesVariables {
  readonly serviceType: ServiceType;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Profile
// ====================================================

export interface Profile_profile_primaryPhone {
  readonly phone: string | null;
}

export interface Profile_profile_primaryAddress {
  readonly address: string;
  readonly city: string;
  readonly postalCode: string;
}

export interface Profile_profile_primaryEmail {
  readonly email: string;
}

export interface Profile_profile_youthProfile {
  readonly expiration: any;
  readonly birthDate: any;
  readonly photoUsageApproved: boolean | null;
  /**
   * Youth's membership number
   */
  readonly membershipNumber: string | null;
  /**
   * Membership status based on expiration and approved_time fields
   */
  readonly membershipStatus: MembershipStatus | null;
  /**
   * The language which is spoken in the youth's home.
   */
  readonly languageAtHome: YouthLanguage | null;
  readonly schoolName: string;
  readonly schoolClass: string;
  readonly approverFirstName: string;
  readonly approverLastName: string;
  readonly approverEmail: string;
  readonly approverPhone: string;
}

export interface Profile_profile {
  readonly firstName: string;
  readonly lastName: string;
  /**
   * The ID of the object.
   */
  readonly id: string;
  /**
   * Convenience field for the phone which is marked as primary.
   */
  readonly primaryPhone: Profile_profile_primaryPhone | null;
  /**
   * Convenience field for the address which is marked as primary.
   */
  readonly primaryAddress: Profile_profile_primaryAddress | null;
  /**
   * Convenience field for the email which is marked as primary.
   */
  readonly primaryEmail: Profile_profile_primaryEmail | null;
  /**
   * The Youth membership data of the profile.
   */
  readonly youthProfile: Profile_profile_youthProfile | null;
}

export interface Profile {
  /**
   * Get profile by profile ID.
   * 
   * Requires `staff` credentials for the service given in `serviceType`. The
   * profile must have an active connection to the given `serviceType`, otherwise
   * it will not be returned.
   * 
   * Possible error codes:
   * 
   * * `TODO`
   */
  readonly profile: Profile_profile | null;
}

export interface ProfileVariables {
  readonly ID: string;
  readonly serviceType: ServiceType;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateProfile
// ====================================================

export interface CreateProfile_createProfile_profile {
  /**
   * The ID of the object.
   */
  readonly id: string;
}

export interface CreateProfile_createProfile {
  readonly profile: CreateProfile_createProfile_profile | null;
}

export interface CreateProfile {
  readonly createProfile: CreateProfile_createProfile | null;
}

export interface CreateProfileVariables {
  readonly input: CreateProfileMutationInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AddressType {
  HOME = "HOME",
  NONE = "NONE",
  OTHER = "OTHER",
  WORK = "WORK",
}

/**
 * An enumeration.
 */
export enum ContactMethod {
  EMAIL = "EMAIL",
  SMS = "SMS",
}

export enum EmailType {
  NONE = "NONE",
  OTHER = "OTHER",
  PERSONAL = "PERSONAL",
  WORK = "WORK",
}

/**
 * An enumeration.
 */
export enum Language {
  ENGLISH = "ENGLISH",
  FINNISH = "FINNISH",
  SWEDISH = "SWEDISH",
}

export enum MembershipStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  PENDING = "PENDING",
  RENEWING = "RENEWING",
}

export enum PhoneType {
  HOME = "HOME",
  MOBILE = "MOBILE",
  NONE = "NONE",
  OTHER = "OTHER",
  WORK = "WORK",
}

export enum ServiceType {
  BERTH = "BERTH",
  GODCHILDREN_OF_CULTURE = "GODCHILDREN_OF_CULTURE",
  HKI_MY_DATA = "HKI_MY_DATA",
  YOUTH_MEMBERSHIP = "YOUTH_MEMBERSHIP",
}

export enum YouthLanguage {
  ARABIC = "ARABIC",
  ENGLISH = "ENGLISH",
  ESTONIAN = "ESTONIAN",
  FINNISH = "FINNISH",
  RUSSIAN = "RUSSIAN",
  SOMALI = "SOMALI",
  SWEDISH = "SWEDISH",
}

export interface AddressInput {
  readonly id?: string | null;
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
  readonly countryCode?: string | null;
  readonly addressType: AddressType;
  readonly primary?: boolean | null;
}

export interface CreateProfileMutationInput {
  readonly serviceType: ServiceType;
  readonly profile?: ProfileInput | null;
  readonly clientMutationId?: string | null;
}

export interface EmailInput {
  readonly id?: string | null;
  readonly email?: string | null;
  readonly emailType: EmailType;
  readonly primary?: boolean | null;
}

export interface PhoneInput {
  readonly id?: string | null;
  readonly phone: string;
  readonly phoneType: PhoneType;
  readonly primary?: boolean | null;
}

export interface ProfileInput {
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly nickname?: string | null;
  readonly image?: string | null;
  readonly language?: Language | null;
  readonly contactMethod?: ContactMethod | null;
  readonly addEmails?: ReadonlyArray<(EmailInput | null)> | null;
  readonly updateEmails?: ReadonlyArray<(EmailInput | null)> | null;
  readonly removeEmails?: ReadonlyArray<(string | null)> | null;
  readonly addPhones?: ReadonlyArray<(PhoneInput | null)> | null;
  readonly updatePhones?: ReadonlyArray<(PhoneInput | null)> | null;
  readonly removePhones?: ReadonlyArray<(string | null)> | null;
  readonly addAddresses?: ReadonlyArray<(AddressInput | null)> | null;
  readonly updateAddresses?: ReadonlyArray<(AddressInput | null)> | null;
  readonly removeAddresses?: ReadonlyArray<(string | null)> | null;
  readonly youthProfile?: YouthProfileFields | null;
  readonly sensitivedata?: SensitiveDataFields | null;
}

export interface SensitiveDataFields {
  readonly ssn?: string | null;
}

export interface YouthProfileFields {
  readonly schoolName?: string | null;
  readonly schoolClass?: string | null;
  readonly languageAtHome?: YouthLanguage | null;
  readonly approverFirstName?: string | null;
  readonly approverLastName?: string | null;
  readonly approverPhone?: string | null;
  readonly approverEmail?: string | null;
  readonly birthDate?: any | null;
  readonly photoUsageApproved?: boolean | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
