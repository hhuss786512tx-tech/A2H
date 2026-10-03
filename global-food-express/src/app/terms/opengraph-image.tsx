import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
export const alt = "Global Food Express";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export default function Image() {
  return renderOg({ title: "Terms of use" });
}
