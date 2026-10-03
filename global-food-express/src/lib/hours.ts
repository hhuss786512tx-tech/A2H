import { TIMEZONE, type DayHours, type WeekHours } from "@/config/hours";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
const SCHEMA_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

/** Current wall-clock in the store timezone. */
export function nowInStoreTz(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    hour12: false,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const hour = Number(get("hour")) % 24;
  const minute = Number(get("minute"));
  return { weekday, minutes: hour * 60 + minute };
}

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export function fmt12(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hr = ((h + 11) % 12) + 1;
  return m === 0 ? `${hr} ${suffix}` : `${hr}:${String(m).padStart(2, "0")} ${suffix}`;
}

export type OpenState =
  | { kind: "unknown" }
  | { kind: "open"; closesAt: string; closingSoon: boolean }
  | { kind: "closed"; opensLabel: string };

/** Computes open/closed from a WeekHours table. Returns `unknown` if hours are missing. */
export function openState(hours: WeekHours | null, date = new Date()): OpenState {
  if (!hours) return { kind: "unknown" };
  const { weekday, minutes } = nowInStoreTz(date);
  const today = hours[weekday];
  if (today) {
    const o = toMin(today.open);
    const c = toMin(today.close);
    if (minutes >= o && minutes < c) {
      return { kind: "open", closesAt: fmt12(today.close), closingSoon: c - minutes <= 60 };
    }
    if (minutes < o) return { kind: "closed", opensLabel: `Opens today at ${fmt12(today.open)}` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (weekday + i) % 7;
    const h = hours[d];
    if (h) {
      const label = i === 1 ? "tomorrow" : DAYS[d];
      return { kind: "closed", opensLabel: `Opens ${label} at ${fmt12(h.open)}` };
    }
  }
  return { kind: "unknown" };
}

/** Rows for an hours table: groups consecutive identical days. */
export function hoursRows(hours: WeekHours | null) {
  if (!hours) return null;
  const rows: { days: string; time: string }[] = [];
  const label = (h: DayHours) => (h ? `${fmt12(h.open)} – ${fmt12(h.close)}` : "Closed");
  // Start Monday for a grocer.
  const order = [1, 2, 3, 4, 5, 6, 0];
  let i = 0;
  while (i < order.length) {
    const start = i;
    const t = label(hours[order[i]]);
    while (i + 1 < order.length && label(hours[order[i + 1]]) === t) i++;
    const days =
      start === i ? DAYS[order[start]] : `${DAYS[order[start]].slice(0, 3)} – ${DAYS[order[i]].slice(0, 3)}`;
    rows.push({ days, time: t });
    i++;
  }
  return rows;
}

/** schema.org openingHoursSpecification. Empty array when hours are unknown. */
export function openingHoursSpecification(hours: WeekHours | null) {
  if (!hours) return [];
  return hours
    .map((h, i) =>
      h
        ? {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: `https://schema.org/${SCHEMA_DAYS[i]}`,
            opens: h.open,
            closes: h.close,
          }
        : null,
    )
    .filter(Boolean);
}
