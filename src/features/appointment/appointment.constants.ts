import {
  isFriday,
  isMonday,
  isSaturday,
  isSunday,
  isThursday,
  isTuesday,
  isWednesday,
} from "date-fns";

export const DAY_OF_WEEK_MAP = {
  MON: isMonday,
  TUE: isTuesday,
  WED: isWednesday,
  THU: isThursday,
  FRI: isFriday,
  SAT: isSaturday,
  SUN: isSunday,
};
