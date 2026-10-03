/**
 * Store hours. One entry per weekday, 0 = Sunday … 6 = Saturday.
 * Times are 24h "HH:MM" strings in the store's local timezone.
 *
 * TODO_CLIENT: the current site publishes NO hours. Every entry below is
 * `null` on purpose so the site never claims an "Open now" state it cannot
 * back up. Fill in both stores and the badge, schema and footer light up
 * automatically.
 *
 * Example once confirmed:
 *   { open: "09:00", close: "21:00" }
 */
export type DayHours = { open: string; close: string } | null;
export type WeekHours = [DayHours, DayHours, DayHours, DayHours, DayHours, DayHours, DayHours];

export const TIMEZONE = "America/Chicago";

export const HOURS: Record<"rosenberg" | "sugar-land", WeekHours | null> = {
  rosenberg: null, // TODO_CLIENT
  "sugar-land": null, // TODO_CLIENT
};

/** Special closures / holiday hours. Rendered as a notice when the date matches. */
export const HOLIDAY_NOTICES: { date: string; label: string; hours?: DayHours }[] = [];
