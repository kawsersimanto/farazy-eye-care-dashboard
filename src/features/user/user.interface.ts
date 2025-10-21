export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  BRANCH_ADMIN = "BRANCH_ADMIN",
  DOCTOR = "DOCTOR",
  EMPLOYEE = "EMPLOYEE",
  PATIENT = "PATIENT",
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  profileImageUrl: string;
  isActive: boolean;
  role: UserRole;
  branchId: string;
  createdByUserId: string;
  createdAt: string;
  updatedAt: string;
}
