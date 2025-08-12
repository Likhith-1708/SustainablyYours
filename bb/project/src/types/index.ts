export interface Organization {
  id: string;
  name: string;
  size: 'small' | 'medium' | 'large';
  membershipStatus: 'pending' | 'verified' | 'committed';
  commitmentDate: string;
  sector: string;
  country: string;
  netZeroTarget?: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}

export interface CompanyInfo {
  name: string;
  employees: string;
  country: string;
  address: string;
  postalCode: string;
  sector: string;
  website: string;
  identifier: string;
  netZeroTarget: string;
}

export interface QuestionnaireResponse {
  questionId: string;
  answer: string | number | boolean;
  fileUpload?: File;
  linkUpload?: string;
}

export interface FormState {
  personalInfo?: PersonalInfo;
  companyInfo?: CompanyInfo;
  responses?: QuestionnaireResponse[];
  score?: number;
  completed?: boolean;
}