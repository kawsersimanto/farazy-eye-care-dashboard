export enum IRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
}

export interface IEmployee {
  id: string;
}

export interface IPatient {
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
  createdAt: string;
  updatedAt: string;
}
