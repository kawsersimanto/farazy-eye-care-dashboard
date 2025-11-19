import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Returns a relative time string for a date
 * Example: "2 days ago", "a few seconds ago"
 */
export const formatDate = (date: string | Date | undefined) => {
  if (!date) return "";
  return dayjs(date).fromNow();
};

export function getAgeFromISO(isoString: string): number {
  if (!isoString) return 0;

  const birthDate = dayjs(isoString);
  if (!birthDate.isValid()) return 0;

  const today = dayjs();
  const age = today.diff(birthDate, "year");

  return age;
}

export const getDayName = (dayOfWeek: string) => {
  const dayMap: { [key: string]: number } = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
  };

  const dayIndex = dayMap[dayOfWeek];
  if (dayIndex !== undefined) {
    return dayjs().day(dayIndex).format("dddd");
  }
  return dayOfWeek;
};

export const formatTime = (time: string) => {
  if (!time) return "";

  // Try parsing with seconds first (HH:mm:ss), then without (HH:mm)
  let parsed = dayjs(time, "HH:mm:ss", true);

  if (!parsed.isValid()) {
    parsed = dayjs(time, "HH:mm", true);
  }

  if (!parsed.isValid()) {
    return time; // Return original if neither format matches
  }

  return parsed.format("hh:mm A");
};

export const getTodayISO = (): string => {
  return dayjs().tz("Asia/Dhaka").toISOString();
};

export const getTodayDateOnly = (): string => {
  return dayjs().tz("Asia/Dhaka").format("YYYY-MM-DD");
};

export const formatScheduleDays = (dayCodes: string[]) => {
  if (!dayCodes || dayCodes.length === 0) return "";

  // Convert: MON → Monday (or keep as MON if you want)
  const names = dayCodes.map((code) => getDayName(code));

  // If only one — return as is
  if (names.length === 1) return names[0];

  // Extract last item
  const last = names[names.length - 1];

  // Join rest with commas
  const rest = names.slice(0, -1).join(", ");

  return `${rest} & ${last}`;
};

export const formatScheduleWithTime = (
  schedules: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }[]
) => {
  if (!schedules || schedules.length === 0) return "";

  const items = schedules.map((s) => {
    const dayName = getDayName(s.dayOfWeek);
    const start = formatTime(s.startTime);
    const end = formatTime(s.endTime);
    return `${dayName} (${start} - ${end})`;
  });

  // If only one item
  if (items.length === 1) return items[0];

  // If two items → A & B
  if (items.length === 2) return `${items[0]} & ${items[1]}`;

  // If 3+ items → A, B, C & D
  const last = items.pop(); // remove last element
  return `${items.join(", ")} & ${last}`;
};

export const formatTodayDate = (): string => {
  return dayjs().tz("Asia/Dhaka").format("DD MMM, YYYY");
};
