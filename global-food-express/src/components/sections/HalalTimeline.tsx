"use client";
import { useRef, type CSSProperties } from "react";
import { useMotion } from "@/lib/motion";
import Reveal from "@/components/motion/Reveal";

/** Process timeline: the rule draws with scroll (GSAP, lazy); steps fade in via CSS reveal. */
export default function HalalTimeline({ steps }: { steps: { t: string; d: string }[] }) {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  useMotion(({ gsap }) => {
    if (!root.current || !line.current) return;
    const draw = gsap.fromTo(line.current, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 60%", scrub: true } });
    return () => {
      draw.scrollTrigger?.kill();
      draw.kill();
    };
  });
  return (
    <div ref={root} className="relative mt-20">
      <span ref={line} className="absolute left-0 top-0 h-px w-full origin-left bg-paper-ink/30" aria-hidden="true" />
      <Reveal as="ol" className="grid gap-10 pt-8 md:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.t} className="fade-up relative" style={{ ["--i" as string]: i } as CSSProperties}>
            <span className="absolute -top-8 left-0 block h-2 w-2 -translate-y-1/2 rounded-full bg-saffron" aria-hidden="true" />
            <span className="font-sans text-xs tabular-nums tracking-[0.2em] text-saffron-deep">0{i + 1}</span>
            <h3 className="mt-2 font-display text-[length:var(--step-2)] leading-tight">{s.t}</h3>
            <p className="mt-3 text-paper-ink-2">{s.d}</p>
          </li>
        ))}
      </Reveal>
    </div>
  );
}
