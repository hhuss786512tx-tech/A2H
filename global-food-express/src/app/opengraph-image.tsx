import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
export const alt = "Global Food Express, halal grocery in Rosenberg and Sugar Land, Texas";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export default function Image() {
  return renderOg({ title: "The halal grocery your biryani deserves." });
}
