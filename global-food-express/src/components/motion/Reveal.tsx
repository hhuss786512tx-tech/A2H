"use client";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Extra delay before the stagger starts, ms. */
  delay?: number;
  id?: string;
}

/**
 * Adds `.in` once the block nears the viewport; CSS does the rest:
 *  .mask-line > span  → masked line rise      .fade-up → opacity + translateY
 *  .clip-reveal       → clip-path expansion
 * Needs no motion library, so first paint never waits on JS. Final state is
 * rendered when JS is off or reduced motion is on.
 */
export default function Reveal({ children, as: Tag = "div", className = "", delay = 0, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} id={id} style={delay ? { ["--reveal-delay" as string]: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}
