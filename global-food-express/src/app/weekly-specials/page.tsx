import type { Metadata } from "next";
import Link from "next/link";
import { SPECIALS, SPECIALS_WEEK } from "@/config/specials";
import { STORES, whatsappUrl } from "@/config/locations";
import PageHeader from "@/components/sections/PageHeader";
import Reveal from "@/components/motion/Reveal";
import TrackedLink from "@/components/ui/TrackedLink";
import { pageMetadata } from "@/lib/seo";
import { ChatIcon } from "@/components/ui/Icons";

export const metadata: Metadata = pageMetadata({
  title: "Weekly Specials | Global Food Express Rosenberg & Sugar Land",
  description:
    "This week's specials on halal meat, basmati, produce and frozen at Global Food Express in Rosenberg and Sugar Land, TX. Updated weekly, on WhatsApp first.",
  path: "/weekly-specials",
});

const fmt = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric" });
const storeLabel = (id: string) => (id === "both" ? "Both stores" : STORES.find((s) => s.id === id)?.shortName ?? id);

export default function SpecialsPage() {
  const groups = ["both", "rosenberg", "sugar-land"].map((g) => ({ g, rows: SPECIALS.filter((r) => r.store === g) })).filter((x) => x.rows.length);
  return (
    <>
      <PageHeader
        eyebrow="This week"
        crumbs={[{ name: "Weekly specials", href: "/weekly-specials" }]}
        lines={["Specials worth", <span key="d">the <em className="accent">drive</em></span>]}
        intro={
          SPECIALS_WEEK.example
            ? "The specials board is being set up. Until the first real list is posted, the rows below show the layout. Prices and restocks go out on WhatsApp first."
            : `Valid ${fmt(SPECIALS_WEEK.start)} through ${fmt(SPECIALS_WEEK.end)}, while supplies last. Prices in-store are final.`
        }
      />
      <Reveal className="container grid gap-12 pb-24 lg:grid-cols-[2fr_1fr]">
        <div className="fade-up">
          {SPECIALS.length === 0 && <p className="text-cream-2">No specials posted this week. Check back Friday or join the WhatsApp group.</p>}
          {groups.map(({ g, rows }) => (
            <section key={g} className="mb-12" aria-labelledby={`sp-${g}`}>
              <h2 id={`sp-${g}`} className="eyebrow !text-cream-3">{storeLabel(g)}</h2>
              <ul className="table-rows mt-4 border-y border-line">
                {rows.map((r) => (
                  <li key={r.item} className="flex items-baseline justify-between gap-6 py-5">
                    <div>
                      <p className="font-display text-[length:var(--step-2)] leading-tight">{r.item}</p>
                      {r.detail && <p className="mt-1 text-sm text-cream-3">{r.detail}</p>}
                    </div>
                    <p className="shrink-0 font-display text-[length:var(--step-3)] tabular-nums text-saffron">
                      {r.price === "TODO" ? <span className="text-cream-3">—</span> : `$${r.price}`}
                      {r.unit && r.price !== "TODO" && <span className="text-sm text-cream-3"> / {r.unit}</span>}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <aside className="fade-up surface-elevated self-start rounded-[var(--radius)] border border-line p-8">
          <p className="eyebrow">Get it first</p>
          <p className="mt-4 font-display text-[length:var(--step-2)] leading-tight">Specials go to WhatsApp before they go on the board.</p>
          <ul className="mt-6 grid gap-3">
            {STORES.map((s) => (
              <li key={s.id}>
                <TrackedLink event="whatsapp_click" store={s.id} href={whatsappUrl(s)} target="_blank" rel="noopener" data-cursor="whatsapp" className="btn btn-pistachio w-full"><ChatIcon width={16} height={16} /> {s.shortName} group</TrackedLink>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-cream-3">Or <Link href="/whatsapp" className="link-underline text-cream">scan the QR codes</Link>.</p>
        </aside>
      </Reveal>
    </>
  );
}
