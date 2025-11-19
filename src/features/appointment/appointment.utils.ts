import { ISchedule } from "@/features/schedule/schedule.interface";
import { ApiResponse } from "@/types/api";
import { isToday } from "date-fns";
import { DAY_OF_WEEK_MAP } from "./appointment.constants";

export const parseTimeString = (
  timeStr: string
): { hours: number; minutes: number } => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return { hours, minutes };
};

export const isTimeOver = (timeStr: string): boolean => {
  const now = new Date();
  const { hours, minutes } = parseTimeString(timeStr);
  const scheduleTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes
  );
  return now >= scheduleTime;
};

export const getScheduleByDay = (
  scheduleData: ApiResponse<ISchedule[]> | undefined
): Map<string, ISchedule[]> => {
  if (!scheduleData?.data) return new Map<string, ISchedule[]>();
  const map = new Map<string, ISchedule[]>();
  scheduleData.data
    .filter((schedule: ISchedule) => schedule.isActive)
    .forEach((schedule: ISchedule) => {
      if (!map.has(schedule.dayOfWeek)) {
        map.set(schedule.dayOfWeek, []);
      }
      map.get(schedule.dayOfWeek)!.push(schedule);
    });
  return map;
};

export const isDateDisabled = (
  date: Date,
  scheduleByDay: Map<string, ISchedule[]>
): boolean => {
  // Disable past dates
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const checkDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  if (checkDate < today) return true;

  for (const [dayKey, dayChecker] of Object.entries(DAY_OF_WEEK_MAP)) {
    if (dayChecker(date) && scheduleByDay.has(dayKey)) {
      if (isToday(date)) {
        const schedules = scheduleByDay.get(dayKey) || [];
        const hasAvailableSlot = schedules.some(
          (schedule: ISchedule) => !isTimeOver(schedule.startTime)
        );
        return !hasAvailableSlot;
      }
      return false;
    }
  }
  return true;
};
