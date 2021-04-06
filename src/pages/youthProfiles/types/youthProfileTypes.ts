import {
  Language,
  YouthLanguage,
  Profile_profile_primaryAddress as PrimaryAddress,
  Profile_profile_addresses_edges_node as Address,
  CreateAdditionalContactPersonInput,
  UpdateAdditionalContactPersonInput,
} from '../../../graphql/generatedTypes';

type AdditionalContactPerson =
  | CreateAdditionalContactPersonInput
  | UpdateAdditionalContactPersonInput;

type Index =
  | 'firstName'
  | 'lastName'
  | 'primaryAddress'
  | 'addresses'
  | 'email'
  | 'phone'
  | 'birthDate'
  | 'schoolName'
  | 'schoolClass'
  | 'languageAtHome'
  | 'photoUsageApproved'
  | 'approverFirstName'
  | 'approverLastName'
  | 'approverEmail'
  | 'approverPhone'
  | 'additionalContactPerson';

export type Values = {
  firstName: string;
  lastName: string;
  primaryAddress: PrimaryAddress;
  addresses: Address[];
  email: string;
  phone: string;
  birthDate: string;
  schoolName: string;
  schoolClass: string;
  languageAtHome: YouthLanguage;
  profileLanguage: Language;
  photoUsageApproved: string;
  approverFirstName: string;
  approverLastName: string;
  approverEmail: string;
  approverPhone: string;
  additionalContactPersons: AdditionalContactPerson[];
};

export type Errors = {
  [index: string]: string;
};

export type ValidationErrors = {
  [key in Index]?: string | Record<string, unknown>;
};

export interface ValidationOption {
  min?: number;
  max?: number;
  required?: boolean;
  email?: boolean;
  birthDate?: boolean;
}

export type YouthSchema<T> = {
  [index: string]: T;
};

export type FormValues = {
  firstName: string;
  lastName: string;
  primaryAddress: PrimaryAddress;
  addresses: Address[];
  email: string;
  phone: string;
  birthDate: string;
  schoolName: string;
  schoolClass: string;
  languageAtHome: YouthLanguage;
  profileLanguage: Language;
  photoUsageApproved: string;
  approverFirstName: string;
  approverLastName: string;
  approverEmail: string;
  approverPhone: string;
  additionalContactPersons: AdditionalContactPerson[];
};
