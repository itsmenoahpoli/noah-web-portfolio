const MONTH_NAMES = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;

const MONTH_ALIASES: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

export function parseExperienceDate(value: string | null | undefined): Date | null {
  if (!value) return null;

  const trimmed = value.trim();
  if (!trimmed || trimmed.toLowerCase() === "present") {
    return null;
  }

  const normalized = trimmed.replace(/[.,]/g, "");
  const monthYearMatch = normalized.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (monthYearMatch) {
    const [, monthToken, yearToken] = monthYearMatch;
    const monthIndex = MONTH_ALIASES[monthToken.toLowerCase()];
    if (monthIndex !== undefined) {
      return new Date(Number(yearToken), monthIndex, 1);
    }
  }

  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatExperienceMonthYear(value: string | null | undefined): string {
  const parsed = parseExperienceDate(value);
  if (!parsed) {
    return value?.trim() || "Present";
  }

  return `${MONTH_NAMES[parsed.getMonth()].slice(0, 3)} ${parsed.getFullYear()}`;
}

export function compareExperienceStartDates(a: string, b: string): number {
  const aDate = parseExperienceDate(a);
  const bDate = parseExperienceDate(b);

  if (!aDate && !bDate) return 0;
  if (!aDate) return 1;
  if (!bDate) return -1;

  return bDate.getTime() - aDate.getTime();
}

export function formatExperienceDuration(
  startValue: string,
  endValue: string | null | undefined,
): string | null {
  const start = parseExperienceDate(startValue);
  if (!start) return null;

  const explicitEnd = parseExperienceDate(endValue);
  const end = explicitEnd ?? new Date();

  let totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;

  if (totalMonths <= 0) {
    totalMonths = 1;
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years > 0 && months > 0) {
    return `${years}yr${years > 1 ? "s" : ""} & ${months}mo${months > 1 ? "s" : ""}`;
  }

  if (years > 0) {
    return `${years}yr${years > 1 ? "s" : ""}`;
  }

  return `${months}mo${months > 1 ? "s" : ""}`;
}
