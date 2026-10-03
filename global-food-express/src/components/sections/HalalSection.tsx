import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/config/images";
import Reveal from "@/components/motion/Reveal";
import { Lines } from "@/components/motion/Lines";
import Counter from "@/components/motion/Counter";
import HalalTimeline from "./HalalTimeline";
import { ArrowIcon } from "@/components/ui/Icons";

const STEPS = [
  { t: "Zabiha only", d: "Hand slaughtered by a Muslim with the name of God invoked for each animal. No exceptions, no second tier." },
  { t: "Fresh, not frozen", d: "Goat, lamb, beef and chicken arrive fresh on a regular schedule, so the case turns over quickly." },
  { t: "Cut to order", d: "Tell us the dish and the headcount. Curry cut, biryani cut, mince ground in front of you." },
  { t: "Nothing non-halal in the building", d: "No pork, no non-zabiha meat, no shared grinders. The whole store is halal, not just one case." },
];

/** Calm, respectful treatment of the halal standard. Paper variant for contrast. */
export default function HalalSection() {
  const img = IMAGES.halal;
  return (
    <section className="paper section relative overflow-hidden" aria-labelledby="halal-title">
      <div className="container">
        <Reveal className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow fade-up">The standard</p>
            <h2 id="halal-title" className="mt-4 text-[length:var(--step-5)]">
              <Lines lines={["100% zabiha", <em key="h" className="accent">halal.</em>, "Every day."]} />
            </h2>
            <p className="fade-up mt-6 max-w-[48ch] text-[length:var(--step-1)] leading-[1.5] text-paper-ink-2">
              Zabiha is not a label we print. It is the only meat we buy, the only meat we cut, and the only meat in either store. Ask the butcher who the supplier is and he will tell you.
            </p>
            <div className="fade-up mt-8">
              <Link href="/halal" className="btn btn-ghost">
                How we handle halal <ArrowIcon width={18} height={18} />
              </Link>
            </div>
          </div>
          <div className="clip-reveal img-reveal self-end" data-cursor="view">
            <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width:1024px) 45vw, 100vw" className="aspect-[16/10] w-full object-cover" />
          </div>
        </Reveal>

        <Reveal className="mt-16 grid gap-y-10 border-t border-line pt-10 sm:grid-cols-3 lg:mt-24">
          {[
            { v: 100, s: "%", l: "of the meat sold is zabiha halal" },
            { v: 2, s: "", l: "stores in Fort Bend County, one standard" },
            { v: 0, s: "", l: "non-halal products on the shelves" },
          ].map((c) => (
            <div key={c.l} className="fade-up">
              <p className="font-display text-[length:var(--step-5)] leading-none tracking-[-0.04em]">
                <Counter value={c.v} suffix={c.s} />
              </p>
              <p className="mt-3 max-w-[22ch] text-paper-ink-2">{c.l}</p>
            </div>
          ))}
        </Reveal>

        <HalalTimeline steps={STEPS} />
      </div>
    </section>
  );
}
