import { IBloodGroup, IGender } from "@/features/user/user.interface";

export interface IPatient {
  id: string;
  userId: string;
  branchId: string;
  dateOfBirth: string;
  age?: number;
  gender: IGender;
  address: string | null;
  emergencyPhone: string | null;
  emergencyContact: string | null;
  bloodGroup: IBloodGroup;
  medicalHistory: string | null;
  createdAt: string;
  updatedAt: string;
}
