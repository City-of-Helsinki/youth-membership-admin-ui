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

export interface Profile_profile_youthProfile {
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

//==============================================================
// START Enums and Input Objects
//==============================================================

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

//==============================================================
// END Enums and Input Objects
//==============================================================
