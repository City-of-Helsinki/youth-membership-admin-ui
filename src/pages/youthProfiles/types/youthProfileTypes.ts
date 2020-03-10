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

export type ValidationOption = {
  min?: number;
  max?: number;
  required?: boolean;
  email?: boolean;
  birthDate?: boolean;
};

export type YouthSchema = {
  [index: string]: ValidationOption;
  firstName: ValidationOption;
  lastName: ValidationOption;
  phone: ValidationOption;
  email: ValidationOption;
  address: ValidationOption;
  city: ValidationOption;
  postalCode: ValidationOption;
  birthDate: ValidationOption;
  approverFirstName: ValidationOption;
  approverLastName: ValidationOption;
  approverEmail: ValidationOption;
  approverPhone: ValidationOption;
};
