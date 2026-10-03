import type { Metadata } from "next";
import Image from "next/image";
import { STORES, whatsappUrl } from "@/config/locations";
import { IMAGES } from "@/config/images";
import PageHeader from "@/components/sections/PageHeader";
import Reveal from "@/components/motion/Reveal";
import TrackedLink from "@/components/ui/TrackedLink";
import { pageMetadata } from "@/lib/seo";
import { ChatIcon } from "@/components/ui/Icons";

export const metadata: Metadata = pageMetadata({
  title: "WhatsApp Community | Global Food Express",
  description:
    "Join the Global Food Express WhatsApp groups for Rosenberg and Sugar Land: weekly specials, restocks, fresh mithai days, Ramadan and Eid hours.",
  path: "/whatsapp",
});

export default function WhatsAppPage() {
  return (
    <>
      <PageHeader
        eyebrow="Community"
        crumbs={[{ name: "WhatsApp", href: "/whatsapp" }]}
        lines={["Restocks, specials,", <span key="e"><em className="accent">Eid</em> hours. First.</span>]}
        intro="Each store runs its own WhatsApp community. One or two messages a week: the specials board, what landed fresh, and holiday hours. Leave whenever you like."
      />
      <Reveal className="container grid gap-8 pb-24 lg:grid-cols-2">
        {STORES.map((s) => {
          const qr = s.id === "rosenberg" ? IMAGES.whatsapp : IMAGES.whatsappSugarLand;
          return (
            <div key={s.id} className="fade-up surface-elevated rounded-[var(--radius)] border border-line p-6 md:p-8">
              <p className="eyebrow">{s.shortName}</p>
              <h2 className="mt-3 font-display text-[length:var(--step-3)] leading-tight">{s.address.city} group</h2>
              <div className="mt-6 grid min-w-0 gap-6 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-center">
                <Image src={qr.src} alt={qr.alt} width={qr.width} height={qr.height} sizes="180px" className="w-[160px] rounded-[var(--radius-sm)] border border-line" />
                <div>
                  <p className="text-cream-2">Scan with your phone camera, or tap the button on mobile.</p>
                  <TrackedLink event="whatsapp_click" store={s.id} href={whatsappUrl(s)} target="_blank" rel="noopener" data-cursor="whatsapp" className="btn btn-pistachio mt-4"><ChatIcon width={16} height={16} /> Join on WhatsApp</TrackedLink>
                  {!s.whatsappInvite && <p className="mt-3 text-xs text-cream-3">Invite link pending. The button opens a chat with the store until then.</p>}
                </div>
              </div>
            </div>
          );
        })}
      </Reveal>
    </>
  );
}
