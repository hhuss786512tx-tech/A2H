import { STORES } from "@/config/locations";
import Reveal from "@/components/motion/Reveal";
import { Lines } from "@/components/motion/Lines";
import StoreCard from "./StoreCard";

export default function StoresSection() {
  return (
    <section className="section glow-bg" aria-labelledby="stores-title" id="stores">
      <div className="container">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow fade-up">Two stores</p>
            <h2 id="stores-title" className="mt-4 text-[length:var(--step-4)]">
              <Lines lines={["Rosenberg and", <span key="s">Sugar Land, <em className="accent">Texas</em></span>]} />
            </h2>
          </div>
          <p className="fade-up max-w-[40ch] text-cream-2">Off US-59 in Rosenberg and on Synott Rd between Westpark and Bissonnet. Both carry the full range; each has its strengths.</p>
        </Reveal>
        <Reveal className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {STORES.map((s) => (
            <div key={s.id} className="fade-up">
              <StoreCard store={s} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
