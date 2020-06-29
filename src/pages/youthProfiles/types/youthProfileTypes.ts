import {
  Language,
  YouthLanguage,
  Profile_profile_primaryAddress as PrimaryAddress,
  Profile_profile_addresses_edges_node as Address,
} from '../../../graphql/generatedTypes';

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
  | 'approverPhone';

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
};

export type Errors = {
  [index: string]: string | undefined | PrimaryAddress | Address[];
  firstName?: string;
  lastName?: string;
  primaryAddress?: PrimaryAddress | undefined;
  addresses?: Address[];
  email?: string;
  phone?: string;
  birthDate?: string;
  schoolName?: string;
  schoolClass?: string;
  languageAtHome?: YouthLanguage;
  profileLanguage?: Language;
  photoUsageApproved?: string;
  approverFirstName?: string;
  approverLastName?: string;
  approverEmail?: string;
  approverPhone?: string;
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
};
