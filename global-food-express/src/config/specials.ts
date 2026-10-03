/**
 * Weekly specials. Edit this file to update /weekly-specials and the home teaser.
 * Keep prices honest: the site shows them as entered.
 *
 * TODO_CLIENT: these are EXAMPLE rows so the layout can be reviewed. Replace
 * every row with real items and prices before launch, or empty the array to
 * show the "no specials this week" state.
 */
export interface Special {
  item: string;
  detail?: string;
  price: string;
  unit?: string;
  store: "both" | "rosenberg" | "sugar-land";
}

export const SPECIALS_WEEK = {
  /** ISO dates. Rendered as "Valid Oct 3 – Oct 9". */
  start: "2026-10-03",
  end: "2026-10-09",
  example: true, // TODO_CLIENT: set to false once rows are real
};

export const SPECIALS: Special[] = [
  { item: "Goat, curry cut", detail: "Bone-in, zabiha", price: "TODO", unit: "lb", store: "both" },
  { item: "Chicken, whole", detail: "Skinned on request", price: "TODO", unit: "lb", store: "both" },
  { item: "Aged basmati", detail: "20 lb sack", price: "TODO", unit: "sack", store: "both" },
  { item: "Okra", detail: "Fresh", price: "TODO", unit: "lb", store: "rosenberg" },
  { item: "Lachha paratha", detail: "Family pack", price: "TODO", unit: "pack", store: "sugar-land" },
];
