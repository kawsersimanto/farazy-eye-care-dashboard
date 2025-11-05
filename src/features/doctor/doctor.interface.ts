export interface IDoctor {
  id: string;
  userId: string;
  branchId: string;
  about: string | null;
  registrationNo: string | null;
  yearsExperience: number;
  consultationFee: number | null;
  isAvailable: boolean;
  title: string | null;
  degrees: string[];
  qualifications: string[];
  createdAt: string;
  updatedAt: string;
}
