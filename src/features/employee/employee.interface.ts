export interface IEmployeeProfile {
  id: string;
  userId: string;
  branchId: string;
  employeeId: string | null;
  department: string | null;
  position: string | null;
  salary: number | null;
  joinedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
