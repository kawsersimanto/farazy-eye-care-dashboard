export interface IAppointment {
  id: string;
  name: string;
  phone: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  branchId: string;
  doctorId: string;
  patientId: string | null;
  appointmentNo: string;
  scheduledAt: string;
  notes: string;
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  createdAt: string;
  updatedAt: string;
}
