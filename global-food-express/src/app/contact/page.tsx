import type { Metadata } from "next";
import { STORES, formatAddress, directionsUrl } from "@/config/locations";
import { SITE } from "@/config/site";
import PageHeader from "@/components/sections/PageHeader";
import PreorderForm from "@/components/sections/PreorderForm";
import OpenNow from "@/components/sections/OpenNow";
import Reveal from "@/components/motion/Reveal";
import TrackedLink from "@/components/ui/TrackedLink";
import { pageMetadata } from "@/lib/seo";
import { PhoneIcon, PinIcon } from "@/components/ui/Icons";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Pre-order Halal Meat | Global Food Express",
  description:
    "Pre-order a cut of zabiha halal goat, lamb, beef or chicken for pickup in Rosenberg or Sugar Land, or send a question. Phone and address for both stores.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        crumbs={[{ name: "Contact", href: "/contact" }]}
        lines={["Pre-order a cut.", <span key="q">Ask a <em className="accent">question.</em></span>]}
        intro="The fastest answer is always the phone. For a cut you want ready at pickup, the form below goes straight to the store and we confirm by call."
      />
      <Reveal className="container grid gap-12 pb-24 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <section id="preorder" aria-labelledby="preorder-title" className="fade-up">
          <h2 id="preorder-title" className="text-[length:var(--step-3)]">Pre-order or request a cut</h2>
          <p className="mt-3 max-w-[52ch] text-cream-2">Tell us the dish, the headcount and whether you want bone. Whole goat and lamb need a day&rsquo;s notice.</p>
          <div className="mt-8">
            <PreorderForm kind="preorder" />
          </div>
        </section>
        <aside className="fade-up space-y-8">
          {STORES.map((s) => (
            <div key={s.id} className="surface-elevated rounded-[var(--radius)] border border-line p-6">
              <p className="eyebrow">{s.shortName}</p>
              <address className="mt-3 not-italic text-cream-2">{formatAddress(s) as string}</address>
              <OpenNow hours={s.hours} className="mt-3" />
              <div className="mt-5 flex flex-wrap gap-3">
                <TrackedLink event="phone_click" store={s.id} href={`tel:${s.phoneE164}`} data-cursor="call" className="btn btn-primary !min-h-[2.6rem] !py-2 text-sm"><PhoneIcon width={16} height={16} /> {s.phone}</TrackedLink>
                <TrackedLink event="directions_click" store={s.id} href={directionsUrl(s)} target="_blank" rel="noopener" data-cursor="directions" className="btn btn-ghost !min-h-[2.6rem] !py-2 text-sm"><PinIcon width={16} height={16} /> Directions</TrackedLink>
              </div>
            </div>
          ))}
          <div className="rounded-[var(--radius)] border border-line p-6">
            <p className="eyebrow">Email</p>
            {SITE.email ? (
              <a href={`mailto:${SITE.email}`} className="link-underline mt-3 inline-block text-cream">{SITE.email}</a>
            ) : (
              <p className="mt-3 text-cream-2">Use the form or call either store. An email address is coming.</p>
            )}
          </div>
        </aside>
      </Reveal>
    </>
  );
}
