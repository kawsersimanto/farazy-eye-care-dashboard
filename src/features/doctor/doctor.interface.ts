export interface IDoctor {
  id?: string;
  userId?: string;
  branchId?: string;
  about?: string;
  registrationNo?: string;
  yearsExperience?: number;
  consultationFee?: number;
  isAvailable: boolean;
  title?: string;
  degrees?: string[];
  qualifications?: string[];
  createdAt?: string;
  updatedAt?: string;
}
