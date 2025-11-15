export interface ISchedule {
  id: string;
  doctorId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  slotMinutes: number;
  maxPatients: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
