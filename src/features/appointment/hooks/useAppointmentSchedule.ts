"use client";

import { ISchedule } from "@/features/schedule/schedule.interface";
import { ApiResponse } from "@/types/api";
import { useMemo } from "react";
import {
  isDateDisabled as checkIfDateDisabled,
  getScheduleByDay,
} from "../appointment.utils";

export const useAppointmentSchedule = (
  scheduleData: ApiResponse<ISchedule[]> | undefined
) => {
  const scheduleByDay = useMemo(() => {
    return getScheduleByDay(scheduleData);
  }, [scheduleData]);

  const isDateDisabled = (date: Date): boolean => {
    return checkIfDateDisabled(date, scheduleByDay);
  };

  return { scheduleByDay, isDateDisabled };
};
