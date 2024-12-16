export interface UserData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  documentType: 'passport' | 'idCard' | 'driverLicense';
}

export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export interface VerificationData {
  status: VerificationStatus;
  timestamp: string;
  message?: string;
}