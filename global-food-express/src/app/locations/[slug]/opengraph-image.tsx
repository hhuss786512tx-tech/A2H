import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { STORES, getStore, formatAddress } from "@/config/locations";
export const alt = "Global Food Express store";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export function generateStaticParams() {
  return STORES.map((s) => ({ slug: s.slug }));
}
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getStore(slug);
  return renderOg({ title: s ? `Halal grocery in ${s.address.city}, TX` : "Locations", footer: s ? (formatAddress(s) as string) : undefined });
}
