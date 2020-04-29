import { Language, YouthLanguage } from '../../../graphql/generatedTypes';

type Index =
  | 'firstName'
  | 'lastName'
  | 'address'
  | 'city'
  | 'postalCode'
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
  [key in Index]: string;
};

export type Errors = {
  [key in Index]?: string;
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
  address: string;
  city: string;
  postalCode: string;
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
