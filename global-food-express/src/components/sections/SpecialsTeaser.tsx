import Link from "next/link";
import { SPECIALS, SPECIALS_WEEK } from "@/config/specials";
import { STORES, whatsappUrl } from "@/config/locations";
import Reveal from "@/components/motion/Reveal";
import { Lines } from "@/components/motion/Lines";
import { ArrowIcon, ChatIcon } from "@/components/ui/Icons";
import TrackedLink from "@/components/ui/TrackedLink";

const fmt = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });

export default function SpecialsTeaser() {
  const rows = SPECIALS.slice(0, 4);
  return (
    <section className="section" aria-labelledby="specials-title">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow fade-up">This week</p>
          <h2 id="specials-title" className="mt-4 text-[length:var(--step-4)]">
            <Lines lines={["Specials worth", <span key="d">the <em className="accent">drive</em></span>]} />
          </h2>
          <p className="fade-up mt-5 max-w-[42ch] text-cream-2">
            Prices change weekly and go out on WhatsApp first. {SPECIALS_WEEK.example ? "Sample layout shown until this week's list is loaded." : `Valid ${fmt(SPECIALS_WEEK.start)} to ${fmt(SPECIALS_WEEK.end)}.`}
          </p>
          <div className="fade-up table-rows mt-8 border-y border-line">
            {rows.map((r) => (
              <div key={r.item + r.store} className="flex items-baseline justify-between gap-6 py-4">
                <div>
                  <p className="font-display text-[length:var(--step-1)]">{r.item}</p>
                  {r.detail && <p className="text-sm text-cream-3">{r.detail} · {r.store === "both" ? "both stores" : STORES.find((s) => s.id === r.store)?.shortName}</p>}
                </div>
                <p className="shrink-0 font-display text-[length:var(--step-2)] text-saffron tabular-nums">
                  {r.price === "TODO" ? "—" : `$${r.price}`}
                  {r.unit && r.price !== "TODO" && <span className="text-sm text-cream-3"> / {r.unit}</span>}
                </p>
              </div>
            ))}
          </div>
          <div className="fade-up mt-8">
            <Link href="/weekly-specials" className="btn btn-ghost">All specials <ArrowIcon width={18} height={18} /></Link>
          </div>
        </Reveal>
        <Reveal className="surface-elevated self-start rounded-[var(--radius)] border border-line p-8 md:p-10">
          <p className="eyebrow fade-up">WhatsApp community</p>
          <h3 className="fade-up mt-4 font-display text-[length:var(--step-3)] leading-tight">Hear about restocks before the shelf empties.</h3>
          <p className="fade-up mt-4 text-cream-2">Each store runs its own group: weekly specials, new arrivals, Eid and Ramadan hours, and the day fresh mithai lands. No spam, leave any time.</p>
          <ul className="fade-up mt-6 grid gap-3 sm:grid-cols-2">
            {STORES.map((s) => (
              <li key={s.id}>
                <TrackedLink event="whatsapp_click" store={s.id} href={whatsappUrl(s)} target="_blank" rel="noopener" data-cursor="whatsapp" className="btn btn-pistachio w-full">
                  <ChatIcon width={16} height={16} /> {s.shortName}
                </TrackedLink>
              </li>
            ))}
          </ul>
          <Link href="/whatsapp" className="fade-up link-underline mt-5 inline-block text-sm text-cream-2">Scan the QR codes instead</Link>
        </Reveal>
      </div>
    </section>
  );
}
