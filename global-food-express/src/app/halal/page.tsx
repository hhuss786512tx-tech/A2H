import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/config/images";
import { SITE } from "@/config/site";
import PageHeader from "@/components/sections/PageHeader";
import HalalTimeline from "@/components/sections/HalalTimeline";
import FAQ from "@/components/ui/FAQ";
import Reveal from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import { pageMetadata } from "@/lib/seo";
import { ArrowIcon } from "@/components/ui/Icons";

export const metadata: Metadata = pageMetadata({
  title: "Zabiha Halal Standard | Global Food Express Fort Bend TX",
  description:
    "How Global Food Express handles halal: zabiha only, hand slaughtered, fresh deliveries, cut to order, nothing non-halal in either Fort Bend County store.",
  path: "/halal",
});

const STEPS = [
  { t: "Zabiha only", d: "Hand slaughtered by a Muslim with the name of God invoked for each animal. That is the only meat we buy." },
  { t: "Consistent suppliers", d: "We buy from the same suppliers week after week and will name them at the counter." },
  { t: "Fresh deliveries", d: "Goat, lamb, beef and chicken arrive fresh on a regular schedule and the case turns over fast." },
  { t: "Cut to order", d: "Curry cut, biryani cut, mince ground in front of you, whole chicken skinned and quartered." },
];

const FAQS = [
  { q: "Is every product in the store halal?", a: "Yes. We sell no pork, no alcohol and no non-zabiha meat. Packaged items with meat ingredients are from halal-certified brands." },
  { q: "Who certifies your meat?", a: `TODO_CLIENT: name the supplier and certifying body here. ${SITE.halalCertifier ?? ""}` },
  { q: "Is the chicken hand slaughtered too?", a: "Yes. Chicken is held to the same zabiha standard as goat, lamb and beef." },
  { q: "Are the frozen kebabs and nuggets halal?", a: "Every frozen meat product on the shelf carries a recognised halal certification mark, and we check new lines before stocking them." },
  { q: "Can I see where the meat comes from?", a: "Ask at the counter. Cases arrive labeled and we will show you the box or the invoice." },
];

export default function HalalPage() {
  const img = IMAGES.halal;
  return (
    <>
      <PageHeader
        eyebrow="The standard"
        crumbs={[{ name: "Halal", href: "/halal" }]}
        lines={["100% zabiha", <em key="h" className="accent">halal.</em>, "No second tier."]}
        intro="Zabiha is not a label we print on a sign. It is the only meat we buy, the only meat we cut, and the only meat in either building. Here is what that means in practice and how to check it yourself."
      />
      <Reveal className="container">
        <div className="clip-reveal img-reveal" data-cursor="view">
          <Image src={img.src} alt={img.alt} width={img.width} height={img.height} priority sizes="100vw" className="aspect-[16/8] w-full object-cover" />
        </div>
      </Reveal>
      <section className="paper section mt-16" aria-labelledby="process-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow fade-up">From the farm to the counter</p>
            <h2 id="process-title" className="fade-up mt-4 text-[length:var(--step-4)]">How the meat gets here</h2>
          </Reveal>
          <HalalTimeline steps={STEPS} />
          <Reveal className="mt-20 grid gap-10 border-t border-line pt-10 sm:grid-cols-3">
            {[
              { v: 100, s: "%", l: "of the meat sold is zabiha halal" },
              { v: 4, s: "", l: "kinds of fresh meat: goat, lamb, beef, chicken" },
              { v: 0, s: "", l: "non-halal products in either store" },
            ].map((c) => (
              <div key={c.l} className="fade-up">
                <p className="font-display text-[length:var(--step-5)] leading-none tracking-[-0.04em]"><Counter value={c.v} suffix={c.s} /></p>
                <p className="mt-3 max-w-[22ch] text-paper-ink-2">{c.l}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <Reveal className="container section-tight grid gap-10 lg:grid-cols-2">
        <div className="prose">
          <h2 className="fade-up !mt-0">What zabiha means</h2>
          <p className="fade-up">Zabiha (dhabiha) is the Islamic method of slaughter. A Muslim invokes the name of God and cuts the throat, windpipe and jugular veins of a healthy animal in a single motion with a sharp blade, and the blood is drained fully. “Halal” is the broader ruling that a food is permissible. Meat can be sold as halal while the method varies; zabiha names the method.</p>
          <p className="fade-up">The practical difference is in the details: whether the animal was stunned in a way that could kill it before the cut, whether the invocation was said for each animal, and whether the facility also processes non-halal meat. Our standard is hand slaughter, invocation for each animal, and a store with nothing non-halal in it.</p>
        </div>
        <div className="prose">
          <h2 className="fade-up !mt-0">How to check it yourself</h2>
          <ul className="fade-up">
            <li>Ask who the supplier is. A real answer names a company.</li>
            <li>Ask whether it is hand slaughtered. The answer should be a plain yes.</li>
            <li>Ask whether any non-halal meat is in the store. Shared cases and grinders matter.</li>
            <li>Ask about the chicken separately. Machine slaughter is most common there.</li>
            <li>Ask to see the box. Cases arrive labeled.</li>
          </ul>
          <p className="fade-up">Read the longer version in <Link href="/blog/what-zabiha-halal-means">What zabiha actually means</Link>, or come and ask at either counter.</p>
          <Link href="/products/halal-meat" className="btn btn-primary fade-up mt-4">See the meat counter <ArrowIcon width={18} height={18} /></Link>
        </div>
      </Reveal>
      <FAQ items={FAQS} title="Halal questions" />
    </>
  );
}
