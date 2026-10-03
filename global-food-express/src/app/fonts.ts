import { Fraunces, Inter_Tight } from "next/font/google";

/**
 * Self-hosted + subset at build time by next/font, font-display: swap.
 * Fraunces ships as static 400 instances (its default optical size is 144,
 * which is the display cut this site uses) so each face is ~30 KB instead of a
 * full variable file. Only the upright display face is preloaded; the italic
 * accent face and the variable body sans load without preload so they never
 * compete with the LCP image on slow connections.
 */
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  style: ["normal"],
  weight: "400",
  preload: true,
});

export const frauncesItalic = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces-italic",
  style: ["italic"],
  weight: "400",
  preload: false,
});

export const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
  weight: "variable",
  preload: false,
});
