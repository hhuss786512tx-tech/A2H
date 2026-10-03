/**
 * Site-wide facts. Everything here is verified unless marked TODO_CLIENT.
 * Verified 2026-10-03 against the live site (globalfoodexpress.com) via search
 * index snapshots and third-party listings. See TODO_CLIENT.md for anything
 * the owner still has to confirm.
 */

export const SITE = {
  name: "Global Food Express",
  legalName: "Global Food Express", // TODO_CLIENT: confirm legal entity name (LLC / Inc)
  tagline: "Indo-Pak and Mediterranean grocery. 100% Zabiha Halal.",
  url: "https://globalfoodexpress.com",
  locale: "en_US",
  region: "Fort Bend County, TX",
  /** TODO_CLIENT: no public email exists on the current site. Set before launch. */
  email: null as string | null,
  /** TODO_CLIENT: founding year is not published anywhere. Leave null until confirmed. */
  foundingYear: null as number | null,
  /** TODO_CLIENT: confirm who certifies / supplies the zabiha meat. Never guess. */
  halalCertifier: null as string | null,
  priceRange: "$",
  /** TODO_CLIENT: add real profile URLs. Empty entries are not rendered. */
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    tiktok: null as string | null,
    youtube: null as string | null,
    yelp: null as string | null,
    googleBusinessProfile: null as string | null,
  },
  /** Google Analytics 4 measurement id. Set NEXT_PUBLIC_GA_ID in Vercel env. */
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? null,
  /** Optional hero video. When null the hero uses the layered still + WebGL. */
  heroVideo: null as { src: string; poster: string } | null,
  nav: [
    { href: "/products", label: "Aisles" },
    { href: "/halal", label: "Halal" },
    { href: "/weekly-specials", label: "Specials" },
    { href: "/locations", label: "Stores" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Journal" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export const AREAS_SERVED = [
  "Rosenberg",
  "Richmond",
  "Sugar Land",
  "Missouri City",
  "Stafford",
  "Katy",
  "Pecan Grove",
  "Greatwood",
  "Aliana",
  "Mission Bend",
  "Fort Bend County",
  "Houston",
] as const;
