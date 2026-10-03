"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { IMAGES } from "@/config/images";
import { SITE } from "@/config/site";
import { STORES } from "@/config/locations";
import { Words } from "@/components/motion/Lines";
import Magnetic from "@/components/motion/Magnetic";
import HeroCanvas from "./HeroCanvas";
import OpenNow from "./OpenNow";
import { prefersReducedMotion, useMotion } from "@/lib/motion";
import { ArrowIcon } from "@/components/ui/Icons";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const spot = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  // Entrance: CSS plays once .hero-in is set (after the preloader, or immediately).
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    document.documentElement.classList.add("js");
    let seen = false;
    try {
      seen = sessionStorage.getItem("gfe_loaded") === "1";
    } catch {}
    const go = () => el.classList.add("hero-in");
    if (seen || prefersReducedMotion()) go();
    else {
      window.addEventListener("gfe:ready", go, { once: true });
      // fail-safe if the preloader never runs
      const t = setTimeout(go, 2800);
      return () => {
        window.removeEventListener("gfe:ready", go);
        clearTimeout(t);
      };
    }
  }, []);

  // Ken Burns drift, scroll parallax and cursor spotlight: GSAP, loaded after first paint.
  useMotion(({ gsap, ScrollTrigger }) => {
    const el = root.current;
    if (!el || !media.current || !copy.current) return;
    const drift = gsap.to(media.current, { xPercent: -2, yPercent: -2, scale: 1.06, duration: 18, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1 });
    const par = gsap.to(copy.current, { yPercent: 25, opacity: 0.2, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
    const parMedia = gsap.to(media.current, { yPercent: 12, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
    const sx = gsap.quickTo(spot.current, "x", { duration: 0.8, ease: "expo.out" });
    const sy = gsap.quickTo(spot.current, "y", { duration: 0.8, ease: "expo.out" });
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      sx(e.clientX - r.left);
      sy(e.clientY - r.top);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      drift.kill();
      par.scrollTrigger?.kill();
      par.kill();
      parMedia.scrollTrigger?.kill();
      parMedia.kill();
      ScrollTrigger.refresh();
    };
  });

  const hero = IMAGES.hero;
  return (
    <section ref={root} className="hero relative isolate min-h-[100svh] overflow-hidden" aria-labelledby="hero-title">
      {/* media layer */}
      <div ref={media} className="absolute inset-0 -z-10 will-change-transform">
        {SITE.heroVideo ? (
          <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster={SITE.heroVideo.poster} preload="none">
            <source src={SITE.heroVideo.src} type="video/mp4" />
          </video>
        ) : (
          <Image src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} priority fetchPriority="high" sizes="100vw" className="h-full w-full object-cover" />
        )}
      </div>
      <div className="absolute inset-0 -z-10 mix-blend-screen opacity-70">
        <HeroCanvas />
      </div>
      {/* gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_20%_30%,rgb(233_168_58/0.16),transparent_60%),radial-gradient(50%_50%_at_90%_80%,rgb(159_191_142/0.12),transparent_60%),linear-gradient(180deg,rgb(7_16_12/0.45),rgb(7_16_12/0.2)_40%,var(--base)_100%)]" />
      {/* spotlight */}
      <div ref={spot} className="pointer-events-none absolute left-0 top-0 -z-10 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(233_168_58/0.14),transparent)] will-change-transform max-md:hidden" aria-hidden="true" />

      <div className="container flex min-h-[100svh] flex-col justify-end pb-28 pt-[calc(var(--nav-h)+4rem)] md:pb-20">
        <div ref={copy} className="will-change-transform">
          <p className="eyebrow fade-up" style={{ ["--i" as string]: 0 } as CSSProperties}>Rosenberg · Sugar Land · Fort Bend County</p>
          <h1 id="hero-title" className="mt-6 max-w-[11ch] text-[length:var(--step-6)] leading-[0.95]">
            <Words text="The halal grocery your biryani deserves." accent={["halal"]} />
          </h1>
          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="fade-up max-w-[46ch] text-[length:var(--step-1)] leading-[1.5] text-cream-2" style={{ ["--i" as string]: 3 } as CSSProperties}>
              Desi produce picked this week, a masala wall that runs the length of the aisle, and a zabiha butcher who cuts to order. Two stores, one standard: 100% halal, every time.
            </p>
            <div className="fade-up flex flex-wrap items-center gap-4" style={{ ["--i" as string]: 4 } as CSSProperties}>
              <Magnetic>
                <Link href="/locations" className="btn btn-primary" data-cursor="directions">
                  Find a store <ArrowIcon width={18} height={18} />
                </Link>
              </Magnetic>
              <Link href="/products" className="btn btn-ghost">Walk the aisles</Link>
            </div>
          </div>
          <ul style={{ ["--i" as string]: 5 } as CSSProperties} className="fade-up mt-12 flex flex-wrap gap-x-10 gap-y-3 border-t border-line pt-6 text-sm">
            {STORES.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-semibold text-cream">{s.shortName}</span>
                <OpenNow hours={s.hours} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
