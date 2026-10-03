"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { CATEGORIES, categoryImage } from "@/config/products";
import { useMotion } from "@/lib/motion";
import { ArrowUpRight } from "@/components/ui/Icons";

const ORDER = ["produce", "spices-masalas", "halal-meat", "frozen", "snacks-sweets", "rice-pantry"];

/**
 * Pinned horizontal "aisle tour". On desktop the track scrubs with scroll; on
 * touch and reduced motion it is a native horizontal scroller with snap.
 */
export default function AisleTour() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const aisles = ORDER.map((s) => CATEGORIES.find((c) => c.slug === s)!);

  useMotion(({ gsap, ScrollTrigger }) => {
    const el = root.current;
    const tr = track.current;
    if (!el || !tr) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const dist = () => tr.scrollWidth - window.innerWidth;
      const tween = gsap.to(tr, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 },
      });
      const panels = tr.querySelectorAll<HTMLElement>("[data-aisle]");
      panels.forEach((p) => {
        const img = p.querySelector("img");
        gsap.fromTo(p, { clipPath: "inset(12% 6% 12% 6% round 20px)" }, { clipPath: "inset(0% 0% 0% 0% round 20px)", ease: "none", scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 80%", end: "left 30%", scrub: true } });
        if (img) gsap.fromTo(img, { xPercent: -6 }, { xPercent: 6, ease: "none", scrollTrigger: { trigger: p, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => {
      mm.revert();
      ScrollTrigger.refresh();
    };
  });

  return (
    <section ref={root} className="relative overflow-hidden" aria-labelledby="aisles-title">
      <div className="container pt-20 pb-8 lg:absolute lg:left-1/2 lg:top-10 lg:z-10 lg:w-[min(100%-var(--gutter)*2,var(--container))] lg:-translate-x-1/2 lg:pt-0">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Aisle tour</p>
            <h2 id="aisles-title" className="mt-3 text-[length:var(--step-4)]">Walk the <em className="accent">aisles</em></h2>
          </div>
          <p className="max-w-[36ch] text-cream-2 lg:text-right">Scroll to move down the aisle. Each stop is a full category page with what we stock.</p>
        </div>
      </div>
      <div className="lg:h-[100vh] lg:flex lg:items-center">
        <div ref={track} className="flex gap-4 overflow-x-auto px-[var(--gutter)] pb-10 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-8 lg:overflow-visible lg:pb-0 lg:pt-28 lg:will-change-transform" data-cursor="drag">
          {aisles.map((c, i) => {
            const img = categoryImage(c);
            return (
              <article key={c.slug} data-aisle className="relative h-[70vh] min-w-[82vw] shrink-0 snap-start overflow-hidden rounded-[var(--radius)] sm:min-w-[60vw] lg:h-[64vh] lg:min-w-[44vw]" style={{ clipPath: "inset(0 round 20px)" }}>
                <Link href={`/products/${c.slug}`} className="group block h-full" data-cursor="view">
                  <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width:1024px) 44vw, 82vw" className="h-full w-full scale-110 object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(7_16_12/0.1),rgb(7_16_12/0.85))]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                    <div>
                      <span className="font-sans text-xs tabular-nums tracking-[0.2em] text-saffron">0{i + 1} / 0{aisles.length}</span>
                      <h3 className="mt-2 font-display text-[length:var(--step-3)] leading-none text-cream">{c.name}</h3>
                      <p className="mt-2 max-w-[34ch] text-sm text-cream-2">{c.products.slice(0, 3).join(" · ")}</p>
                    </div>
                    <span className="icon-btn shrink-0 bg-base/60 backdrop-blur transition-transform group-hover:-translate-y-1 group-hover:rotate-45">
                      <ArrowUpRight />
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
          <div className="min-w-[8vw] shrink-0 lg:min-w-[12vw]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
