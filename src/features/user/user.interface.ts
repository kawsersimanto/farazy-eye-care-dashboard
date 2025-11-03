import { IBranch } from "../branch/branch.interface";
import { IPatient } from "../patient/patient.interface";

export enum IRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
}

export enum IGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum IBloodGroup {
  "O+" = "O+",
  "O-" = "O-",
  "A+" = "A+",
  "A-" = "A-",
  "B+" = "B+",
  "B-" = "B-",
  "AB+" = "AB+",
  "AB-" = "AB-",
}

export interface IEmployee {
  id: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  profileImageUrl: string | null;
  isActive: boolean;
  role: IRole;
  branchId: string | null;
  createdByUserId: string | null;
  employeeProfile: IEmployee | null;
  patientProfile: IPatient | null;
  branch?: IBranch;
  createdAt: string;
  updatedAt: string;
}
