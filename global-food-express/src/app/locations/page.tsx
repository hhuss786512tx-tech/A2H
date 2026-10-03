import type { Metadata } from "next";
import { STORES } from "@/config/locations";
import PageHeader from "@/components/sections/PageHeader";
import StoreCard from "@/components/sections/StoreCard";
import MapEmbed from "@/components/sections/MapEmbed";
import Reveal from "@/components/motion/Reveal";
import JsonLd from "@/components/ui/JsonLd";
import { storeSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Locations: Rosenberg & Sugar Land TX | Global Food Express",
  description:
    "Two halal grocery stores in Fort Bend County: 235 Minonite Rd, Rosenberg, TX 77469 and 10560 Synott Rd, Sugar Land, TX 77498. Hours, phone and directions.",
  path: "/locations",
});

export default function LocationsPage() {
  return (
    <>
      <JsonLd data={STORES.map(storeSchema)} />
      <PageHeader
        eyebrow="Stores"
        crumbs={[{ name: "Locations", href: "/locations" }]}
        lines={["Two stores in", <span key="f">Fort Bend <em className="accent">County</em></span>]}
        intro="Rosenberg off US-59, and Sugar Land on Synott Rd. Both carry the full range and the same zabiha standard. Pick the one on your way home."
      />
      <Reveal className="container grid gap-8 pb-20 lg:grid-cols-2">
        {STORES.map((s, i) => (
          <div key={s.id} className="fade-up">
            <StoreCard store={s} priority={i === 0} />
          </div>
        ))}
      </Reveal>
      <section className="container pb-24" aria-label="Maps">
        <div className="grid gap-8 lg:grid-cols-2">
          {STORES.map((s) => (
            <div key={s.id}>
              <p className="eyebrow mb-4">{s.shortName} map</p>
              <MapEmbed store={s} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
