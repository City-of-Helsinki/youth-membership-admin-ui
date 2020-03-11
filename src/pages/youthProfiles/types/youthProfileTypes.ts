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
