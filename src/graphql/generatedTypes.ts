/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Profiles
// ====================================================

export interface Profiles_profiles_edges_node_primaryPhone {
  readonly phone: string | null;
  /**
   * The ID of the object.
   */
  readonly id: string;
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
  /**
   * The ID of the object.
   */
  readonly id: string;
}

export interface Profile_profile_primaryAddress {
  readonly address: string;
  readonly city: string;
  readonly postalCode: string;
  readonly countryCode: string;
  /**
   * The ID of the object.
   */
  readonly id: string;
}

export interface Profile_profile_primaryEmail {
  readonly email: string;
  /**
   * The ID of the object.
   */
  readonly id: string;
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
  /**
   * Tells if the membership is currently renewable or not
   */
  readonly renewable: boolean | null;
}

export interface Profile_profile {
  readonly firstName: string;
  readonly lastName: string;
  /**
   * The ID of the object.
   */
  readonly id: string;
  readonly language: Language | null;
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

// ====================================================
// GraphQL mutation operation: RenewYouthProfile
// ====================================================

export interface RenewYouthProfile_renewYouthProfile_youthProfile {
  readonly expiration: any;
}

export interface RenewYouthProfile_renewYouthProfile {
  readonly youthProfile: RenewYouthProfile_renewYouthProfile_youthProfile | null;
}

export interface RenewYouthProfile {
  /**
   * Renews the youth profile. Renewing can only be done once per season.
   * 
   * Requires Authentication.
   * 
   * Possible error codes:
   * 
   * * `CANNOT_RENEW_YOUTH_PROFILE_ERROR`: Returned if the youth profile is already renewed or not in the renew window
   * 
   * * `TODO`
   */
  readonly renewYouthProfile: RenewYouthProfile_renewYouthProfile | null;
}

export interface RenewYouthProfileVariables {
  readonly input: RenewYouthProfileMutationInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateProfile
// ====================================================

export interface UpdateProfile_updateProfile_profile {
  /**
   * The ID of the object.
   */
  readonly id: string;
}

export interface UpdateProfile_updateProfile {
  readonly profile: UpdateProfile_updateProfile_profile | null;
}

export interface UpdateProfile {
  /**
   * Updates the profile with id given as an argument based on the given data.
   * 
   * One or several of the following is possible to add, modify or remove:
   * 
   * * Email
   * * Address
   * * Phone
   * 
   * If youth data or sensitive data is given, associated data will also be created
   * and linked to the profile **or** the existing data set will be updated if the
   * profile is already linked to it.
   * 
   * Requires elevated privileges.
   * 
   * Possible error codes:
   * 
   * * `TODO`
   */
  readonly updateProfile: UpdateProfile_updateProfile | null;
}

export interface UpdateProfileVariables {
  readonly input: UpdateProfileMutationInput;
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

export interface CreateAddressInput {
  readonly countryCode?: string | null;
  readonly primary?: boolean | null;
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
  readonly addressType: AddressType;
}

export interface CreateEmailInput {
  readonly primary?: boolean | null;
  readonly email: string;
  readonly emailType: EmailType;
}

export interface CreatePhoneInput {
  readonly primary?: boolean | null;
  readonly phone: string;
  readonly phoneType: PhoneType;
}

export interface CreateProfileMutationInput {
  readonly serviceType: ServiceType;
  readonly profile: ProfileInput;
  readonly clientMutationId?: string | null;
}

export interface ProfileInput {
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly nickname?: string | null;
  readonly image?: string | null;
  readonly language?: Language | null;
  readonly contactMethod?: ContactMethod | null;
  readonly addEmails?: ReadonlyArray<(CreateEmailInput | null)> | null;
  readonly updateEmails?: ReadonlyArray<(UpdateEmailInput | null)> | null;
  readonly removeEmails?: ReadonlyArray<(string | null)> | null;
  readonly addPhones?: ReadonlyArray<(CreatePhoneInput | null)> | null;
  readonly updatePhones?: ReadonlyArray<(UpdatePhoneInput | null)> | null;
  readonly removePhones?: ReadonlyArray<(string | null)> | null;
  readonly addAddresses?: ReadonlyArray<(CreateAddressInput | null)> | null;
  readonly updateAddresses?: ReadonlyArray<(UpdateAddressInput | null)> | null;
  readonly removeAddresses?: ReadonlyArray<(string | null)> | null;
  readonly subscriptions?: ReadonlyArray<(SubscriptionInputType | null)> | null;
  readonly youthProfile?: YouthProfileFields | null;
  readonly sensitivedata?: SensitiveDataFields | null;
}

export interface RenewYouthProfileMutationInput {
  readonly serviceType: ServiceType;
  readonly profileId: string;
  readonly clientMutationId?: string | null;
}

export interface SensitiveDataFields {
  readonly ssn?: string | null;
}

export interface SubscriptionInputType {
  readonly subscriptionTypeId: string;
  readonly enabled: boolean;
}

export interface UpdateAddressInput {
  readonly countryCode?: string | null;
  readonly primary?: boolean | null;
  readonly id: string;
  readonly address?: string | null;
  readonly postalCode?: string | null;
  readonly city?: string | null;
  readonly addressType?: AddressType | null;
}

export interface UpdateEmailInput {
  readonly primary?: boolean | null;
  readonly id: string;
  readonly email?: string | null;
  readonly emailType?: EmailType | null;
}

export interface UpdatePhoneInput {
  readonly primary?: boolean | null;
  readonly id: string;
  readonly phone?: string | null;
  readonly phoneType?: PhoneType | null;
}

export interface UpdateProfileInput {
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly nickname?: string | null;
  readonly image?: string | null;
  readonly language?: Language | null;
  readonly contactMethod?: ContactMethod | null;
  readonly addEmails?: ReadonlyArray<(CreateEmailInput | null)> | null;
  readonly updateEmails?: ReadonlyArray<(UpdateEmailInput | null)> | null;
  readonly removeEmails?: ReadonlyArray<(string | null)> | null;
  readonly addPhones?: ReadonlyArray<(CreatePhoneInput | null)> | null;
  readonly updatePhones?: ReadonlyArray<(UpdatePhoneInput | null)> | null;
  readonly removePhones?: ReadonlyArray<(string | null)> | null;
  readonly addAddresses?: ReadonlyArray<(CreateAddressInput | null)> | null;
  readonly updateAddresses?: ReadonlyArray<(UpdateAddressInput | null)> | null;
  readonly removeAddresses?: ReadonlyArray<(string | null)> | null;
  readonly subscriptions?: ReadonlyArray<(SubscriptionInputType | null)> | null;
  readonly youthProfile?: YouthProfileFields | null;
  readonly sensitivedata?: SensitiveDataFields | null;
  readonly id: string;
}

export interface UpdateProfileMutationInput {
  readonly serviceType: ServiceType;
  readonly profile: UpdateProfileInput;
  readonly clientMutationId?: string | null;
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
