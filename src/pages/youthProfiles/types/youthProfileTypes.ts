export type Values = {
  [index: string]: string;
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
  languageAtHome: string;
  photoUsageApproved: string;
  approverFirstName: string;
  approverLastName: string;
  approverEmail: string;
  approverPhone: string;
};

export type Errors = {
  [index: string]: string | undefined;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  schoolName?: string;
  schoolClass?: string;
  languageAtHome?: string;
  photoUsageApproved?: string;
  approverFirstName?: string;
  approverLastName?: string;
  approverEmail?: string;
  photoUsagePhone?: string;
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
