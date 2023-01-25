/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HasPermission
// ====================================================

export interface HasPermission_youthProfiles_edges_node {
  readonly id: string;
}

export interface HasPermission_youthProfiles_edges {
  readonly node: HasPermission_youthProfiles_edges_node | null;
}

export interface HasPermission_youthProfiles {
  readonly edges: ReadonlyArray<(HasPermission_youthProfiles_edges | null)>;
}

export interface HasPermission_profiles_edges_node {
  readonly id: string;
}

export interface HasPermission_profiles_edges {
  readonly node: HasPermission_profiles_edges_node | null;
}

export interface HasPermission_profiles {
  readonly edges: ReadonlyArray<(HasPermission_profiles_edges | null)>;
}

export interface HasPermission {
  readonly youthProfiles: HasPermission_youthProfiles | null;
  readonly profiles: HasPermission_profiles | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Profiles
// ====================================================

export interface Profiles_profiles_edges_node_primaryPhone {
  readonly phone: string | null;
  readonly id: string;
}

export interface Profiles_profiles_edges_node_youthProfile {
  readonly membershipStatus: MembershipStatus;
  readonly birthDate: any;
  readonly photoUsageApproved: boolean | null;
  readonly membershipNumber: string;
  readonly languageAtHome: YouthLanguage;
}

export interface Profiles_profiles_edges_node {
  readonly firstName: string;
  readonly lastName: string;
  readonly id: string;
  readonly primaryPhone: Profiles_profiles_edges_node_primaryPhone | null;
  readonly youthProfile: Profiles_profiles_edges_node_youthProfile | null;
}

export interface Profiles_profiles_edges {
  readonly node: Profiles_profiles_edges_node | null;
}

export interface Profiles_profiles {
  readonly edges: ReadonlyArray<(Profiles_profiles_edges | null)>;
}

export interface Profiles {
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
  readonly id: string;
}

export interface Profile_profile_primaryAddress {
  readonly address: string;
  readonly city: string;
  readonly postalCode: string;
  readonly countryCode: string;
  readonly id: string;
  readonly primary: boolean;
  readonly addressType: AddressType | null;
}

export interface Profile_profile_addresses_edges_node {
  readonly primary: boolean;
  readonly id: string;
  readonly address: string;
  readonly postalCode: string;
  readonly city: string;
  readonly countryCode: string;
  readonly addressType: AddressType | null;
}

export interface Profile_profile_addresses_edges {
  readonly node: Profile_profile_addresses_edges_node | null;
}

export interface Profile_profile_addresses {
  readonly edges: ReadonlyArray<(Profile_profile_addresses_edges | null)>;
}

export interface Profile_profile_primaryEmail {
  readonly email: string;
  readonly id: string;
}

export interface Profile_profile_youthProfile_additionalContactPersons_edges_node {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly email: string;
}

export interface Profile_profile_youthProfile_additionalContactPersons_edges {
  readonly node: Profile_profile_youthProfile_additionalContactPersons_edges_node | null;
}

export interface Profile_profile_youthProfile_additionalContactPersons {
  readonly edges: ReadonlyArray<(Profile_profile_youthProfile_additionalContactPersons_edges | null)>;
}

export interface Profile_profile_youthProfile {
  readonly expiration: any;
  readonly birthDate: any;
  readonly photoUsageApproved: boolean | null;
  readonly membershipNumber: string;
  readonly membershipStatus: MembershipStatus;
  readonly languageAtHome: YouthLanguage;
  readonly schoolName: string;
  readonly schoolClass: string;
  readonly approverFirstName: string;
  readonly approverLastName: string;
  readonly approverEmail: string;
  readonly approverPhone: string;
  readonly renewable: boolean;
  readonly additionalContactPersons: Profile_profile_youthProfile_additionalContactPersons;
}

export interface Profile_profile {
  readonly firstName: string;
  readonly lastName: string;
  readonly id: string;
  readonly language: Language | null;
  readonly primaryPhone: Profile_profile_primaryPhone | null;
  readonly primaryAddress: Profile_profile_primaryAddress | null;
  readonly addresses: Profile_profile_addresses | null;
  readonly primaryEmail: Profile_profile_primaryEmail | null;
  readonly youthProfile: Profile_profile_youthProfile | null;
}

export interface Profile {
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
// GraphQL mutation operation: CreateYouthProfile
// ====================================================

export interface CreateYouthProfile_createYouthProfile_youthProfile {
  readonly id: string;
}

export interface CreateYouthProfile_createYouthProfile {
  readonly youthProfile: CreateYouthProfile_createYouthProfile_youthProfile | null;
}

export interface CreateYouthProfile {
  readonly createYouthProfile: CreateYouthProfile_createYouthProfile | null;
}

export interface CreateYouthProfileVariables {
  readonly input: CreateYouthProfileMutationInput;
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
// GraphQL mutation operation: UpdateYouthProfile
// ====================================================

export interface UpdateYouthProfile_updateProfile_profile {
  readonly id: string;
}

export interface UpdateYouthProfile_updateProfile {
  readonly profile: UpdateYouthProfile_updateProfile_profile | null;
}

export interface UpdateYouthProfile_updateYouthProfile_youthProfile {
  readonly id: string;
}

export interface UpdateYouthProfile_updateYouthProfile {
  readonly youthProfile: UpdateYouthProfile_updateYouthProfile_youthProfile | null;
}

export interface UpdateYouthProfile {
  readonly updateProfile: UpdateYouthProfile_updateProfile | null;
  readonly updateYouthProfile: UpdateYouthProfile_updateYouthProfile | null;
}

export interface UpdateYouthProfileVariables {
  readonly helsinkiProfileInput: UpdateProfileMutationInput;
  readonly youthProfileInput: UpdateYouthProfileMutationInput;
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
  FRENCH = "FRENCH",
  RUSSIAN = "RUSSIAN",
  SOMALI = "SOMALI",
  SWEDISH = "SWEDISH",
}

export interface CreateAdditionalContactPersonInput {
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly email: string;
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

export interface CreateYouthProfileInput {
  readonly schoolName?: string | null;
  readonly schoolClass?: string | null;
  readonly languageAtHome?: YouthLanguage | null;
  readonly approverFirstName?: string | null;
  readonly approverLastName?: string | null;
  readonly approverPhone?: string | null;
  readonly approverEmail?: string | null;
  readonly birthDate: any;
  readonly photoUsageApproved?: boolean | null;
  readonly addAdditionalContactPersons?: ReadonlyArray<(CreateAdditionalContactPersonInput | null)> | null;
  readonly updateAdditionalContactPersons?: ReadonlyArray<(UpdateAdditionalContactPersonInput | null)> | null;
  readonly removeAdditionalContactPersons?: ReadonlyArray<(string | null)> | null;
}

export interface CreateYouthProfileMutationInput {
  readonly id: string;
  readonly youthProfile: CreateYouthProfileInput;
  readonly profileApiToken: string;
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
  readonly sensitivedata?: SensitiveDataFields | null;
}

export interface RenewYouthProfileMutationInput {
  readonly id: string;
  readonly clientMutationId?: string | null;
}

export interface SensitiveDataFields {
  readonly ssn?: string | null;
}

export interface SubscriptionInputType {
  readonly subscriptionTypeId: string;
  readonly enabled: boolean;
}

export interface UpdateAdditionalContactPersonInput {
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly phone?: string | null;
  readonly email?: string | null;
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
  readonly sensitivedata?: SensitiveDataFields | null;
  readonly id: string;
}

export interface UpdateProfileMutationInput {
  readonly serviceType: ServiceType;
  readonly profile: UpdateProfileInput;
  readonly clientMutationId?: string | null;
}

export interface UpdateYouthProfileInput {
  readonly schoolName?: string | null;
  readonly schoolClass?: string | null;
  readonly languageAtHome?: YouthLanguage | null;
  readonly approverFirstName?: string | null;
  readonly approverLastName?: string | null;
  readonly approverPhone?: string | null;
  readonly approverEmail?: string | null;
  readonly birthDate?: any | null;
  readonly photoUsageApproved?: boolean | null;
  readonly addAdditionalContactPersons?: ReadonlyArray<(CreateAdditionalContactPersonInput | null)> | null;
  readonly updateAdditionalContactPersons?: ReadonlyArray<(UpdateAdditionalContactPersonInput | null)> | null;
  readonly removeAdditionalContactPersons?: ReadonlyArray<(string | null)> | null;
  readonly resendRequestNotification?: boolean | null;
}

export interface UpdateYouthProfileMutationInput {
  readonly id: string;
  readonly youthProfile: UpdateYouthProfileInput;
  readonly clientMutationId?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
